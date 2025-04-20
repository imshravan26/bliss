import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Search, Bell, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-6">
          <Link href="/feed" className="font-bold text-2xl text-purple-700">
            Bliss
          </Link>
          <div className="hidden md:block relative w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search..." className="pl-8 h-9" />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/feed" className="text-gray-600 hover:text-purple-700">
            Feed
          </Link>
          <Link
            href="/challenges"
            className="text-gray-600 hover:text-purple-700"
          >
            Challenges
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-purple-700"
          >
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>
          <Link href="/messages">
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5 text-gray-600" />
            </Button>
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}
