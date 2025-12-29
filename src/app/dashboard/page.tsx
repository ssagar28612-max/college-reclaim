"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Heart, Calendar, TrendingUp, Sparkles } from "lucide-react"
import { DashboardSkeleton } from "@/components/ui/enhanced-skeletons"
import { PageTransition } from "@/components/ui/page-transition"
import { HoverCard, FadeIn } from "@/components/ui/animated-card"

const statCards = [
  {
    title: "Lost Items",
    icon: Package,
    value: 0,
    description: "Items you've reported lost",
    color: "from-red-500 to-pink-500",
    iconColor: "text-red-600"
  },
  {
    title: "Found Items",
    icon: Package,
    value: 0,
    description: "Items you've reported found",
    color: "from-green-500 to-emerald-500",
    iconColor: "text-green-600"
  },
  {
    title: "Matches",
    icon: Heart,
    value: 0,
    description: "Potential matches found",
    color: "from-pink-500 to-rose-500",
    iconColor: "text-pink-600"
  },
  {
    title: "Events",
    icon: Calendar,
    value: 0,
    description: "Events you're attending",
    color: "from-purple-500 to-indigo-500",
    iconColor: "text-purple-600"
  }
]

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <DashboardSkeleton />
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
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <Navbar />
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Welcome Header */}
          <FadeIn delay={0.1}>
            <div className="mb-8">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-2 flex items-center gap-3"
              >
                <Sparkles className="h-8 w-8 text-violet-600" />
                Welcome, {session?.user?.name}!
              </motion.h1>
              <p className="text-gray-600 dark:text-gray-400">Here's an overview of your activity</p>
            </div>
          </FadeIn>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <HoverCard glowColor="violet">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {stat.title}
                    </CardTitle>
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                    </motion.div>
                  </CardHeader>
                  <CardContent>
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                      className="text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent"
                    >
                      {stat.value}
                    </motion.div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {stat.description}
                    </p>
                    
                    {/* Progress indicator */}
                    <div className="mt-3 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(stat.value * 10, 100)}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className={`h-full bg-gradient-to-r ${stat.color}`}
                      />
                    </div>
                  </CardContent>
                </HoverCard>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions Card */}
          <FadeIn delay={0.4}>
            <HoverCard>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <TrendingUp className="h-5 w-5 text-violet-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-lg border border-violet-200 dark:border-violet-800"
                >
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Your dashboard is ready! Start reporting lost or found items to see your activity statistics and matches here.
                  </p>
                </motion.div>
                
                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <motion.a
                    href="/report/lost"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="block"
                  >
                    <div className="p-4 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-lg border border-red-200 dark:border-red-800 hover:shadow-lg transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
                          <Package className="h-5 w-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">Report Lost Item</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Can't find something?</p>
                        </div>
                      </div>
                    </div>
                  </motion.a>

                  <motion.a
                    href="/report/found"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="block"
                  >
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800 hover:shadow-lg transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                          <Package className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">Report Found Item</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Found something?</p>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                </div>
              </CardContent>
            </HoverCard>
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  )
}
