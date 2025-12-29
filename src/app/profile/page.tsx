"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Shield, Edit2, Check, X, Sparkles, Info } from "lucide-react"
import { toast } from "sonner"
import { ProfileSkeleton } from "@/components/ui/enhanced-skeletons"
import { PageTransition } from "@/components/ui/page-transition"
import { HoverCard, FadeIn } from "@/components/ui/animated-card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ProfilePage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
  })

  // Update form data when session loads
  useState(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
      })
    }
  })

  const handleSave = async () => {
    // Validate inputs
    if (!formData.name.trim()) {
      toast.error("Name cannot be empty")
      return
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      toast.error("Please enter a valid email address")
      return
    }

    setIsSaving(true)
    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to update profile")
      }

      const data = await response.json()
      
      // Update the session with new data
      await update({
        ...session,
        user: {
          ...session?.user,
          name: data.user.name,
          email: data.user.email,
        },
      })

      toast.success("Profile updated successfully!")
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error(error instanceof Error ? error.message : "Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: session?.user?.name || "",
      email: session?.user?.email || "",
    })
    setIsEditing(false)
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <ProfileSkeleton />
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    router.push("/auth/signin")
    return null
  }

  return (
    <PageTransition>
      <TooltipProvider>
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <Navbar />
          
          <div className="container mx-auto px-4 py-8 max-w-3xl relative z-10">
            {/* Header */}
            <FadeIn delay={0.1}>
              <div className="flex items-center justify-between mb-6">
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-3"
                >
                  <Sparkles className="h-8 w-8 text-violet-600" />
                  Profile
                </motion.h1>
                {!isEditing && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      size="sm"
                      className="border-violet-200 text-violet-700 hover:bg-violet-50 dark:border-violet-800 dark:text-violet-400 shadow-md"
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </motion.div>
                )}
              </div>
            </FadeIn>

            {/* Profile Card */}
            <FadeIn delay={0.2}>
              <HoverCard glowColor="violet">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.3 }}
                    >
                      <Avatar className="h-20 w-20 ring-4 ring-violet-200 dark:ring-violet-800">
                        <AvatarImage src={session?.user?.image || ""} alt="User" />
                        <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-500 text-white text-2xl">
                          {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <div>
                      <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">
                        {session?.user?.name || "User"}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                          {session?.user?.role || "USER"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isEditing ? (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Enter your name"
                          className="dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-violet-500"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center gap-2">
                          <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                            Email
                          </Label>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Changing email requires verification</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Enter your email"
                          className="dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-violet-500"
                        />
                      </motion.div>

                      <motion.div 
                        className="flex gap-3 pt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                          <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg"
                          >
                            {isSaving ? (
                              "Saving..."
                            ) : (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                Save Changes
                              </>
                            )}
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                          <Button
                            onClick={handleCancel}
                            disabled={isSaving}
                            variant="outline"
                            className="w-full"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </motion.div>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div 
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                          <p className="font-medium dark:text-gray-200">{session?.user?.email}</p>
                        </div>
                      </motion.div>

                      <motion.div 
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                          <p className="font-medium dark:text-gray-200">{session?.user?.name || "Not set"}</p>
                        </div>
                      </motion.div>

                      <motion.div 
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
                          <p className="font-medium dark:text-gray-200">{session?.user?.role || "USER"}</p>
                        </div>
                      </motion.div>
                    </>
                  )}
                </CardContent>
              </HoverCard>
            </FadeIn>

            {/* About Card */}
            {!isEditing && (
              <FadeIn delay={0.4}>
                <HoverCard glowColor="blue" className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <Info className="h-5 w-5 text-blue-600" />
                      About
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Manage your profile settings and personal information. Keep your details up to date for better communication within the college community.
                    </p>
                  </CardContent>
                </HoverCard>
              </FadeIn>
            )}
          </div>
        </div>
      </TooltipProvider>
    </PageTransition>
  )
}
