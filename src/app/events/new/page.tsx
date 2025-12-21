"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CalendarDays, Users, MapPin, Clock } from "lucide-react"
import { toast } from "sonner"
import { CLUBS } from "@/data/clubs"
import { DEPARTMENTS } from "@/data/departments"

const EVENT_CATEGORIES = [
  { value: 'TECHNICAL', label: '💻 Technical' },
  { value: 'CULTURAL', label: '🎭 Cultural' },
  { value: 'SPORTS', label: '⚽ Sports' },
  { value: 'ACADEMIC', label: '📚 Academic' },
  { value: 'SOCIAL', label: '👥 Social' },
  { value: 'WORKSHOP', label: '🔧 Workshop' },
  { value: 'SEMINAR', label: '🎤 Seminar' },
  { value: 'OTHER', label: '📌 Other' }
]

export default function NewEventPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    clubOrDept: "",
    contactInfo: ""
  })

  // Redirect if not authenticated
  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
    </div>
  }

  if (status === "unauthenticated") {
    router.push("/auth/signin")
    return null
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate form
      if (!formData.title || !formData.description || 
          !formData.date || !formData.time || !formData.venue || !formData.clubOrDept) {
        toast.error("Please fill in all required fields")
        setLoading(false)
        return
      }

      // Validate date is not in the past
      const eventDateTime = new Date(`${formData.date}T${formData.time}`)
      if (eventDateTime <= new Date()) {
        toast.error("Event date and time must be in the future")
        setLoading(false)
        return
      }

      const eventData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        date: formData.date,
        time: formData.time,
        venue: formData.venue.trim(),
        clubOrDept: formData.clubOrDept,
        contactInfo: formData.contactInfo.trim() || undefined
      }

      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create event')
      }

      const newEvent = await response.json()
      
      toast.success("Event created successfully!", {
        description: `Your event "${newEvent.title}" has been published.`
      })

      router.push(`/events/${newEvent.id}`)

    } catch (error) {
      console.error('Error creating event:', error)
      toast.error(error instanceof Error ? error.message : "Failed to create event")
    } finally {
      setLoading(false)
    }
  }

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/events" className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl">
              <CalendarDays className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Create Event
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Organize and share exciting events with your college community.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-xl border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Event Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Annual Tech Fest 2024"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your event, what participants can expect, and any special highlights..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                  />
                </div>

                {/* Category and Max Participants Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                </div>

                {/* Date and Time Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      min={today}
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time *</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="time"
                        type="time"
                        className="pl-10"
                        value={formData.time}
                        onChange={(e) => handleInputChange('time', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Venue */}
                <div className="space-y-2">
                  <Label htmlFor="venue">Venue *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="venue"
                      placeholder="e.g., Main Auditorium, JSSSTU Campus"
                      className="pl-10"
                      value={formData.venue}
                      onChange={(e) => handleInputChange('venue', e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Club/Department */}
                <div className="space-y-2">
                  <Label htmlFor="clubOrDept">Organizing Club / Department *</Label>
                  <Select value={formData.clubOrDept} onValueChange={(value) => handleInputChange('clubOrDept', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select club or department" />
                    </SelectTrigger>
                    <SelectContent>
                      {CLUBS.map((club: string, index: number) => (
                        <SelectItem key={`club-${club}-${index}`} value={club}>
                          {club}
                        </SelectItem>
                      ))}
                      {DEPARTMENTS.map((dept: string, index: number) => (
                        <SelectItem key={`dept-${dept}-${index}`} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  <Label htmlFor="contactInfo">Contact Information</Label>
                  <Input
                    id="contactInfo"
                    placeholder="e.g., contact@example.com or +91 1234567890"
                    value={formData.contactInfo}
                    onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating...
                      </div>
                    ) : (
                      "Create Event"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-6">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">
                💡 Tips for organizing successful events:
              </h3>
              <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                <li>• Choose a clear, attractive title that explains what your event is about</li>
                <li>• Provide detailed descriptions to help students understand the value</li>
                <li>• Pick realistic dates and allow enough time for planning and promotion</li>
                <li>• Consider the venue capacity when setting maximum participants</li>
                <li>• Partner with relevant clubs or departments for better reach</li>
                <li>• Respond to interested participants promptly</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}