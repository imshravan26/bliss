import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Challenge from "@/lib/db/models/challenge";
import Submission, { SubmissionStatus } from "@/lib/db/models/submission";
import connectToDB from "@/lib/db/connect";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { challengeId: string; submissionId: string } }
) {
  try {
    await connectToDB();
    const userId = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { challengeId, submissionId } = params;
    const { status, feedback } = await req.json();

    // Find the challenge
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 }
      );
    }

    // Check if user is the creator of the challenge
    if (challenge.creator.toString() !== userId) {
      return NextResponse.json(
        { error: "Only the challenge creator can update submission status" },
        { status: 403 }
      );
    }

    // Find and update the submission
    const submission = await Submission.findById(submissionId);
    if (!submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    submission.status = status;
    if (feedback) submission.feedback = feedback;
    await submission.save();

    // If marking as winner, reset any previous winners
    if (status === SubmissionStatus.WINNER) {
      await Submission.updateMany(
        {
          challenge: challengeId,
          _id: { $ne: submissionId },
          status: SubmissionStatus.WINNER,
        },
        { status: SubmissionStatus.APPROVED }
      );
    }

    return NextResponse.json({
      message: "Submission status updated",
      submission,
    });
  } catch (error) {
    console.error("Error updating submission:", error);
    return NextResponse.json(
      { error: "Failed to update submission" },
      { status: 500 }
    );
  }
}
