import connectToDB from "@/lib/db/connect";
import { Post } from "@/lib/db/models/post";
import { Comment } from "@/lib/db/models/comment";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const page = parseInt(searchParams.get("page") || "1");

    await connectToDB();

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Get posts with author and comment count
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "username profilePicture displayName")
      .lean();

    // Get comment count for each post
    const postsWithCommentCount = await Promise.all(
      posts.map(async (post) => {
        const commentCount = await Comment.countDocuments({ post: post._id });
        return { ...post, commentCount };
      })
    );

    return NextResponse.json(JSON.parse(JSON.stringify(postsWithCommentCount)));
  } catch (error) {
    console.error("Error fetching feed posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch feed posts" },
      { status: 500 }
    );
  }
}
