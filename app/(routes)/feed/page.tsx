"use client";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image, Smile, Send, Heart, MessageSquare, Share2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { createPost } from "@/lib/actions/post.actions";
import { formatDistanceToNow } from "date-fns";

// Comment component
function CommentCard({ comment, currentUserId, onLike }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (comment.likes) {
      setLikeCount(comment.likes.length);
      setIsLiked(comment.likes.includes(currentUserId));
    }
  }, [comment, currentUserId]);

  const handleLike = async () => {
    if (!currentUserId) return;

    try {
      const response = await fetch(`/api/comments/${comment._id}/like`, {
        method: "POST",
      });

      if (response.ok) {
        const result = await response.json();
        setIsLiked(result.isLiked);
        setLikeCount(result.likes.length);
        if (onLike) onLike();
      }
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  return (
    <div className="pl-12 py-3 border-t">
      <div className="flex items-start gap-2">
        <div className="h-8 w-8 rounded-full bg-gray-300 flex-shrink-0"></div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-sm">
              {comment.author.displayName || comment.author.id}
            </h4>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
          <p className="text-sm mt-1">{comment.content}</p>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs mt-1 h-6 px-2"
            onClick={handleLike}
          >
            <Heart
              className={`h-3 w-3 mr-1 ${
                isLiked ? "fill-red-500 text-red-500" : ""
              }`}
            />
            {likeCount}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Post component to display each post
function PostCard({ post, currentUserId, onUpdate }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    if (post.likes) {
      setLikeCount(post.likes.length);
      setIsLiked(post.likes.includes(currentUserId));
    }
  }, [post, currentUserId]);

  const handleLike = async () => {
    if (!currentUserId) return;

    try {
      const response = await fetch(`/api/posts/${post._id}/like`, {
        method: "POST",
      });

      if (response.ok) {
        const result = await response.json();
        setIsLiked(result.isLiked);
        setLikeCount(result.likes.length);
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const loadComments = async () => {
    if (!showComments) {
      try {
        setIsLoadingComments(true);
        const response = await fetch(`/api/posts/${post._id}/comments`);

        if (response.ok) {
          const commentsData = await response.json();
          setComments(commentsData);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setIsLoadingComments(false);
      }
    }
    setShowComments(!showComments);
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!currentUserId || !newComment.trim()) return;

    try {
      setIsSubmittingComment(true);
      const response = await fetch(`/api/posts/${post._id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        // Refresh comments
        const commentsResponse = await fetch(`/api/posts/${post._id}/comments`);
        if (commentsResponse.ok) {
          const commentsData = await commentsResponse.json();
          setComments(commentsData);
        }
        setNewComment("");
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
          {post.author.profilePicture && (
            <img
              src={post.author.profilePicture}
              alt={post.author.displayName || post.author.username}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">
              {post.author.displayName || post.author.username}
            </h3>
            <span className="text-sm text-gray-500">
              @{post.author.username}
            </span>
            <span className="text-xs text-gray-400">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
          <p className="mt-2">{post.content}</p>

          {post.mediaUrl && (
            <div className="mt-3 rounded-lg overflow-hidden max-h-96">
              <img
                src={post.mediaUrl}
                alt="Post media"
                className="w-full object-contain"
              />
            </div>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              disabled={!currentUserId}
            >
              <Heart
                className={`h-4 w-4 mr-1 ${
                  isLiked ? "fill-red-500 text-red-500" : ""
                }`}
              />
              Like ({likeCount})
            </Button>
            <Button variant="ghost" size="sm" onClick={loadComments}>
              <MessageSquare className="h-4 w-4 mr-1" />
              Comment ({post.comments ? post.comments.length : 0})
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>

          {/* Comments section */}
          {showComments && (
            <div className="mt-4 border-t pt-4">
              {currentUserId && (
                <form
                  onSubmit={submitComment}
                  className="flex items-center gap-2"
                >
                  <Textarea
                    placeholder="Write a comment..."
                    className="text-sm resize-none min-h-10"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={isSubmittingComment}
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={isSubmittingComment || !newComment.trim()}
                  >
                    {isSubmittingComment ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
                    ) : (
                      "Post"
                    )}
                  </Button>
                </form>
              )}

              {isLoadingComments ? (
                <div className="py-4 text-center">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">
                    Loading comments...
                  </p>
                </div>
              ) : comments.length > 0 ? (
                <div className="mt-2">
                  {comments.map((comment) => (
                    <CommentCard
                      key={comment._id}
                      comment={comment}
                      currentUserId={currentUserId}
                      onLike={onUpdate}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4 text-sm">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FeedPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Function to fetch posts
  const fetchPosts = async (pageNum = 1, append = false) => {
    try {
      setLoadingPosts(true);

      // Use the URL structure that matches your API routes
      const response = await fetch(`/api/posts?limit=10&page=${pageNum}`);

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {
        if (append) {
          setPosts((prevPosts) => [...prevPosts, ...data]);
        } else {
          setPosts(data);
        }
        setPage(pageNum);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoadingPosts(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Load more posts function
  const loadMorePosts = () => {
    if (!loadingPosts && hasMore) {
      fetchPosts(page + 1, true);
    }
  };

  // Handle post creation
  const handlePost = async () => {
    if (!isLoaded) {
      console.log("User data not loaded yet");
      return;
    }

    if (!isSignedIn || !user) {
      alert("You must be logged in to post.");
      return;
    }

    if (!content.trim()) {
      alert("Post content cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      const result = await createPost(
        user.id,
        content,
        mediaUrl || undefined,
        tags.length > 0 ? tags : undefined
      );

      // Refresh posts after creating a new one
      fetchPosts();

      // Reset form
      setContent("");
      setMediaUrl("");
      setTags([]);
    } catch (err) {
      console.error("Post failed:", err);
      if (err instanceof Error) {
        alert(`Error: ${err.message}`);
      } else {
        alert("Something went wrong while posting.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 pt-16">
        <Sidebar />

        <main className="flex-1 md:ml-64 p-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Create Post Card */}
            <div className="bg-white rounded-xl shadow p-4">
              <Textarea
                placeholder="Share something creative..."
                className="min-h-24 resize-none mb-4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={loading}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const url = prompt("Enter media URL:");
                      if (url) setMediaUrl(url);
                    }}
                  >
                    <Image className="h-5 w-5 mr-1" />
                    Media
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const tag = prompt("Add a tag:");
                      if (tag) setTags([...tags, tag]);
                    }}
                  >
                    <Smile className="h-5 w-5 mr-1" />
                    Add Tag
                  </Button>
                </div>
                <Button onClick={handlePost} disabled={loading || !isSignedIn}>
                  <Send className="h-4 w-4 mr-2" />
                  {loading ? "Posting..." : "Post"}
                </Button>
              </div>
              {mediaUrl && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Media URL added: {mediaUrl}
                  </p>
                </div>
              )}
              {tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {user ? (
                <div className="mt-2 text-xs text-gray-500">
                  Posting as: {user.username || user.firstName} (ID: {user.id})
                </div>
              ) : isLoaded ? (
                <div className="mt-2 text-xs text-red-500">
                  Please sign in to post
                </div>
              ) : (
                <div className="mt-2 text-xs text-gray-500">
                  Loading user data...
                </div>
              )}
            </div>

            {/* Dynamic Posts */}
            {loadingPosts && posts.length === 0 ? (
              <div className="text-center py-10">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
                <p className="mt-2 text-gray-500">Loading posts...</p>
              </div>
            ) : posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    currentUserId={user?.id}
                    onUpdate={fetchPosts}
                  />
                ))}

                {hasMore && (
                  <div className="text-center pb-4">
                    <Button
                      variant="outline"
                      onClick={loadMorePosts}
                      disabled={loadingPosts}
                    >
                      {loadingPosts ? (
                        <>
                          <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
                          Loading...
                        </>
                      ) : (
                        "Load More"
                      )}
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-10 bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-medium">No posts yet</h3>
                <p className="text-gray-500 mt-2">
                  Be the first to share something with the community!
                </p>
              </div>
            )}
          </div>
        </main>

        <aside className="hidden lg:block w-72 p-4 border-l">
          <div className="sticky top-20">
            <h3 className="font-semibold mb-4">Active Challenges</h3>
            <div className="space-y-4">
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                <h4 className="font-medium text-purple-800">
                  Spring Poetry Challenge
                </h4>
                <p className="text-sm text-gray-600 mt-1">Ends in 3 days</p>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  View Challenge
                </Button>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <h4 className="font-medium text-blue-800">
                  Flash Fiction Contest
                </h4>
                <p className="text-sm text-gray-600 mt-1">Ends in 5 days</p>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  View Challenge
                </Button>
              </div>
            </div>

            <h3 className="font-semibold mt-8 mb-4">Suggested Connections</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                  <div>
                    <p className="font-medium">Maya Chen</p>
                    <p className="text-xs text-gray-500">Poet & Illustrator</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Follow
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                  <div>
                    <p className="font-medium">Jordan Lee</p>
                    <p className="text-xs text-gray-500">Comedy Writer</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Follow
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <Footer />
    </div>
  );
}
