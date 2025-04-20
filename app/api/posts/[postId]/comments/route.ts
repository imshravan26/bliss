import { NextRequest, NextResponse } from "next/server";
import { addComment, getComments } from "@/lib/actions/post.actions";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const comments = await getComments(params.postId);
    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error in GET /api/posts/[postId]/comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

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

    const { content } = await req.json();

    if (!content || typeof content !== "string" || content.trim() === "") {
      return NextResponse.json(
        { error: "Comment content is required" },
        { status: 400 }
      );
    }

    const result = await addComment(params.postId, userId, content);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in POST /api/posts/[postId]/comments:", error);
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 }
    );
  }
}
