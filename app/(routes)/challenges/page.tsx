"use client";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import ChallengeList from "@/components/challenges/challengeList";

export default function ChallengesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-4">
          <ChallengeList />
        </main>
      </div>
      <Footer />
    </div>
  );
}
