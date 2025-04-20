import { NextRequest, NextResponse } from "next/server";
import { toggleLikePost } from "@/lib/actions/post.actions";
import { auth } from "@clerk/nextjs/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    // Get the user ID from Clerk auth - need to await it
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await toggleLikePost(params.postId, userId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in POST /api/posts/[postId]/like:", error);
    return NextResponse.json(
      { error: "Failed to toggle like" },
      { status: 500 }
    );
  }
}
