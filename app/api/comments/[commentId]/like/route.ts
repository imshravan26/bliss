import { NextRequest, NextResponse } from "next/server";
import { toggleLikeComment } from "@/lib/actions/post.actions";
import { useUser } from "@clerk/nextjs";

export async function POST(
  req: NextRequest,
  { params }: { params: { commentId: string } }
) {
  try {
    const { user } = useUser();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await toggleLikeComment(params.commentId, userId);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in POST /api/comments/[commentId]/like:", error);
    return NextResponse.json(
      { error: "Failed to toggle comment like" },
      { status: 500 }
    );
  }
}
