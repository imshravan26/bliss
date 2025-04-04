"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Menu,
  Search,
  X,
  Home,
  Trophy,
  Users,
  PlusSquare,
  Settings,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useUser,
  useClerk,
} from "@clerk/nextjs";

export function NavBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2 mr-4">
          <Link href="/" className="flex items-center gap-2">
            <Badge className="h-8 w-8 rounded-full bg-primary p-2 text-primary-foreground">
              B
            </Badge>
            <span className="hidden font-bold sm:inline-block">Bliss</span>
          </Link>
        </div>

        {isSearchOpen ? (
          <div className="flex flex-1 items-center">
            <Input
              type="search"
              placeholder="Search challenges, users, or content..."
              className="h-9 md:w-[300px] lg:w-[400px]"
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <div className="hidden md:flex md:flex-1">
              <nav className="flex items-center gap-6 text-sm">
                <Link
                  href="/"
                  className="font-medium transition-colors hover:text-primary"
                >
                  Home
                </Link>
                <Link
                  href="/challenges"
                  className="font-medium transition-colors hover:text-primary"
                >
                  Challenges
                </Link>
                <Link
                  href="/leaderboard"
                  className="font-medium transition-colors hover:text-primary"
                >
                  Leaderboard
                </Link>
                <Link
                  href="/community"
                  className="font-medium transition-colors hover:text-primary"
                >
                  Community
                </Link>
              </nav>
            </div>

            <div className="flex flex-1 items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="md:flex"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>

              <SignedIn>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
                </Button>
              </SignedIn>

              {/* Authentication Controls */}
              <SignedOut>
                <div className="flex items-center gap-2">
                  <SignInButton>
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button size="sm">Sign Up</Button>
                  </SignUpButton>
                </div>
              </SignedOut>

              <SignedIn>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            user?.imageUrl ||
                            "/placeholder.svg?height=32&width=32"
                          }
                        />
                        <AvatarFallback>
                          {user?.firstName?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">
                          {user?.fullName || "Username"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Level 12
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link
                        href="/profile"
                        className="flex w-full items-center"
                      >
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href="/settings"
                        className="flex w-full items-center"
                      >
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <SignOutButton className="w-full text-left">
                        Log out
                      </SignOutButton>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SignedIn>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Bliss</SheetTitle>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Link
                        href="/"
                        className="flex items-center gap-2 px-2 py-1 text-sm"
                      >
                        <Home className="h-4 w-4" />
                        <span>Home</span>
                      </Link>
                      <Link
                        href="/challenges"
                        className="flex items-center gap-2 px-2 py-1 text-sm"
                      >
                        <PlusSquare className="h-4 w-4" />
                        <span>Challenges</span>
                      </Link>
                      <Link
                        href="/leaderboard"
                        className="flex items-center gap-2 px-2 py-1 text-sm"
                      >
                        <Trophy className="h-4 w-4" />
                        <span>Leaderboard</span>
                      </Link>
                      <Link
                        href="/community"
                        className="flex items-center gap-2 px-2 py-1 text-sm"
                      >
                        <Users className="h-4 w-4" />
                        <span>Community</span>
                      </Link>
                    </div>
                    <div className="border-t pt-4">
                      <div className="grid gap-2">
                        <SignedIn>
                          <Link
                            href="/settings"
                            className="flex items-center gap-2 px-2 py-1 text-sm"
                          >
                            <Settings className="h-4 w-4" />
                            <span>Settings</span>
                          </Link>
                          <SignOutButton className="flex w-full items-center gap-2 px-2 py-1 text-sm">
                            <LogOut className="h-4 w-4" />
                            <span>Log out</span>
                          </SignOutButton>
                        </SignedIn>
                        <SignedOut>
                          <div className="flex flex-col gap-2 mt-2">
                            <SignInButton>
                              <Button
                                className="w-full"
                                variant="outline"
                                size="sm"
                              >
                                Sign In
                              </Button>
                            </SignInButton>
                            <SignUpButton>
                              <Button className="w-full" size="sm">
                                Sign Up
                              </Button>
                            </SignUpButton>
                          </div>
                        </SignedOut>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

// Custom SignOutButton component
function SignOutButton({ className, children }) {
  const { signOut } = useClerk();

  return (
    <button
      className={className}
      onClick={() => signOut(() => (window.location.href = "/"))}
    >
      {children}
    </button>
  );
}
