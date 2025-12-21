"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loading } from "@/components/ui/loading";
import { BackButton } from "@/components/ui/back-button";
import { Calendar, Clock, MapPin, Users, Image as ImageIcon, Mail } from "lucide-react";
import { toast } from "sonner";
import { CLUBS } from "@/data/clubs";
import { DEPARTMENTS } from "@/data/departments";

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    clubOrDept: "",
    contactInfo: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/coordinator-signin");
      return;
    }

    if (status === "authenticated") {
      checkRole();
    }
  }, [status, router]);

  const checkRole = async () => {
    try {
      const response = await fetch("/api/auth/verify-role");
      const data = await response.json();

      if (data.role !== "COORDINATOR" && data.role !== "ADMIN") {
        toast.error("Access denied. Coordinator credentials required.");
        router.push("/auth/coordinator-signin");
      } else {
        setIsAuthorized(true);
      }
    } catch (error) {
      console.error("Error verifying role:", error);
      router.push("/auth/coordinator-signin");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/coordinator/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Event created successfully!");
        router.push("/coordinator");
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to create event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  const allClubsAndDepts = [
    ...CLUBS.map((c: any) => c.name),
    ...DEPARTMENTS.map((d: any) => d.name)
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BackButton />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 mt-6"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Calendar className="text-white w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Create New Event
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Fill in the details to create a campus event
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Annual Tech Fest 2025"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your event, activities, and what attendees can expect..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Event Date *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Event Time *
                    </Label>
                    <Input
                      id="time"
                      type="text"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      placeholder="e.g., 10:00 AM - 5:00 PM"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venue">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Venue *
                  </Label>
                  <Input
                    id="venue"
                    type="text"
                    required
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    placeholder="e.g., Main Auditorium, Building A"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clubOrDept">
                    <Users className="w-4 h-4 inline mr-2" />
                    Club or Department *
                  </Label>
                  <Select
                    value={formData.clubOrDept}
                    onValueChange={(value) => setFormData({ ...formData, clubOrDept: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select club or department" />
                    </SelectTrigger>
                    <SelectContent>
                      {allClubsAndDepts.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactInfo">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Contact Information
                  </Label>
                  <Input
                    id="contactInfo"
                    type="text"
                    value={formData.contactInfo}
                    onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                    placeholder="Email or phone number for inquiries"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">
                    <ImageIcon className="w-4 h-4 inline mr-2" />
                    Event Image URL
                  </Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://example.com/event-poster.jpg"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Optional: Add a poster or banner for your event
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    {isLoading ? (
                      <>
                        <Loading size="sm" />
                        Creating...
                      </>
                    ) : (
                      "Create Event"
                    )}
                  </Button>
                  <Link href="/coordinator" className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
