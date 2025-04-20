import { NextResponse } from "next/server";
import connectToDB from "@/lib/db/connect";
import Challenge from "@/lib/db/models/challenge";
import { User } from "@/lib/db/models/user";
import ChallengeParticipant from "@/lib/db/models/challengeParticipant";

export async function POST(request) {
  try {
    const { challengeId, userId } = await request.json();

    await connectToDB();

    // Check if challenge exists
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 }
      );
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user is already participating
    const existingParticipation = await ChallengeParticipant.findOne({
      challenge: challengeId,
      user: userId,
    });

    if (existingParticipation) {
      return NextResponse.json(
        { error: "User is already participating in this challenge" },
        { status: 400 }
      );
    }

    // Create new participation
    const newParticipation = new ChallengeParticipant({
      challenge: challengeId,
      user: userId,
      joinedAt: new Date(),
    });

    await newParticipation.save();

    // Update challenge participants count
    challenge.participants = (challenge.participants || 0) + 1;
    await challenge.save();

    return NextResponse.json(
      { message: "Successfully joined the challenge" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error joining challenge:", error);
    return NextResponse.json(
      { error: "Failed to join challenge" },
      { status: 500 }
    );
  }
}
