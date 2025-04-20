// // components/forms/PostForm.tsx
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useUser } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { createPost } from "@/lib/actions/post.actions";
// import { ImagePlus, X } from "lucide-react";

// export default function PostForm() {
//   const { user } = useUser();
//   const router = useRouter();
//   const [content, setContent] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [tags, setTags] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showImageInput, setShowImageInput] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!content.trim()) return;

//     try {
//       setIsSubmitting(true);

//       const tagArray = tags
//         .split(",")
//         .map((tag) => tag.trim())
//         .filter((tag) => tag.length > 0);

//       await createPost({
//         content,
//         imageUrl: imageUrl || undefined,
//         tags: tagArray,
//       });

//       // Reset form
//       setContent("");
//       setImageUrl("");
//       setTags("");
//       setShowImageInput(false);

//       // Refresh feed
//       router.refresh();
//     } catch (error) {
//       console.error("Error creating post:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-4 p-4 border rounded-lg bg-white"
//     >
//       <div>
//         <Textarea
//           placeholder="Share your creative thoughts, ideas, or work..."
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           rows={3}
//           className="resize-none"
//           required
//         />
//       </div>

//       {showImageInput && (
//         <div className="relative">
//           <Label htmlFor="image-url">Image URL</Label>
//           <Input
//             id="image-url"
//             type="url"
//             placeholder="https://example.com/your-image.jpg"
//             value={imageUrl}
//             onChange={(e) => setImageUrl(e.target.value)}
//             className="pr-8"
//           />
//           <button
//             type="button"
//             onClick={() => {
//               setImageUrl("");
//               setShowImageInput(false);
//             }}
//             className="absolute right-2 top-8 text-gray-500 hover:text-red-500"
//           >
//             <X size={16} />
//           </button>
//         </div>
//       )}

//       <div>
//         <Label htmlFor="tags">Tags (comma separated)</Label>
//         <Input
//           id="tags"
//           placeholder="poetry, art, creative writing"
//           value={tags}
//           onChange={(e) => setTags(e.target.value)}
//         />
//       </div>

//       <div className="flex items-center justify-between">
//         <div className="flex gap-2">
//           {!showImageInput && (
//             <Button
//               type="button"
//               variant="outline"
//               size="sm"
//               onClick={() => setShowImageInput(true)}
//             >
//               <ImagePlus size={18} className="mr-1" />
//               Add Image
//             </Button>
//           )}
//         </div>

//         <Button type="submit" disabled={isSubmitting || !content.trim()}>
//           {isSubmitting ? "Posting..." : "Post"}
//         </Button>
//       </div>
//     </form>
//   );
// }
