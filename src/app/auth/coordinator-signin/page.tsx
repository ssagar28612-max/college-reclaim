"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loading } from "@/components/ui/loading"
import { Eye, EyeOff, ArrowLeft, Mail, Lock, Shield, Users } from "lucide-react"
import { toast } from "sonner"

export default function CoordinatorSignIn() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("Invalid coordinator credentials. Please check your email and password.")
      } else {
        // Verify coordinator role
        const response = await fetch("/api/auth/verify-role")
        const data = await response.json()
        
        if (data.role !== "COORDINATOR" && data.role !== "ADMIN") {
          toast.error("Access denied. Coordinator credentials required.")
          await signIn("credentials", { redirect: false }) // Sign out
        } else {
          toast.success("Welcome, Coordinator! Redirecting to dashboard...", {
            duration: 2000,
          })
          router.push("/coordinator")
        }
      }
      
    } catch (error) {
      console.error("Error during sign in:", error)
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/auth/signin" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors duration-200">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Student Login
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl border-2 border-blue-200 dark:border-blue-900/50 transition-colors duration-300">
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <Users className="text-white w-8 h-8" />
              </motion.div>
              <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Coordinator Access
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300 mt-2 transition-colors duration-300">
                Sign in to manage events and activities
              </p>
            </CardHeader>
            
            <CardContent>
              <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-xs text-blue-800 dark:text-blue-200 text-center">
                  🎯 Club & Department Coordinators Only
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    Coordinator Email
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="coordinator@university.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="pl-10 h-11 border-blue-200 dark:border-blue-800 focus:border-blue-500"
                      required
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="pl-10 pr-10 h-11 border-blue-200 dark:border-blue-800 focus:border-blue-500"
                      required
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-11 font-semibold shadow-lg" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loading size="sm" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Sign In as Coordinator
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-indigo-50/80 dark:bg-indigo-900/20 backdrop-blur-sm border border-indigo-200/50 dark:border-indigo-700/50 transition-colors duration-300">
            <CardContent className="p-4">
              <div className="text-center text-sm text-indigo-800 dark:text-indigo-200 transition-colors duration-300">
                <p className="font-medium">Need Coordinator Access?</p>
                <p className="text-xs mt-1 mb-3">
                  Submit a request to become a coordinator
                </p>
                <Link href="/auth/coordinator-request">
                  <Button variant="outline" size="sm" className="w-full">
                    Request Coordinator Access
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
