"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  UserPlus,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Award,
} from "lucide-react";

export default function ProfilePage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch user data based on the ID
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 pt-16">
        <Sidebar />

        <main className="flex-1 md:ml-64">
          {/* Cover Photo */}
          <div className="h-48 md:h-64 bg-gradient-to-r from-purple-500 to-pink-600"></div>

          {/* Profile Information */}
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-20 mb-6">
              <div className="flex flex-col md:flex-row md:items-end">
                <div className="h-32 w-32 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
                  {/* Profile image would go here */}
                  <div className="h-full w-full bg-gray-300"></div>
                </div>
                <div className="mt-4 md:mt-0 md:ml-4">
                  <h1 className="text-2xl md:text-3xl font-bold">
                    Emma Richards
                  </h1>
                  <p className="text-gray-600">@poetryinmotion</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4 md:mt-0">
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Follow
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="md:w-1/3">
                <div className="bg-white rounded-xl shadow p-4">
                  <h3 className="font-semibold mb-4">About</h3>
                  <p className="text-gray-700 mb-4">
                    Poet, storyteller, and dreamer. I love exploring human
                    emotions through words. Published author of "Whispers in the
                    Wind" anthology.
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Joined April 2023</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>Portland, Oregon</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      <a href="#" className="text-blue-600 hover:underline">
                        emmarichards.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow p-4 mt-4">
                  <h3 className="font-semibold mb-4">Achievements</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Award className="h-6 w-6 text-amber-500" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">Winter Poetry Champion</p>
                        <p className="text-sm text-gray-500">
                          First place in Winter 2024
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Award className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">Flash Fiction Runner-up</p>
                        <p className="text-sm text-gray-500">
                          Second place in Spring 2024
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3">
                <Tabs defaultValue="posts" className="w-full">
                  <TabsList className="w-full mb-4">
                    <TabsTrigger value="posts" className="flex-1">
                      Posts
                    </TabsTrigger>
                    <TabsTrigger value="challenges" className="flex-1">
                      Challenges
                    </TabsTrigger>
                    <TabsTrigger value="followers" className="flex-1">
                      Followers
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="posts" className="space-y-4">
                    <div className="bg-white rounded-xl shadow p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">Emma Richards</h4>
                            <span className="text-sm text-gray-500">
                              @poetryinmotion
                            </span>
                            <span className="text-xs text-gray-400">
                              3d ago
                            </span>
                          </div>
                          <p className="mt-2">
                            Here's my latest poem about urban solitude:
                          </p>
                          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                            <p className="italic">
                              Concrete towers reach for clouds,
                              <br />
                              A million souls, yet silence speaks.
                              <br />
                              Footsteps echo on empty streets,
                              <br />
                              The paradox of urban crowds.
                            </p>
                          </div>
                          <div className="mt-4 flex items-center gap-4">
                            <Button variant="ghost" size="sm">
                              Like (57)
                            </Button>
                            <Button variant="ghost" size="sm">
                              Comment (12)
                            </Button>
                            <Button variant="ghost" size="sm">
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">Emma Richards</h4>
                            <span className="text-sm text-gray-500">
                              @poetryinmotion
                            </span>
                            <span className="text-xs text-gray-400">
                              1w ago
                            </span>
                          </div>
                          <p className="mt-2">
                            Just started working on a new poetry collection
                            inspired by nocturnal imagery. The night has so many
                            stories to tell. Looking forward to sharing more
                            soon!
                          </p>
                          <div className="mt-4 flex items-center gap-4">
                            <Button variant="ghost" size="sm">
                              Like (34)
                            </Button>
                            <Button variant="ghost" size="sm">
                              Comment (5)
                            </Button>
                            <Button variant="ghost" size="sm">
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="challenges">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl shadow overflow-hidden">
                        <div className="h-24 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <h3 className="text-xl font-bold text-white">
                            Winter Poetry Challenge
                          </h3>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                              Jan 2024
                            </span>
                            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
                              Winner
                            </span>
                          </div>
                          <p className="mt-2 text-sm">
                            Emma's poem "Frost Whispers" won first place among
                            178 submissions.
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-3 w-full"
                          >
                            View Submission
                          </Button>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl shadow overflow-hidden">
                        <div className="h-24 bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
                          <h3 className="text-xl font-bold text-white">
                            Flash Fiction Contest
                          </h3>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                              Mar 2024
                            </span>
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                              Runner-up
                            </span>
                          </div>
                          <p className="mt-2 text-sm">
                            Emma's story "The Last Letter" received second place
                            among 94 submissions.
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-3 w-full"
                          >
                            View Submission
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="followers">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl shadow p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                            <div>
                              <h4 className="font-medium">Michael Torres</h4>
                              <p className="text-sm text-gray-500">
                                @wordsmith
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Following
                          </Button>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl shadow p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                            <div>
                              <h4 className="font-medium">Sophia Chen</h4>
                              <p className="text-sm text-gray-500">
                                @poeticsoul
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Following
                          </Button>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl shadow p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                            <div>
                              <h4 className="font-medium">James Wilson</h4>
                              <p className="text-sm text-gray-500">
                                @storyscribe
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Following
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
