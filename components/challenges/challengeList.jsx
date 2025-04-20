"use client";
import { useState, useEffect } from "react";
import ChallengeCard from "./challengeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChallengeList() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchChallenges() {
      try {
        const response = await fetch("/api/challenges");
        if (!response.ok) {
          throw new Error("Failed to fetch challenges");
        }
        const data = await response.json();
        setChallenges(data);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchChallenges();
  }, []);

  const filteredChallenges = challenges.filter(
    (challenge) =>
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateChallenge = () => {
    router.push("/challenges/create");
  };

  if (loading) {
    return <div className="text-center py-10">Loading challenges...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Creative Challenges</h1>
          <p className="text-gray-600 mt-1">
            Showcase your talent and compete with other creators
          </p>
        </div>
        <Button className="mt-4 md:mt-0" onClick={handleCreateChallenge}>
          Create Challenge
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 relative min-w-[200px]">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search challenges..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {filteredChallenges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard key={challenge._id} challenge={challenge} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700">
            No Upcoming Challenges
          </h3>
          <p className="text-gray-500 mt-2">
            Be the first to create a challenge for the community
          </p>
          <Button className="mt-4" onClick={handleCreateChallenge}>
            Create New Challenge
          </Button>
        </div>
      )}
    </div>
  );
}
