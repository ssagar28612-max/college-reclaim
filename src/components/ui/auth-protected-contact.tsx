"use client"

import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Mail, Phone, Lock, LogIn } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface ContactInfo {
  email?: string | null
  phone?: string | null
}

interface AuthProtectedContactProps {
  contactInfo: ContactInfo
  className?: string
  showTitle?: boolean
  variant?: "card" | "inline"
}

export function AuthProtectedContact({
  contactInfo,
  className,
  showTitle = true,
  variant = "card"
}: AuthProtectedContactProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const isAuthenticated = status === "authenticated"
  const isLoading = status === "loading"

  const handleLoginClick = () => {
    router.push("/auth/signin")
  }

  if (isLoading) {
    return (
      <div className={cn("space-y-2", className)}>
        {showTitle && (
          <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
            Contact Information
          </h4>
        )}
        <div className="animate-pulse space-y-2">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  // Not authenticated - show locked state with CTA
  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "relative overflow-hidden rounded-lg border",
          variant === "card" 
            ? "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700 p-4" 
            : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-3",
          className
        )}
      >
        {/* Locked overlay effect */}
        <div className="absolute inset-0 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30"></div>
        
        <div className="relative z-10 space-y-3">
          {showTitle && (
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide flex items-center gap-2">
                <Lock className="h-3 w-3" />
                Contact Information
              </h4>
            </div>
          )}
          
          {/* Blurred placeholder */}
          <div className="space-y-2 filter blur-sm select-none pointer-events-none">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="text-gray-500 dark:text-gray-400">user@example.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-gray-400" />
              <span className="text-gray-500 dark:text-gray-400">+91 98765 43210</span>
            </div>
          </div>

          {/* Login CTA */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="pt-2"
          >
            <Button
              onClick={handleLoginClick}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              size="sm"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login to View Contact
            </Button>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
              Sign in to see contact details
            </p>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  // Authenticated - show actual contact info
  const hasContact = contactInfo.email || contactInfo.phone

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("space-y-3", className)}
    >
      {showTitle && (
        <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
          Contact Information
        </h4>
      )}

      {hasContact ? (
        <div className="space-y-2">
          {contactInfo.email && (
            <motion.a
              href={`mailto:${contactInfo.email}`}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors p-2 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/20 group"
            >
              <Mail className="h-4 w-4 group-hover:animate-pulse" />
              <span className="truncate font-medium">{contactInfo.email}</span>
            </motion.a>
          )}
          
          {contactInfo.phone && (
            <motion.a
              href={`tel:${contactInfo.phone}`}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 group"
            >
              <Phone className="h-4 w-4 group-hover:animate-pulse" />
              <span className="font-medium">{contactInfo.phone}</span>
            </motion.a>
          )}
        </div>
      ) : (
        <p className="text-xs text-gray-500 dark:text-gray-400 italic p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          No contact information provided
        </p>
      )}
    </motion.div>
  )
}
