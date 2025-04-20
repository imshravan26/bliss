"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const COLORS = [
  { name: "Purple to Pink", startColor: "purple-500", endColor: "pink-500" },
  { name: "Blue to Teal", startColor: "blue-500", endColor: "teal-500" },
  { name: "Amber to Orange", startColor: "amber-500", endColor: "orange-500" },
  { name: "Green to Blue", startColor: "green-500", endColor: "blue-500" },
  { name: "Red to Purple", startColor: "red-500", endColor: "purple-500" },
];

export default function CreateChallengePage() {
  const router = useRouter();
  const { userId, user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "poetry", // Default challenge type
    colorScheme: 0, // Index of the COLORS array
    startDate: new Date(),
    endDate: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (value) => {
    setFormData((prev) => ({ ...prev, colorScheme: parseInt(value) }));
  };

  const handleTypeChange = (value) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, endDate: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || formData.endDate === null) {
      alert("Please fill in all fields");
      return;
    }

    if (!userId) {
      alert("You must be logged in to create a challenge");
      return;
    }

    setIsSubmitting(true);

    const selectedColors = COLORS[formData.colorScheme];

    try {
      const response = await fetch("/api/challenges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          type: formData.type,
          startColor: selectedColors.startColor,
          endColor: selectedColors.endColor,
          startDate: formData.startDate,
          endDate: formData.endDate,
          creator: userId,
          creatorName: user?.fullName || "Anonymous",
          isActive: true,
          participants: [],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create challenge");
      }

      router.push("/challenges");
    } catch (error) {
      console.error("Error creating challenge:", error);
      alert("Failed to create challenge. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Create a New Challenge</h1>
              <p className="text-gray-600 mt-1">
                Set up a creative challenge for the community
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white p-6 rounded-xl shadow"
            >
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-1"
                >
                  Challenge Title
                </label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Spring Poetry Challenge"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-1"
                >
                  Challenge Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your challenge, including rules and guidelines..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium mb-1"
                >
                  Challenge Type
                </label>
                <Select value={formData.type} onValueChange={handleTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="poetry">Poetry</SelectItem>
                    <SelectItem value="story">Story</SelectItem>
                    <SelectItem value="comedy">Comedy</SelectItem>
                    <SelectItem value="monologue">Monologue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="colorScheme"
                  className="block text-sm font-medium mb-1"
                >
                  Banner Color Scheme
                </label>
                <Select
                  value={formData.colorScheme.toString()}
                  onValueChange={handleColorChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a color scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    {COLORS.map((color, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        {color.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  End Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.endDate ? (
                        format(formData.endDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.endDate}
                      onSelect={handleDateChange}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push("/challenges")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Challenge"}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
