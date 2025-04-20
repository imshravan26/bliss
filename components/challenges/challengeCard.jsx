"use client";
import { Button } from "@/components/ui/button";
import { Clock, Users, Trophy } from "lucide-react";

export default function ChallengeCard({ challenge }) {
  const {
    title,
    description,
    startColor,
    endColor,
    daysLeft,
    participants,
    status,
    winner,
  } = challenge;

  const isCompleted = status === "completed";

  return (
    <div
      className={`bg-white rounded-xl shadow overflow-hidden ${
        isCompleted ? "opacity-70" : ""
      }`}
    >
      <div
        className={`h-32 flex items-center justify-center p-4 relative bg-gradient-to-r ${
          isCompleted
            ? "from-gray-500 to-gray-700"
            : `from-${startColor} to-${endColor}`
        }`}
      >
        {isCompleted && (
          <div className="absolute top-2 right-2 bg-white text-xs font-semibold px-2 py-1 rounded-full text-gray-700">
            Completed
          </div>
        )}
        <h3 className="text-2xl font-bold text-white text-center">{title}</h3>
      </div>
      <div className="p-4">
        <p className="text-gray-700">{description}</p>
        <div className="flex items-center gap-4 mt-4">
          {isCompleted ? (
            <div className="flex items-center text-sm text-gray-500">
              <Trophy className="h-4 w-4 mr-1" />
              <span>Winner: {winner}</span>
            </div>
          ) : (
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>{daysLeft} days left</span>
            </div>
          )}
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-1" />
            <span>{participants} participants</span>
          </div>
        </div>
        <Button
          variant={isCompleted ? "outline" : "default"}
          className="w-full mt-4"
        >
          {isCompleted ? "View Results" : "Join Challenge"}
        </Button>
      </div>
    </div>
  );
}
