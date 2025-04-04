import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { NavBar } from "@/components/nav-bar";
import { Award, Edit, Settings, Star, Trophy, Users } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <NavBar />
      <main className="container px-4 py-6 md:py-10">
        <div className="flex flex-col gap-8">
          <section>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <Avatar className="h-24 w-24 border-4 border-background">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <h1 className="text-2xl font-bold">Username</h1>
                      <Badge variant="outline" className="w-fit">
                        Level 12
                      </Badge>
                    </div>

                    <p className="text-muted-foreground">
                      Creative enthusiast passionate about photography and
                      writing. Always looking for new challenges!
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Photography</Badge>
                      <Badge variant="secondary">Writing</Badge>
                      <Badge variant="secondary">Design</Badge>
                    </div>
                  </div>

                  <div className="flex gap-2 self-end md:self-start">
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Achievements
                </CardTitle>
                <CardDescription>Unlocked badges and rewards</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-2">
                {[
                  {
                    name: "Early Bird",
                    icon: <Star className="h-6 w-6 text-yellow-500" />,
                  },
                  {
                    name: "Creative Genius",
                    icon: <Award className="h-6 w-6 text-purple-500" />,
                  },
                  {
                    name: "Team Player",
                    icon: <Users className="h-6 w-6 text-blue-500" />,
                  },
                  {
                    name: "Challenger",
                    icon: <Trophy className="h-6 w-6 text-orange-500" />,
                  },
                  {
                    name: "Consistent",
                    icon: <Star className="h-6 w-6 text-green-500" />,
                  },
                  {
                    name: "Popular",
                    icon: <Users className="h-6 w-6 text-pink-500" />,
                  },
                ].map((badge, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center rounded-lg bg-muted/50 p-3 text-center"
                  >
                    {badge.icon}
                    <span className="mt-1 text-xs">{badge.name}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Stats & Progress</CardTitle>
                <CardDescription>Your activity on Bliss</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
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

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="rounded-lg bg-muted/50 p-3 text-center">
                      <p className="text-2xl font-bold">24</p>
                      <p className="text-xs text-muted-foreground">
                        Challenges Completed
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3 text-center">
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-xs text-muted-foreground">
                        Day Streak
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3 text-center">
                      <p className="text-2xl font-bold">1,248</p>
                      <p className="text-xs text-muted-foreground">Total XP</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3 text-center">
                      <p className="text-2xl font-bold">42</p>
                      <p className="text-xs text-muted-foreground">
                        Connections
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <Tabs defaultValue="submissions" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="submissions">My Submissions</TabsTrigger>
                <TabsTrigger value="challenges">Active Challenges</TabsTrigger>
                <TabsTrigger value="connections">Connections</TabsTrigger>
              </TabsList>

              <TabsContent value="submissions" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <Badge variant="outline">Photography</Badge>
                          <Badge variant="secondary">500 XP earned</Badge>
                        </div>
                        <CardTitle className="mt-2">
                          Photo Storytelling Challenge
                        </CardTitle>
                        <CardDescription>Submitted 3 days ago</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-md overflow-hidden">
                          <img
                            src="/placeholder.svg?height=200&width=400"
                            alt="Challenge submission"
                            className="w-full h-48 object-cover"
                          />
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          My submission for the photo storytelling challenge. I
                          wanted to capture the feeling of nostalgia...
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="challenges">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    You don't have any active challenges right now.
                  </p>
                  <Button className="mt-4">Browse Challenges</Button>
                </div>
              </TabsContent>

              <TabsContent value="connections">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i}>
                      <CardContent className="p-4 flex items-center gap-4">
                        <Avatar>
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40`}
                          />
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Username{i}</p>
                          <p className="text-xs text-muted-foreground">
                            Level {8 + i}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="ml-auto">
                          View Profile
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
    </div>
  );
}
