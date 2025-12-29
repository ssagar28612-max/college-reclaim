"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface AnimatedCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode
  className?: string
  hoverScale?: number
  delay?: number
  variant?: "default" | "glass" | "gradient" | "minimal"
}

export function AnimatedCard({
  children,
  className,
  hoverScale = 1.02,
  delay = 0,
  variant = "default",
  ...props
}: AnimatedCardProps) {
  const variantStyles = {
    default: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg",
    glass: "bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/20 dark:border-gray-700/50 shadow-xl",
    gradient: "bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl",
    minimal: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: hoverScale,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface HoverCardProps {
  children: ReactNode
  className?: string
  glowColor?: "violet" | "blue" | "green" | "pink" | "orange"
}

export function HoverCard({ children, className, glowColor = "violet" }: HoverCardProps) {
  const glowColors = {
    violet: "group-hover:shadow-violet-500/50",
    blue: "group-hover:shadow-blue-500/50",
    green: "group-hover:shadow-green-500/50",
    pink: "group-hover:shadow-pink-500/50",
    orange: "group-hover:shadow-orange-500/50"
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative rounded-xl overflow-hidden",
        "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
        "shadow-lg hover:shadow-2xl transition-all duration-300",
        glowColors[glowColor],
        className
      )}
    >
      {/* Animated gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-pink-500/10 to-blue-500/10"></div>
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

interface GlassCardProps {
  children: ReactNode
  className?: string
  blur?: "sm" | "md" | "lg"
}

export function GlassCard({ children, className, blur = "md" }: GlassCardProps) {
  const blurStrength = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg"
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-xl overflow-hidden",
        "bg-white/70 dark:bg-gray-800/70",
        blurStrength[blur],
        "border border-white/20 dark:border-gray-700/50",
        "shadow-xl hover:shadow-2xl transition-all duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

interface FloatingCardProps {
  children: ReactNode
  className?: string
}

export function FloatingCard({ children, className }: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      className={cn(
        "rounded-xl overflow-hidden",
        "bg-white dark:bg-gray-800",
        "border border-gray-200 dark:border-gray-700",
        "shadow-lg hover:shadow-2xl transition-all duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerContainer({ children, className, staggerDelay = 0.1 }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}

export function FadeIn({ children, className, delay = 0, direction = "up" }: FadeInProps) {
  const directions = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { x: 20, y: 0 },
    right: { x: -20, y: 0 }
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
}

export const hoverVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  }
}

export const staggerChildVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}
