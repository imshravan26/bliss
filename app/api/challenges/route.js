import { NextResponse } from "next/server";
import connectToDB from "@/lib/db/connect";
import Challenge from "@/lib/db/models/challenge";
import { auth } from "@clerk/nextjs/server";
import { ChallengeType } from "@/lib/db/models/challenge"; // Make sure to import this

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const page = parseInt(searchParams.get("page") || "1");
    await connectToDB();

    // Calculate skip for pagination
    const skip = (page - 1) * limit;
    const challenges = await Challenge.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json(JSON.parse(JSON.stringify(challenges)));
  } catch (error) {
    console.error("Error fetching challenges:", error);
    return NextResponse.json(
      { error: "Failed to fetch challenges" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    await connectToDB();

    // Get current user from Clerk
    const userId = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate challenge type
    if (!Object.values(ChallengeType).includes(data.type)) {
      return NextResponse.json(
        { error: "Invalid challenge type" },
        { status: 400 }
      );
    }

    // Create challenge object matching your model
    const newChallenge = new Challenge({
      title: data.title,
      description: data.description,
      type: data.type,
      creator: data.creator,
      creatorName: data.creatorName,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      submissions: [],
      participants: data.participants || [],
      isActive: data.isActive || true,
      // These fields are stored separately if needed
      startColor: data.startColor,
      endColor: data.endColor,
    });

    const savedChallenge = await newChallenge.save();
    return NextResponse.json(JSON.parse(JSON.stringify(savedChallenge)), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating challenge:", error);
    return NextResponse.json(
      { error: "Failed to create challenge" },
      { status: 500 }
    );
  }
}
