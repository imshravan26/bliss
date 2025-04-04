import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Award,
  FlameIcon as Fire,
  LightbulbIcon,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { NavBar } from "@/components/nav-bar";
import { ChallengeCard } from "@/components/challenge-card";
import { UserRankCard } from "@/components/user-rank-card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <NavBar />
      <main className="container px-4 py-6 md:py-10">
        <div className="flex flex-col gap-8">
          <section className="space-y-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome to Bliss
              </h1>
              <p className="text-muted-foreground">
                Complete challenges, earn XP, and connect with creative minds
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="col-span-1 md:col-span-2">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Daily Challenge</CardTitle>
                    <Badge
                      variant="secondary"
                      className="flex gap-1 items-center"
                    >
                      <Fire className="h-3 w-3 text-orange-500" />
                      <span>500 XP</span>
                    </Badge>
                  </div>
                  <CardDescription>
                    Complete within 24 hours for bonus rewards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg overflow-hidden bg-muted/50 p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Photo Storytelling
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Take a photo that tells a story without using any words.
                      Let your creativity shine!
                    </p>
                    <div className="flex justify-end">
                      <Button>Accept Challenge</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Your Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Level 12</span>
                      <span>2,450 / 3,000 XP</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: "82%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="rounded-lg bg-muted/50 p-2">
                      <p className="text-2xl font-bold">24</p>
                      <p className="text-xs text-muted-foreground">
                        Challenges Completed
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-2">
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-xs text-muted-foreground">
                        Day Streak
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Tabs defaultValue="feed" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="feed">Community Feed</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="space-y-4">
              <ScrollArea className="h-[500px] rounded-md border p-4">
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Card key={i}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage
                                src={`/placeholder.svg?height=40&width=40`}
                              />
                              <AvatarFallback>U{i}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">User{i}</p>
                              <p className="text-xs text-muted-foreground">
                                2 hours ago
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="flex gap-1 items-center"
                          >
                            <LightbulbIcon className="h-3 w-3 text-yellow-500" />
                            <span>Creative Writing</span>
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-4">
                          Just completed the daily writing challenge! Here's my
                          short story about a world where dreams become
                          reality...
                        </p>
                        <div className="rounded-md bg-muted/30 p-3 text-sm">
                          <p>
                            In a world where dreams manifested into reality,
                            people learned to be careful what they imagined
                            before sleep...
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2">
                        <div className="flex gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex gap-1"
                          >
                            <Sparkles className="h-4 w-4" />
                            <span>128</span>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <span>Comments (24)</span>
                          </Button>
                        </div>
                        <Button variant="outline" size="sm">
                          Share
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="challenges" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ChallengeCard
                  title="Photo Storytelling"
                  category="Photography"
                  xp={500}
                  participants={128}
                  deadline="24 hours"
                  description="Take a photo that tells a story without using any words."
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
              </div>
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    Weekly Top Performers
                  </CardTitle>
                  <CardDescription>
                    Users with the most XP earned this week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-2">
                      <UserRankCard
                        rank={1}
                        username="CreativeMind"
                        level={24}
                        xp={4850}
                        avatar="/placeholder.svg?height=40&width=40"
                      />
                      <UserRankCard
                        rank={2}
                        username="ArtisticSoul"
                        level={22}
                        xp={4320}
                        avatar="/placeholder.svg?height=40&width=40"
                      />
                      <UserRankCard
                        rank={3}
                        username="WordWeaver"
                        level={20}
                        xp={3980}
                        avatar="/placeholder.svg?height=40&width=40"
                      />
                      <UserRankCard
                        rank={4}
                        username="VisualStory"
                        level={19}
                        xp={3640}
                        avatar="/placeholder.svg?height=40&width=40"
                      />
                      <UserRankCard
                        rank={5}
                        username="MusicMaestro"
                        level={18}
                        xp={3520}
                        avatar="/placeholder.svg?height=40&width=40"
                      />
                      <UserRankCard
                        rank={6}
                        username="DesignDreamer"
                        level={17}
                        xp={3210}
                        avatar="/placeholder.svg?height=40&width=40"
                      />
                      <UserRankCard
                        rank={7}
                        username="PhotoPhenom"
                        level={16}
                        xp={2980}
                        avatar="/placeholder.svg?height=40&width=40"
                      />
                      <UserRankCard
                        rank={8}
                        username="WritingWizard"
                        level={15}
                        xp={2760}
                        avatar="/placeholder.svg?height=40&width=40"
                      />
                      <UserRankCard
                        rank={9}
                        username="SketchMaster"
                        level={14}
                        xp={2540}
                        avatar="/placeholder.svg?height=40&width=40"
                      />
                      <UserRankCard
                        rank={10}
                        username="CreativeGenius"
                        level={13}
                        xp={2320}
                        avatar="/placeholder.svg?height=40&width=40"
                      />
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
