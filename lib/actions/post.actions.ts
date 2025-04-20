"use server";

import { revalidatePath } from "next/cache";
import connectToDB from "../db/connect";
import { Post } from "@/lib/db/models/post";
import { User } from "../db/models/user";
import { Comment } from "../db/models/comment";
import mongoose from "mongoose";

/**
 * Create a new post
 */
export async function createPost(
  clerkUserId: string,
  content: string,
  mediaUrl?: string,
  tags?: string[]
) {
  try {
    console.log("Creating post with clerk ID:", clerkUserId);

    await connectToDB();

    // First, find or create a MongoDB user for this Clerk user
    let mongoUser = await User.findOne({ clerkId: clerkUserId });

    if (!mongoUser) {
      console.log("Creating new MongoDB user for Clerk user:", clerkUserId);
      // You might want to fetch more user data from Clerk here
      mongoUser = await User.create({
        clerkId: clerkUserId,
        username: `user_${Date.now()}`, // Generate a temporary username
        displayName: "New User",
        // Add other required fields
      });
    }

    console.log("Using MongoDB user:", mongoUser._id);

    // Now create the post with the MongoDB user's ObjectId
    const newPost = await Post.create({
      author: mongoUser._id, // MongoDB ObjectId
      content,
      media: mediaUrl ? [mediaUrl] : [],
      tags: tags || [],
      likes: [],
      dislikes: [],
      comments: [],
    });

    console.log("Post created successfully:", newPost._id);

    // Update user with post reference
    await User.findByIdAndUpdate(mongoUser._id, {
      $push: { posts: newPost._id },
    });

    revalidatePath("/feed");
    return JSON.parse(JSON.stringify(newPost));
  } catch (error) {
    console.error("Error creating post:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to create post: ${error.message}`);
    } else {
      throw new Error("Failed to create post: Unknown error");
    }
  }
}
/**
 * Get all posts for the feed
 */
export async function getFeedPosts(limit = 20, page = 1) {
  try {
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

    return JSON.parse(JSON.stringify(postsWithCommentCount));
  } catch (error) {
    console.error("Error fetching feed posts:", error);
    throw new Error("Failed to fetch feed posts");
  }
}

/**
 * Get posts by a specific user
 */
export async function getUserPosts(userId: string, limit = 20, page = 1) {
  try {
    await connectToDB();

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "username profilePicture displayName")
      .lean();

    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw new Error("Failed to fetch user posts");
  }
}

/**
 * Get a single post by ID
 */
export async function getPostById(postId: string) {
  try {
    await connectToDB();

    const post = await Post.findById(postId)
      .populate("author", "username profilePicture displayName")
      .lean();

    if (!post) throw new Error("Post not found");

    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error("Failed to fetch post");
  }
}

/**
 * Delete a post
 */
export async function deletePost(postId: string, userId: string) {
  try {
    await connectToDB();

    // Find post and check ownership
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found");
    if (post.author.toString() !== userId)
      throw new Error("Unauthorized to delete this post");

    // Delete post and related comments
    await Promise.all([
      Post.findByIdAndDelete(postId),
      Comment.deleteMany({ post: postId }),
      User.findByIdAndUpdate(userId, { $pull: { posts: postId } }),
    ]);

    revalidatePath("/feed");
    return { success: true };
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Failed to delete post");
  }
}

/**
 * Vote on a post (upvote or downvote)
 */

// Toggle like on a post
export async function toggleLikePost(postId: string, userId: string) {
  try {
    await connectToDB();

    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    // Check if user already liked the post
    const isLiked = post.likes.includes(userId);

    // Toggle like
    if (isLiked) {
      // Remove like
      post.likes = post.likes.filter((id: string) => id !== userId);
    } else {
      // Add like
      post.likes.push(userId);
    }

    await post.save();

    return {
      success: true,
      likes: post.likes,
      isLiked: !isLiked,
    };
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
}

/**
 * Add a comment to a post
 */
// export async function addComment(
//   postId: string,
//   userId: string,
//   content: string
// ) {
//   try {
//     await connectToDB();

//     // Create the comment
//     const newComment = await Comment.create({
//       post: postId,
//       author: userId,
//       content,
//     });

//     // Update post with comment reference
//     await Post.findByIdAndUpdate(postId, {
//       $push: { comments: newComment._id },
//     });

//     // Populate author details
//     const populatedComment = await Comment.findById(newComment._id)
//       .populate("author", "username profilePicture displayName")
//       .lean();

//     revalidatePath(`/posts/${postId}`);
//     return JSON.parse(JSON.stringify(populatedComment));
//   } catch (error) {
//     console.error("Error adding comment:", error);
//     throw new Error("Failed to add comment");
//   }
// }

/**
 * Get comments for a post
 */
export async function addComment(
  postId: string,
  userId: string,
  content: string
) {
  try {
    await connectToDB();

    // Create new comment
    const comment = new Comment({
      post: new mongoose.Types.ObjectId(postId),
      author: userId,
      content,
    });

    await comment.save();

    // Add comment to post
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

    return {
      success: true,
      comment,
    };
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
}

export async function toggleLikeComment(commentId: string, userId: string) {
  try {
    await connectToDB();

    const comment = await Comment.findById(commentId);

    if (!comment) {
      throw new Error("Comment not found");
    }

    // Check if user already liked the comment
    const isLiked = comment.likes.includes(userId);

    // Toggle like
    if (isLiked) {
      // Remove like
      comment.likes = comment.likes.filter((id: string) => id !== userId);
    } else {
      // Add like
      comment.likes.push(userId);
    }

    await comment.save();

    return {
      success: true,
      likes: comment.likes,
      isLiked: !isLiked,
    };
  } catch (error) {
    console.error("Error toggling comment like:", error);
    throw error;
  }
}

// Get comments for a post
export async function getComments(postId: string) {
  try {
    await connectToDB();

    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: -1 })
      .limit(10);

    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}

/**
 * Delete a comment
 */
export async function deleteComment(commentId: string, userId: string) {
  try {
    await connectToDB();

    const comment = await Comment.findById(commentId);
    if (!comment) throw new Error("Comment not found");
    if (comment.author.toString() !== userId)
      throw new Error("Unauthorized to delete this comment");

    // Delete comment and remove reference from post
    await Promise.all([
      Comment.findByIdAndDelete(commentId),
      Post.findByIdAndUpdate(comment.post, { $pull: { comments: commentId } }),
    ]);

    revalidatePath(`/posts/${comment.post}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw new Error("Failed to delete comment");
  }
}

/**
 * Search posts by query
 */
export async function searchPosts(query: string, limit = 20, page = 1) {
  try {
    await connectToDB();

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    const posts = await Post.find({
      $or: [
        { content: { $regex: query, $options: "i" } },
        { tags: { $in: [new RegExp(query, "i")] } },
      ],
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "username profilePicture displayName")
      .lean();

    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("Error searching posts:", error);
    throw new Error("Failed to search posts");
  }
}
