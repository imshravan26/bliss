// components/common/Challenge.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { Calendar, Users, ArrowRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
// import { deleteChallenge } from "@/lib/actions/message.actions";

interface ChallengeProps {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  startDate: string;
  endDate: string;
  createdBy: {
    _id: string;
    clerkId: string;
    name: string;
    username: string;
    profileImage?: string;
  };
  participantsCount: number;
  submissionsCount: number;
  isActive: boolean;
  hasSubmitted?: boolean;
}

export default function Challenge({
  _id,
  title,
  description,
  category,
  imageUrl,
  startDate,
  endDate,
  createdBy,
  participantsCount,
  submissionsCount,
  isActive,
  hasSubmitted,
}: ChallengeProps) {
  const router = useRouter();
  const { user } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);

  const startDateTime = new Date(startDate);
  const endDateTime = new Date(endDate);
  const now = new Date();

  const totalDuration = endDateTime.getTime() - startDateTime.getTime();
  const timeElapsed = now.getTime() - startDateTime.getTime();
  const progressPercentage = Math.min(
    Math.max(0, (timeElapsed / totalDuration) * 100),
    100
  );

  const isCreator = user?.id === createdBy.clerkId;

  // const handleDelete = async () => {
  //   if (window.confirm("Are you sure you want to delete this challenge?")) {
  //     try {
  //       await deleteChallenge(_id);
  //       router.refresh();
  //     } catch (error) {
  //       console.error("Error deleting challenge:", error);
  //     }
  //   }
  // };

  return (
    <div className="border rounded-lg overflow-hidden bg-white mb-6">
      {/* Challenge Header */}
      <div className="relative">
        {imageUrl ? (
          <div className="relative h-48 w-full">
            <Image src={imageUrl} alt={title} fill className="object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
        ) : (
          <div className="h-24 bg-gradient-to-r from-purple-500 to-blue-500"></div>
        )}

        <div className="absolute top-4 right-4 z-10">
          <Badge variant={isActive ? "success" : "secondary"}>
            {isActive ? "Active" : "Closed"}
          </Badge>
        </div>

        <div className="absolute bottom-4 left-4 z-10">
          <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-md">
            {title}
          </h2>
          <Badge variant="outline" className="bg-white bg-opacity-80">
            {category}
          </Badge>
        </div>
      </div>

      {/* Challenge Info */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <Link
            href={`/profile/${createdBy._id}`}
            className="flex items-center gap-2"
          >
            <div className="relative h-8 w-8 rounded-full overflow-hidden bg-gray-200">
              {createdBy.profileImage && (
                <Image
                  src={createdBy.profileImage}
                  alt={createdBy.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div>
              <span className="text-sm font-medium">{createdBy.name}</span>
              <p className="text-xs text-gray-500">@{createdBy.username}</p>
            </div>
          </Link>

          {isCreator && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-red-500">
                  Delete Challenge
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <p className={`text-gray-700 mb-4 ${!isExpanded && "line-clamp-2"}`}>
          {description}
        </p>

        {description.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-purple-600 text-sm mb-4"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-gray-500" />
            <div>
              <p className="text-sm">
                {startDateTime.toLocaleDateString()} -{" "}
                {endDateTime.toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(endDateTime, { addSuffix: true })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Users size={18} className="text-gray-500" />
            <p className="text-sm">
              {participantsCount} Participants, {submissionsCount} Submissions
            </p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Started</span>
            <span>
              Ends {formatDistanceToNow(endDateTime, { addSuffix: true })}
            </span>
          </div>
          <Progress value={progressPercentage} />
        </div>

        <div className="flex justify-end">
          <Button asChild>
            <Link href={`/challenges/${_id}`}>
              {hasSubmitted ? "View Submissions" : "Participate"}{" "}
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
