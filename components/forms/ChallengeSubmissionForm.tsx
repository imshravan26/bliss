// // components/forms/ChallengeSubmissionForm.tsx
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { ImagePlus, X } from "lucide-react";
// import { submitToChallenge } from "@/lib/actions/challenge.actions";

// interface ChallengeSubmissionFormProps {
//   challengeId: string;
// }

// export default function ChallengeSubmissionForm({
//   challengeId,
// }: ChallengeSubmissionFormProps) {
//   const router = useRouter();
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showImageInput, setShowImageInput] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!title.trim() || !content.trim()) return;

//     try {
//       setIsSubmitting(true);

//       await submitToChallenge({
//         challengeId,
//         title,
//         content,
//         imageUrl: imageUrl || undefined,
//       });

//       // Reset form
//       setTitle("");
//       setContent("");
//       setImageUrl("");
//       setShowImageInput(false);

//       // Redirect to challenge page
//       router.push(`/challenges/${challengeId}`);
//       router.refresh();
//     } catch (error) {
//       console.error("Error submitting to challenge:", error);
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
//         <Label htmlFor="submission-title">Title</Label>
//         <Input
//           id="submission-title"
//           placeholder="Give your submission a title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//       </div>

//       <div>
//         <Label htmlFor="submission-content">Content</Label>
//         <Textarea
//           id="submission-content"
//           placeholder="Share your creative work for this challenge..."
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           rows={6}
//           className="resize-none"
//           required
//         />
//       </div>

//       {showImageInput && (
//         <div className="relative">
//           <Label htmlFor="image-url">Image URL (optional)</Label>
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

//         <Button
//           type="submit"
//           disabled={isSubmitting || !title.trim() || !content.trim()}
//         >
//           {isSubmitting ? "Submitting..." : "Submit"}
//         </Button>
//       </div>
//     </form>
//   );
// }
