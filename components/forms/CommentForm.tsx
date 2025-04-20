// // components/forms/CommentForm.tsx
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { createComment } from "@/lib/actions/post.actions";

// interface CommentFormProps {
//   postId: string;
// }

// export default function CommentForm({ postId }: CommentFormProps) {
//   const router = useRouter();
//   const [content, setContent] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!content.trim()) return;

//     try {
//       setIsSubmitting(true);

//       await createComment({
//         postId,
//         content,
//       });

//       // Reset form
//       setContent("");

//       // Refresh comments
//       router.refresh();
//     } catch (error) {
//       console.error("Error creating comment:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mt-4 space-y-2">
//       <Textarea
//         placeholder="Share your thoughts on this post..."
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         rows={2}
//         className="resize-none"
//         required
//       />

//       <div className="flex justify-end">
//         <Button
//           type="submit"
//           size="sm"
//           disabled={isSubmitting || !content.trim()}
//         >
//           {isSubmitting ? "Submitting..." : "Comment"}
//         </Button>
//       </div>
//     </form>
//   );
// }
