# Quick Reference: UI Enhancement Guide

## 🚀 Quick Start

### Development Server
```bash
npm run dev
# Server runs on http://localhost:3000 (or 3001 if 3000 is in use)
```

### Build for Production
```bash
npm run build
npm start
```

## 📦 New Components Created

### 1. Auth-Protected Contact (`auth-protected-contact.tsx`)
**Purpose**: Hide contact information from unauthenticated users

**Usage**:
```tsx
import { AuthProtectedContact } from "@/components/ui/auth-protected-contact"

<AuthProtectedContact
  contactInfo={{
    email: "user@example.com",
    phone: "+1234567890"
  }}
  variant="card"        // "card" or "inline"
  showTitle={true}      // optional, default: true
  className="my-4"      // optional
/>
```

**Features**:
- Blurred contact info when logged out
- "Login to View Contact" CTA button
- Auto-reveals after login
- Two layout variants

---

### 2. Animated Cards (`animated-card.tsx`)

#### AnimatedCard
```tsx
import { AnimatedCard } from "@/components/ui/animated-card"

<AnimatedCard
  variant="glass"         // "default" | "glass" | "gradient" | "minimal"
  hoverScale={1.02}       // scale on hover
  delay={0.1}             // entry delay
>
  <CardContent>...</CardContent>
</AnimatedCard>
```

#### HoverCard
```tsx
import { HoverCard } from "@/components/ui/animated-card"

<HoverCard glowColor="violet">  {/* violet | blue | green | pink | orange */}
  <CardContent>...</CardContent>
</HoverCard>
```

#### GlassCard
```tsx
import { GlassCard } from "@/components/ui/animated-card"

<GlassCard blur="md">  {/* sm | md | lg */}
  <CardContent>...</CardContent>
</GlassCard>
```

#### FadeIn
```tsx
import { FadeIn } from "@/components/ui/animated-card"

<FadeIn direction="up" delay={0.2}>  {/* up | down | left | right */}
  <YourContent />
</FadeIn>
```

---

### 3. Enhanced Skeletons (`enhanced-skeletons.tsx`)

#### Grid Loader
```tsx
import { GridSkeletonLoader } from "@/components/ui/enhanced-skeletons"

{loading ? (
  <GridSkeletonLoader count={8} type="book" />  {/* "item" | "book" */}
) : (
  <ItemGrid />
)}
```

#### Dashboard Skeleton
```tsx
import { DashboardSkeleton } from "@/components/ui/enhanced-skeletons"

{loading ? <DashboardSkeleton /> : <DashboardContent />}
```

#### Profile Skeleton
```tsx
import { ProfileSkeleton } from "@/components/ui/enhanced-skeletons"

{loading ? <ProfileSkeleton /> : <ProfileContent />}
```

---

### 4. Page Transition (`page-transition.tsx`)
```tsx
import { PageTransition } from "@/components/ui/page-transition"

export default function MyPage() {
  return (
    <PageTransition>
      <div>Your page content</div>
    </PageTransition>
  )
}
```

---

### 5. Tooltip (`tooltip.tsx`)
```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <InfoIcon />
    </TooltipTrigger>
    <TooltipContent>
      <p>Helpful information here</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

## 🎨 Common Patterns

### Protected Contact in Card
```tsx
<Card>
  <CardHeader>
    <CardTitle>{item.title}</CardTitle>
  </CardHeader>
  <CardContent>
    <p>{item.description}</p>
    
    {/* Contact section */}
    <div className="border-t pt-3 mt-3">
      <AuthProtectedContact
        contactInfo={{
          email: item.owner.email,
          phone: item.contactPhone
        }}
        variant="inline"
      />
    </div>
  </CardContent>
</Card>
```

### Animated Grid of Items
```tsx
<motion.div
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  {items.map((item, index) => (
    <HoverCard key={item.id} glowColor="blue">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        {/* Item content */}
      </motion.div>
    </HoverCard>
  ))}
</motion.div>
```

### Loading State
```tsx
const [loading, setLoading] = useState(true)

if (loading) {
  return (
    <div className="container">
      <GridSkeletonLoader count={6} type="item" />
    </div>
  )
}

return <ItemGrid items={items} />
```

---

## 🎯 Design Tokens

### Colors
```tsx
// Primary
className="bg-violet-600 text-white"
className="bg-gradient-to-r from-violet-600 to-indigo-600"

// Success
className="bg-green-500 text-white"

// Error
className="bg-red-500 text-white"

// Glass
className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md"
```

### Animations
```tsx
// Hover scale
whileHover={{ scale: 1.02 }}

// Tap feedback
whileTap={{ scale: 0.98 }}

// Entry
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
```

### Shadows
```tsx
className="shadow-lg hover:shadow-2xl transition-shadow duration-300"
```

---

## 🔐 Auth Flow Examples

### Check Auth Before Showing Contact
```tsx
import { useSession } from "next-auth/react"

const { data: session } = useSession()

// Method 1: Use AuthProtectedContact component (recommended)
<AuthProtectedContact contactInfo={{ email, phone }} />

// Method 2: Manual check
{session ? (
  <div>
    <a href={`mailto:${email}`}>{email}</a>
  </div>
) : (
  <div className="blur-sm">
    <span>user@example.com</span>
  </div>
)}
```

---

## 📱 Responsive Patterns

### Mobile-First Grid
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {items.map(item => <ItemCard key={item.id} {...item} />)}
</div>
```

### Conditional Layout
```tsx
<div className="flex flex-col lg:flex-row gap-4">
  <aside className="lg:w-64">...</aside>
  <main className="flex-1">...</main>
</div>
```

---

## 🎨 Custom Animations

### Stagger Children
```tsx
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

<motion.div variants={container} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={item}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Rotate on Hover
```tsx
<motion.div
  whileHover={{ rotate: 360 }}
  transition={{ duration: 0.5 }}
>
  <Icon />
</motion.div>
```

---

## 🐛 Troubleshooting

### Animation Not Working
1. Check Framer Motion is imported
2. Verify motion.div wrapper
3. Check initial/animate props

### Contact Not Hiding
1. Verify useSession() is called
2. Check AuthProtectedContact component import
3. Ensure session provider wraps app

### Skeleton Showing Too Long
1. Check loading state logic
2. Verify API calls complete
3. Check network requests

### Dark Mode Issues
1. Ensure `dark:` prefix on Tailwind classes
2. Check theme provider is present
3. Verify colors defined for both modes

---

## 📚 Resources

### Documentation
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)

### Examples
See enhanced pages:
- `/books` - Auth-protected contacts, animated cards
- `/search` - Enhanced filters, staggered animations
- `/dashboard` - Stat cards with progress bars
- `/profile` - Hover effects, tooltips

---

## 🎯 Best Practices

1. **Always wrap pages with PageTransition**
2. **Use AuthProtectedContact for all user contacts**
3. **Add skeleton loaders for loading states**
4. **Use HoverCard for interactive elements**
5. **Add tooltips for help text**
6. **Ensure responsive design (mobile-first)**
7. **Test dark mode for all components**
8. **Keep animations smooth (avoid jank)**
9. **Use semantic HTML**
10. **Add ARIA labels for accessibility**

---

## 🚀 Performance Tips

1. Use `useMemo` for expensive computations
2. Debounce search inputs (300ms)
3. Lazy load images
4. Use CSS transforms for animations
5. Minimize re-renders with React.memo
6. Keep bundle size small
7. Use Next.js Image component
8. Implement virtual scrolling for long lists

---

**Last Updated**: December 29, 2025
**Version**: 2.0
