import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import Challenge from "@/lib/db/models/challenge";
import Submission from "@/lib/db/models/submission";
import connectToDB from "@/lib/db/connect";

export async function POST(
  req: NextRequest,
  { params }: { params: { challengeId: string } }
) {
  try {
    await connectToDB();
    const userId = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json(
        { error: "You must be logged in to submit" },
        { status: 401 }
      );
    }

    const { challengeId } = params;
    const { content } = await req.json();

    // Find the challenge
    const challenge = await Challenge.findOne({ _id: challengeId });
    if (!challenge) {
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 }
      );
    }

    // Check if challenge is still active
    if (!challenge.isActive || challenge.endDate < new Date()) {
      return NextResponse.json(
        { error: "This challenge is no longer accepting submissions" },
        { status: 400 }
      );
    }

    // Check if user is a participant
    if (!challenge.participants.includes(userId)) {
      return NextResponse.json(
        { error: "You must join the challenge before submitting" },
        { status: 400 }
      );
    }

    // Get user name for display
    const userName =
      user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.firstName ||
          user.username ||
          user.emailAddresses[0].emailAddress;

    // Check if user has already submitted
    const existingSubmission = await Submission.findOne({
      challenge: challengeId,
      user: userId,
    });

    if (existingSubmission) {
      // Update existing submission
      existingSubmission.content = content;
      await existingSubmission.save();

      return NextResponse.json({
        message: "Submission updated successfully",
        submission: existingSubmission,
      });
    }

    // Create new submission
    const submission = await Submission.create({
      challenge: challengeId,
      user: userId,
      userName,
      content,
    });

    // Add submission to challenge
    challenge.submissions.push(submission._id);
    await challenge.save();

    return NextResponse.json({
      message: "Submission created successfully",
      submission,
    });
  } catch (error) {
    console.error("Error creating submission:", error);
    return NextResponse.json(
      { error: "Failed to create submission" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { challengeId: string } }
) {
  try {
    await connectToDB();
    const userId = auth();
    const { challengeId } = params;

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
        { error: "Only the challenge creator can view all submissions" },
        { status: 403 }
      );
    }

    // Fetch all submissions for this challenge
    const submissions = await Submission.find({ challenge: challengeId });

    return NextResponse.json({ submissions });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}
