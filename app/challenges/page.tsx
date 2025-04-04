import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NavBar } from "@/components/nav-bar";
import { ChallengeCard } from "@/components/challenge-card";
import { Search } from "lucide-react";

export default function ChallengePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <NavBar />
      <main className="container px-4 py-6 md:py-10">
        <div className="flex flex-col gap-8">
          <section className="space-y-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">Challenges</h1>
              <p className="text-muted-foreground">
                Discover and participate in creative challenges to earn XP and
                unlock rewards
              </p>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search challenges..."
                      className="pl-8"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="photography">Photography</SelectItem>
                        <SelectItem value="writing">Writing</SelectItem>
                        <SelectItem value="art">Art</SelectItem>
                        <SelectItem value="music">Music</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="newest">
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="xp">Highest XP</SelectItem>
                        <SelectItem value="ending">Ending Soon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Challenges</TabsTrigger>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="special">Special Events</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ChallengeCard
                  title="Photo Storytelling"
                  category="Photography"
                  xp={500}
                  participants={128}
                  deadline="24 hours"
                  description="Take a photo that tells a story without using any words. Let your creativity shine!"
                />
                <ChallengeCard
                  title="Micro Poetry"
                  category="Writing"
                  xp={350}
                  participants={87}
                  deadline="3 days"
                  description="Write a poem with exactly 50 words that evokes a strong emotion."
                />
                <ChallengeCard
                  title="Sketch Challenge"
                  category="Art"
                  xp={400}
                  participants={64}
                  deadline="2 days"
                  description="Create a sketch using only three colors of your choice."
                />
                <ChallengeCard
                  title="Music Remix"
                  category="Audio"
                  xp={600}
                  participants={42}
                  deadline="5 days"
                  description="Create a 60-second remix of a popular song in a completely different genre."
                />
                <ChallengeCard
                  title="UI Redesign"
                  category="Design"
                  xp={450}
                  participants={56}
                  deadline="4 days"
                  description="Redesign a common app interface to make it more user-friendly and visually appealing."
                />
                <ChallengeCard
                  title="Nature Macro"
                  category="Photography"
                  xp={380}
                  participants={92}
                  deadline="6 days"
                  description="Capture the hidden details of nature through macro photography."
                />
              </div>

              <div className="flex justify-center">
                <Button variant="outline">Load More Challenges</Button>
              </div>
            </TabsContent>

            <TabsContent value="daily">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ChallengeCard
                  title="Photo Storytelling"
                  category="Photography"
                  xp={500}
                  participants={128}
                  deadline="24 hours"
                  description="Take a photo that tells a story without using any words. Let your creativity shine!"
                />
                <ChallengeCard
                  title="Word of the Day"
                  category="Writing"
                  xp={250}
                  participants={203}
                  deadline="24 hours"
                  description="Write a short story that prominently features today's word: 'Ephemeral'."
                />
                <ChallengeCard
                  title="Quick Sketch"
                  category="Art"
                  xp={300}
                  participants={176}
                  deadline="24 hours"
                  description="Create a 15-minute sketch based on today's prompt: 'Urban Wildlife'."
                />
              </div>
            </TabsContent>

            <TabsContent value="weekly">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ChallengeCard
                  title="Micro Poetry"
                  category="Writing"
                  xp={350}
                  participants={87}
                  deadline="3 days"
                  description="Write a poem with exactly 50 words that evokes a strong emotion."
                />
                <ChallengeCard
                  title="Sketch Challenge"
                  category="Art"
                  xp={400}
                  participants={64}
                  deadline="2 days"
                  description="Create a sketch using only three colors of your choice."
                />
                <ChallengeCard
                  title="UI Redesign"
                  category="Design"
                  xp={450}
                  participants={56}
                  deadline="4 days"
                  description="Redesign a common app interface to make it more user-friendly and visually appealing."
                />
              </div>
            </TabsContent>

            <TabsContent value="monthly">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ChallengeCard
                  title="Music Remix"
                  category="Audio"
                  xp={600}
                  participants={42}
                  deadline="5 days"
                  description="Create a 60-second remix of a popular song in a completely different genre."
                />
                <ChallengeCard
                  title="Nature Macro"
                  category="Photography"
                  xp={380}
                  participants={92}
                  deadline="6 days"
                  description="Capture the hidden details of nature through macro photography."
                />
              </div>
            </TabsContent>

            <TabsContent value="special">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ChallengeCard
                  title="Community Collaboration"
                  category="Special Event"
                  xp={1000}
                  participants={324}
                  deadline="14 days"
                  description="Join forces with other creators to build a collaborative digital art gallery."
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
