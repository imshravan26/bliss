// components/common/UserCard.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { User, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserCardProps {
  _id: string;
  clerkId: string;
  name: string;
  username: string;
  bio: string;
  profileImage?: string;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
  isCurrentUser?: boolean;
}

export default function UserCard({
  _id,
  name,
  username,
  bio,
  profileImage,
  followersCount,
  followingCount,
  isFollowing,
  isCurrentUser = false,
}: UserCardProps) {
  const [isFollowingState, setIsFollowingState] = useState(isFollowing);
  const [followers, setFollowers] = useState(followersCount);
  const [isLoading, setIsLoading] = useState(false);

  // const handleFollowAction = async () => {
  //   if (!user) {
  //     router.push("/sign-in");
  //     return;
  //   }

  //   setIsLoading(true);

  //   try {
  //     if (isFollowingState) {
  //       await unfollowUser(_id);
  //       setFollowers((prev) => prev - 1);
  //     } else {
  //       await followUser(_id);
  //       setFollowers((prev) => prev + 1);
  //     }

  //     setIsFollowingState(!isFollowingState);
  //     router.refresh();
  //   } catch (error) {
  //     console.error("Error toggling follow status:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-24 relative"></div>

      <div className="px-4 pt-0 pb-4">
        <div className="relative -mt-10 mb-3 flex justify-between">
          <div className="relative h-16 w-16 rounded-full overflow-hidden border-4 border-white bg-gray-200">
            {profileImage ? (
              <Image
                src={profileImage}
                alt={name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100">
                <User size={24} className="text-gray-400" />
              </div>
            )}
          </div>

          {!isCurrentUser && (
            <div className="flex gap-2">
              <Button
                variant={isFollowingState ? "outline" : "default"}
                size="sm"
                disabled={isLoading}
              >
                {isFollowingState ? "Following" : "Follow"}
              </Button>

              <Button variant="outline" size="sm" asChild>
                <Link href={`/messages?user=${_id}`}>
                  <MessageCircle size={16} className="mr-1" />
                  Message
                </Link>
              </Button>
            </div>
          )}
        </div>

        <Link href={`/profile/${_id}`}>
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-gray-500 text-sm mb-2">@{username}</p>
        </Link>

        {bio && <p className="text-sm mb-3 line-clamp-2">{bio}</p>}

        <div className="flex gap-4 text-sm">
          <p>
            {followers} <span className="text-gray-500">Followers</span>
          </p>
          <p>
            {followingCount} <span className="text-gray-500">Following</span>
          </p>
        </div>
      </div>
    </div>
  );
}
