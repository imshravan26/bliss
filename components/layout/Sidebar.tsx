"use client";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import {
  Home,
  Trophy,
  Users,
  MessageSquare,
  Heart,
  Bookmark,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const { user } = useUser();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-white border-r hidden md:block">
      <div className="p-4">
        <div className="space-y-1">
          <Link
            href="/feed"
            className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <Home size={20} />
            <span>Feed</span>
          </Link>
          <Link
            href="/challenges"
            className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <Trophy size={20} />
            <span>Challenges</span>
          </Link>
          <Link
            href="/explore"
            className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <Users size={20} />
            <span>Community</span>
          </Link>
          <Link
            href="/messages"
            className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <MessageSquare size={20} />
            <span>Messages</span>
          </Link>
          <Link
            href={`/profile/${user?.id}`}
            className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <Heart size={20} />
            <span>My Profile</span>
          </Link>
          <Link
            href="/bookmarks"
            className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <Bookmark size={20} />
            <span>Saved Posts</span>
          </Link>
        </div>

        <hr className="my-4" />

        <div className="space-y-1">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
