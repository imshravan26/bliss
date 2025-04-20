import Link from "next/link";
import { Button } from "@/components/ui/button";
import connectToDB from "@/lib/db/connect";

export default function LandingPage() {
  connectToDB();
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-700 text-white">
      <div className="container mx-auto px-4 py-4">
        <header className="flex justify-between items-center mb-20">
          <div className="text-3xl font-bold">Bliss</div>
          <div className="flex gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-white text-purple-900 hover:bg-gray-100">
                Join Now
              </Button>
            </Link>
          </div>
        </header>

        <main className="flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Unleash Your Creativity
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl">
            Join a vibrant community of creative minds. Share your poetry,
            stories, and comedy. Participate in challenges and connect with
            like-minded individuals.
          </p>

          <Link href="/sign-up">
            <Button
              size="lg"
              className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-6 text-lg"
            >
              Get Started
            </Button>
          </Link>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4">Share Your Work</h2>
              <p>
                Post your creative content, get feedback, and build your
                audience.
              </p>
            </div>
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4">Join Challenges</h2>
              <p>
                Participate in poetry, storytelling, and comedy challenges to
                showcase your talent.
              </p>
            </div>
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4">Connect & Grow</h2>
              <p>
                Follow other creators, exchange ideas, and grow your creative
                network.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
