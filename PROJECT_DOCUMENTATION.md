# College Reclaim - Complete Project Documentation

**Version:** 1.0.0  
**Last Updated:** December 22, 2025  
**Developer:** Surya S Koundinya

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Project Structure](#project-structure)
5. [Database Schema](#database-schema)
6. [API Routes](#api-routes)
7. [Authentication & Authorization](#authentication--authorization)
8. [UI Components](#ui-components)
9. [Environment Variables](#environment-variables)
10. [Deployment](#deployment)
11. [Third-Party Integrations](#third-party-integrations)

---

## 🎯 Project Overview

**College Reclaim** is a comprehensive web application designed for college communities to manage lost and found items, facilitate a books marketplace, organize campus events, and build trust through technology.

### Purpose
- Help students recover lost items
- Enable students to report found items
- Create a marketplace for buying/selling used books
- Organize and promote campus events
- Build a trustworthy college community

### Target Audience
- College students
- College administrators
- Campus coordinators
- Faculty members

---

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 15.5.9**
  - App Router (latest routing system)
  - Server Components
  - Client Components
  - API Routes
  - Image Optimization
  - Automatic Code Splitting

### UI & Styling
- **React 19.0.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **shadcn/ui** - Reusable component library
  - Radix UI primitives
  - Fully accessible components
  - Customizable with Tailwind

### State Management & Data Fetching
- **React Query (@tanstack/react-query)** - Server state management
- **React Hooks** - Local state management
- **Next.js Server Actions** - Server-side mutations

### Animations & Interactions
- **Framer Motion 11.15.0** - Animation library
  - Page transitions
  - Hover effects
  - Scroll animations
  - Gesture interactions

### Icons & Assets
- **Lucide React 0.469.0** - Modern icon library
  - 1000+ icons
  - Tree-shakeable
  - Fully customizable

### Backend & Database
- **PostgreSQL** - Relational database
- **Prisma 6.2.1** - ORM (Object-Relational Mapping)
  - Type-safe database client
  - Automatic migrations
  - Database introspection
  - Prisma Studio (database GUI)

### Authentication
- **NextAuth.js 4.24.11** - Authentication solution
  - Google OAuth
  - Email/Password (Credentials)
  - Session management
  - JWT tokens
  - Role-based access control

### Email Services
- **Nodemailer 6.9.16** - Email sending
- **Gmail SMTP** - Email provider
- **OTP Verification** - Two-factor authentication

### File Upload & Storage
- **Multer** - File upload middleware
- **Local File System** - File storage (public/uploads/)
- **Image Optimization** - Next.js Image component

### Form Handling & Validation
- **React Hook Form 7.54.2** - Form management
- **Zod 3.24.1** - Schema validation
- **@hookform/resolvers** - Form validation resolver

### UI Utilities
- **class-variance-authority (CVA)** - Component variants
- **clsx** - Conditional className utility
- **tailwind-merge** - Merge Tailwind classes
- **tailwindcss-animate** - Tailwind animations

### Notifications
- **Sonner** - Toast notifications
  - Beautiful toast messages
  - Customizable themes
  - Promise-based toasts

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript** - Type checking
- **VS Code** - IDE

### Deployment & Hosting
- **Vercel** - Frontend hosting
  - Automatic deployments
  - Preview deployments
  - Edge functions
  - Analytics

### Version Control
- **Git** - Version control
- **GitHub** - Code repository
  - Automatic CI/CD with Vercel

---

## ✨ Features

### 1. Lost & Found System
- **Report Lost Items**
  - Title, description, category
  - Location tracking
  - Date lost
  - Image upload (multiple images)
  - Authentication required
  
- **Report Found Items**
  - Similar form to lost items
  - Found location
  - Date found
  - Image upload
  - Authentication required

- **Smart Matching Algorithm**
  - Automatic matching of lost/found items
  - Based on category, description, location
  - Email notifications for matches

- **Search & Filter**
  - Search by keyword
  - Filter by category
  - Filter by status (ACTIVE/CLAIMED/RESOLVED)
  - Filter by type (lost/found)
  - Sort by date

### 2. Books Marketplace
- **List Books for Sale/Rent**
  - Book title and author
  - Condition (NEW, LIKE_NEW, GOOD, FAIR, POOR)
  - Price or rent option
  - Description
  - Image upload
  - Contact information

- **Browse Books**
  - Grid/List view
  - Search functionality
  - Filter by condition
  - Filter by type (sale/rent)
  - Sort by price/date

- **Book Details**
  - Full book information
  - Seller contact details
  - Book condition
  - Price information

### 3. Campus Events
- **Create Events**
  - Event title and description
  - Date and time
  - Venue/location
  - Club or department
  - Category (TECHNICAL, CULTURAL, SPORTS, etc.)
  - Contact information
  - Authentication required

- **Browse Events**
  - Upcoming events
  - Past events
  - Filter by category
  - Filter by club/department
  - Calendar view
  - Event details page

- **Event Management**
  - Edit events (creator only)
  - Delete events (creator/admin)
  - RSVP functionality (coming soon)

### 4. User Authentication & Authorization
- **Sign Up**
  - Email/password registration
  - OTP verification
  - Google OAuth
  - Name and email required

- **Sign In**
  - Email/password login
  - Google OAuth
  - Remember me functionality
  - Session management

- **Password Reset**
  - Forgot password flow
  - OTP-based reset
  - Secure password update

- **Role-Based Access**
  - USER - Regular students
  - ADMIN - System administrators
  - COORDINATOR - Event coordinators

### 5. User Dashboard
- **Personal Dashboard**
  - Lost items count
  - Found items count
  - Potential matches
  - Events attending
  - Quick actions

- **Profile Management**
  - View profile information
  - Update details (coming soon)
  - Avatar display
  - Role information

- **Notifications**
  - Match notifications
  - Event reminders
  - System updates
  - Mark as read functionality

### 6. Admin Panel
- **User Management**
  - View all users
  - Assign roles
  - Block/unblock users
  - User statistics

- **Content Moderation**
  - Review reported items
  - Approve/reject items
  - Delete inappropriate content
  - Flag system

- **Lost Items Management**
  - View all lost items
  - Edit/delete items
  - Mark as claimed/resolved
  - Search and filter

- **Found Items Management**
  - View all found items
  - Edit/delete items
  - Mark as claimed/resolved
  - Search and filter

- **Books Management**
  - View all books
  - Edit/delete listings
  - Moderate content

- **Events Management**
  - View all events
  - Edit/delete events
  - Approve coordinator requests

- **Notifications System**
  - Send notifications to users
  - Bulk notifications
  - Match notifications

- **Coordinator Requests**
  - Review coordinator applications
  - Approve/reject requests
  - Role assignment

### 7. Coordinator Features
- **Event Creation**
  - Create official events
  - Edit own events
  - Event analytics (coming soon)

- **Request System**
  - Apply for coordinator role
  - Provide club/department info
  - Pending/approved status

### 8. UI/UX Features
- **Dark Mode**
  - System theme detection
  - Manual toggle
  - Persistent preference
  - Smooth transitions

- **Responsive Design**
  - Mobile-first approach
  - Tablet optimization
  - Desktop layouts
  - Adaptive components

- **Animations**
  - Page transitions
  - Hover effects
  - Loading states
  - Smooth scrolling

- **Accessibility**
  - ARIA labels
  - Keyboard navigation
  - Screen reader support
  - Focus management

### 9. Search & Discovery
- **Global Search**
  - Search across lost/found items
  - Real-time filtering
  - Category filters
  - Status filters

- **Books Search**
  - Search by title/author
  - Filter by condition
  - Price range filter
  - Sort options

- **Events Discovery**
  - Browse upcoming events
  - Filter by category
  - Search by keyword
  - Calendar integration

### 10. Support & Documentation
- **Help Center**
  - FAQ section
  - Contact support
  - User guides

- **Privacy Policy**
  - Data collection info
  - User rights
  - Cookie policy

- **Terms of Service**
  - Usage guidelines
  - User responsibilities
  - Disclaimers

### 11. Payment Integration (New Feature)
- **Buy Me a Coffee (UPI)**
  - UPI payment integration
  - Direct payment to surya1@fam
  - QR code for desktop
  - Mobile app redirect
  - Amount: ₹50 per coffee
  - Secure transactions

---

## 📁 Project Structure

```
college_reclaim_prod/
├── .next/                          # Next.js build output
├── node_modules/                   # Dependencies
├── prisma/                         # Database schema and migrations
│   ├── schema.prisma              # Prisma schema file
│   └── migrations/                # Database migrations
├── public/                         # Static assets
│   ├── logo.webp                  # App logo
│   └── uploads/                   # User uploaded files
├── scripts/                        # Utility scripts
│   └── set-admin.js               # Admin role assignment
├── src/                           # Source code
│   ├── app/                       # Next.js App Router
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   ├── loading.tsx           # Loading state
│   │   ├── page.tsx              # Home page
│   │   ├── admin/                # Admin panel pages
│   │   │   └── page.tsx          # Admin dashboard
│   │   ├── api/                  # API routes
│   │   │   ├── admin/            # Admin APIs
│   │   │   │   ├── books/
│   │   │   │   ├── events/
│   │   │   │   ├── found-items/
│   │   │   │   ├── lost-items/
│   │   │   │   ├── notify/
│   │   │   │   └── users/
│   │   │   ├── auth/             # Authentication APIs
│   │   │   │   ├── [...nextauth]/
│   │   │   │   ├── send-otp/
│   │   │   │   ├── signup/
│   │   │   │   ├── verify-otp/
│   │   │   │   └── verify-role/
│   │   │   ├── books/            # Books APIs
│   │   │   ├── contact/          # Contact form
│   │   │   ├── coordinator/      # Coordinator APIs
│   │   │   ├── coordinator-requests/
│   │   │   ├── events/           # Events APIs
│   │   │   ├── found-items/      # Found items APIs
│   │   │   ├── lost-items/       # Lost items APIs
│   │   │   ├── matches/          # Matching algorithm
│   │   │   ├── notifications/    # Notifications API
│   │   │   └── upload/           # File upload
│   │   ├── auth/                 # Auth pages
│   │   │   ├── admin-signin/
│   │   │   ├── coordinator-request/
│   │   │   ├── coordinator-signin/
│   │   │   ├── forgot-password/
│   │   │   ├── signin/
│   │   │   └── signup/
│   │   ├── books/                # Books pages
│   │   │   ├── page.tsx          # Books list
│   │   │   ├── [id]/             # Book details
│   │   │   └── new/              # Create book
│   │   ├── coordinator/          # Coordinator pages
│   │   │   └── create-event/
│   │   ├── dashboard/            # User dashboard
│   │   │   └── page.tsx
│   │   ├── events/               # Events pages
│   │   │   ├── page.tsx          # Events list
│   │   │   ├── [id]/             # Event details
│   │   │   └── new/              # Create event
│   │   ├── notifications/        # Notifications page
│   │   │   └── page.tsx
│   │   ├── privacy/              # Privacy policy
│   │   ├── profile/              # User profile
│   │   │   └── page.tsx
│   │   ├── report/               # Report pages
│   │   │   ├── found/            # Report found item
│   │   │   └── lost/             # Report lost item
│   │   ├── search/               # Search page
│   │   ├── support/              # Support page
│   │   └── terms/                # Terms of service
│   ├── components/               # React components
│   │   ├── coffee-modal.tsx      # UPI payment modal
│   │   ├── footer.tsx            # Footer component
│   │   ├── navbar.tsx            # Navigation bar
│   │   ├── providers.tsx         # Context providers
│   │   ├── loading/              # Loading states
│   │   │   └── book-skeletons.tsx
│   │   └── ui/                   # UI components (shadcn)
│   │       ├── avatar.tsx
│   │       ├── back-button.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── loading.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── select.tsx
│   │       ├── skeleton.tsx
│   │       ├── sonner.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       └── textarea.tsx
│   ├── data/                     # Static data
│   │   ├── clubs.ts              # College clubs list
│   │   ├── departments.ts        # Academic departments
│   │   ├── locations.ts          # Campus locations
│   │   └── mockData.ts           # Mock data for testing
│   ├── lib/                      # Utility libraries
│   │   ├── auth.ts               # Auth configuration
│   │   ├── email.ts              # Email utilities
│   │   ├── prisma.ts             # Prisma client
│   │   └── utils.ts              # Helper functions
│   └── types/                    # TypeScript types
│       └── next-auth.d.ts        # NextAuth type extensions
├── .env.local                     # Environment variables (local)
├── .env                          # Environment variables (shared)
├── .eslintrc.json                # ESLint configuration
├── .gitignore                    # Git ignore file
├── components.json               # shadcn/ui config
├── next.config.ts                # Next.js configuration
├── next-env.d.ts                 # Next.js types
├── package.json                  # Dependencies
├── postcss.config.mjs            # PostCSS config
├── tailwind.config.ts            # Tailwind config
├── tsconfig.json                 # TypeScript config
├── vercel.json                   # Vercel deployment config
├── README.md                     # Project README
├── COMMAND_REFERENCE.md          # Git & deployment commands
├── BUY_ME_COFFEE_FEATURE.md     # Coffee feature docs
├── EMAIL_NOTIFICATION_GUIDE.md   # Email setup guide
├── EMAIL_SETUP.md                # Email configuration
├── FIX_EMAIL_CREDENTIALS.md      # Email troubleshooting
├── PASSWORD_RESET_DOCS.md        # Password reset guide
├── ROLE_BASED_AUTH_SETUP.md      # Auth setup guide
└── SETUP_PASSWORD_RESET.md       # Password reset setup
```

---

## 🗄️ Database Schema

### Models (Prisma)

#### User
```prisma
model User {
  id                String              @id @default(uuid())
  name              String?
  email             String              @unique
  emailVerified     DateTime?
  password          String?
  image             String?
  role              Role                @default(USER)
  resetToken        String?             @unique
  resetTokenExpiry  DateTime?
  accounts          Account[]
  sessions          Session[]
  lostItems         LostItem[]
  foundItems        FoundItem[]
  books             Book[]
  events            Event[]
  notifications     Notification[]
  coordinatorRequest CoordinatorRequest?
  createdAt         DateTime            @default(now())
  updatedAt         DateTime            @updatedAt
}
```

#### Role Enum
```prisma
enum Role {
  USER
  ADMIN
  COORDINATOR
}
```

#### LostItem
```prisma
model LostItem {
  id           String   @id @default(uuid())
  title        String
  description  String
  category     Category
  location     String
  dateLost     DateTime
  images       String[] // Array of image paths
  status       Status   @default(ACTIVE)
  userId       String
  user         User     @relation(fields: [userId], references: [id])
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

#### FoundItem
```prisma
model FoundItem {
  id           String   @id @default(uuid())
  title        String
  description  String
  category     Category
  location     String
  dateFound    DateTime
  images       String[]
  status       Status   @default(ACTIVE)
  userId       String
  user         User     @relation(fields: [userId], references: [id])
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

#### Category Enum
```prisma
enum Category {
  ELECTRONICS
  BOOK
  ID_CARD
  ACCESSORIES
  CLOTHING
  KEYS
  BAGS
  SPORTS
  OTHER
}
```

#### Status Enum
```prisma
enum Status {
  ACTIVE
  CLAIMED
  RESOLVED
}
```

#### Book
```prisma
model Book {
  id          String        @id @default(uuid())
  title       String
  author      String
  description String
  condition   BookCondition
  priceOrRent String
  type        BookType
  image       String?
  userId      String
  user        User          @relation(fields: [userId], references: [id])
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}
```

#### BookCondition Enum
```prisma
enum BookCondition {
  NEW
  LIKE_NEW
  GOOD
  FAIR
  POOR
}
```

#### BookType Enum
```prisma
enum BookType {
  SALE
  RENT
}
```

#### Event
```prisma
model Event {
  id          String        @id @default(uuid())
  title       String
  description String
  date        DateTime
  time        String
  venue       String
  clubOrDept  String
  category    EventCategory
  contactInfo String
  userId      String
  user        User          @relation(fields: [userId], references: [id])
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}
```

#### EventCategory Enum
```prisma
enum EventCategory {
  TECHNICAL
  CULTURAL
  SPORTS
  ACADEMIC
  SOCIAL
  WORKSHOP
  SEMINAR
  OTHER
}
```

#### Notification
```prisma
model Notification {
  id        String   @id @default(uuid())
  message   String
  read      Boolean  @default(false)
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}
```

#### CoordinatorRequest
```prisma
model CoordinatorRequest {
  id          String                    @id @default(uuid())
  reason      String
  clubOrDept  String
  status      CoordinatorRequestStatus @default(PENDING)
  userId      String                    @unique
  user        User                      @relation(fields: [userId], references: [id])
  createdAt   DateTime                  @default(now())
  updatedAt   DateTime                  @updatedAt
}
```

#### CoordinatorRequestStatus Enum
```prisma
enum CoordinatorRequestStatus {
  PENDING
  APPROVED
  REJECTED
}
```

#### Account (NextAuth)
```prisma
model Account {
  id                String  @id @default(uuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}
```

#### Session (NextAuth)
```prisma
model Session {
  id           String   @id @default(uuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

#### VerificationToken (NextAuth)
```prisma
model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  @@unique([identifier, token])
}
```

---

## 🔌 API Routes

### Authentication APIs
- `POST /api/auth/signup` - User registration
- `POST /api/auth/send-otp` - Send OTP for verification
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/[...nextauth]` - NextAuth handlers
- `POST /api/auth/verify-role` - Verify user role

### Lost Items APIs
- `GET /api/lost-items` - Get all lost items
- `POST /api/lost-items` - Create lost item
- `GET /api/lost-items/[id]` - Get single lost item
- `PUT /api/lost-items/[id]` - Update lost item
- `DELETE /api/lost-items/[id]` - Delete lost item

### Found Items APIs
- `GET /api/found-items` - Get all found items
- `POST /api/found-items` - Create found item
- `GET /api/found-items/[id]` - Get single found item
- `PUT /api/found-items/[id]` - Update found item
- `DELETE /api/found-items/[id]` - Delete found item

### Books APIs
- `GET /api/books` - Get all books
- `POST /api/books` - Create book listing
- `GET /api/books/[id]` - Get single book
- `PUT /api/books/[id]` - Update book
- `DELETE /api/books/[id]` - Delete book

### Events APIs
- `GET /api/events` - Get all events
- `POST /api/events` - Create event
- `GET /api/events/[id]` - Get single event
- `PUT /api/events/[id]` - Update event
- `DELETE /api/events/[id]` - Delete event

### Coordinator APIs
- `POST /api/coordinator-requests` - Submit coordinator request
- `GET /api/coordinator-requests/[id]` - Get request status
- `PUT /api/coordinator-requests/[id]` - Update request
- `GET /api/coordinator/events` - Get coordinator's events

### Notifications APIs
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/[id]` - Mark as read
- `DELETE /api/notifications/[id]` - Delete notification

### Matching API
- `GET /api/matches` - Get potential matches

### Admin APIs
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/[id]` - Update user role
- `DELETE /api/admin/users/[id]` - Delete user
- `GET /api/admin/lost-items` - Admin view lost items
- `PUT /api/admin/lost-items/[id]` - Admin update
- `DELETE /api/admin/lost-items/[id]` - Admin delete
- `GET /api/admin/found-items` - Admin view found items
- `PUT /api/admin/found-items/[id]` - Admin update
- `DELETE /api/admin/found-items/[id]` - Admin delete
- `GET /api/admin/books` - Admin view books
- `PUT /api/admin/books/[id]` - Admin update
- `DELETE /api/admin/books/[id]` - Admin delete
- `GET /api/admin/events` - Admin view events
- `PUT /api/admin/events/[id]` - Admin update
- `DELETE /api/admin/events/[id]` - Admin delete
- `POST /api/admin/notify` - Send admin notifications

### Utility APIs
- `POST /api/upload` - File upload
- `POST /api/contact` - Contact form

---

## 🔐 Authentication & Authorization

### Authentication Methods
1. **Email/Password (Credentials)**
   - bcrypt password hashing
   - OTP verification via email
   - Session-based auth

2. **Google OAuth**
   - OAuth 2.0 flow
   - Automatic account creation
   - Profile sync

### Authorization Levels
1. **USER (Default)**
   - Report lost/found items
   - List books
   - Create events (limited)
   - View own items

2. **COORDINATOR**
   - All USER permissions
   - Create official events
   - Manage own events
   - Access coordinator dashboard

3. **ADMIN**
   - All permissions
   - User management
   - Content moderation
   - System configuration
   - View all items
   - Send notifications

### Security Features
- Password hashing (bcrypt)
- JWT tokens
- Session management
- CSRF protection
- Rate limiting (planned)
- SQL injection prevention (Prisma)
- XSS protection

---

## 🎨 UI Components

### shadcn/ui Components Used
- Avatar
- Badge
- Button
- Card
- Checkbox
- Dialog
- Dropdown Menu
- Form
- Input
- Label
- Navigation Menu
- Select
- Skeleton
- Table
- Tabs
- Textarea
- Toast (Sonner)

### Custom Components
- Navbar (with auth state)
- Footer (with coffee button)
- CoffeeModal (UPI payment)
- BackButton
- Loading states
- Book skeletons

### Design System
- **Colors**: Violet/Indigo gradient theme
- **Typography**: System fonts
- **Spacing**: Tailwind spacing scale
- **Border Radius**: Rounded corners
- **Shadows**: Layered shadows
- **Dark Mode**: Full dark theme support

---

## 🔧 Environment Variables

### Required Variables
```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="random-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-secret"

# Email (Gmail)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Optional Variables
```env
# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Feature Flags
NEXT_PUBLIC_ENABLE_MATCHES="true"
```

---

## 🚀 Deployment

### Vercel Configuration
```json
{
  "buildCommand": "prisma generate && next build",
  "devCommand": "next dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

### Deployment Steps
1. Push to GitHub main branch
2. Vercel auto-deploys
3. Environment variables set in Vercel dashboard
4. Database migrations run automatically

### Production URLs
- **Main Site**: college-reclaim.vercel.app
- **Admin Panel**: college-reclaim.vercel.app/admin
- **API**: college-reclaim.vercel.app/api

---

## 🔗 Third-Party Integrations

### 1. Google OAuth
- **Purpose**: Social login
- **Setup**: Google Cloud Console
- **Scopes**: email, profile, openid

### 2. Gmail SMTP
- **Purpose**: Send emails (OTP, notifications)
- **Port**: 587 (TLS)
- **Authentication**: App-specific password

### 3. Google Charts API
- **Purpose**: Generate QR codes for UPI
- **Endpoint**: `https://chart.googleapis.com/chart`
- **Format**: QR code (250x250)

### 4. Vercel
- **Purpose**: Hosting and deployment
- **Features**: 
  - Auto-deployments
  - Preview deployments
  - Environment variables
  - Analytics
  - Edge functions

### 5. PostgreSQL (Vercel Postgres)
- **Purpose**: Database
- **Features**:
  - Managed database
  - Automatic backups
  - Connection pooling
  - SSL connections

---

## 📊 Statistics & Metrics

### Current Features Count
- **Pages**: 25+
- **API Routes**: 40+
- **Components**: 30+
- **Database Models**: 12
- **Authentication Methods**: 2
- **User Roles**: 3
- **Categories**: 9 (Items), 8 (Events)

### Performance Metrics
- **Lighthouse Score**: 90+ (estimated)
- **First Contentful Paint**: <2s
- **Time to Interactive**: <3s
- **Bundle Size**: ~200KB (gzipped)

---

## 📱 Responsive Breakpoints

```css
- xs: 480px   (Extra small devices)
- sm: 640px   (Small devices)
- md: 768px   (Medium devices - tablets)
- lg: 1024px  (Large devices - laptops)
- xl: 1280px  (Extra large - desktops)
- 2xl: 1536px (Extra extra large)
```

---

## 🎯 Future Enhancements

### Planned Features
1. **Real-time Chat** - WebSocket-based messaging
2. **Push Notifications** - PWA notifications
3. **Advanced Analytics** - User behavior tracking
4. **AI-Powered Matching** - ML-based item matching
5. **Mobile App** - React Native app
6. **Payment Gateway** - Razorpay/Stripe integration
7. **QR Code Scanning** - Item identification
8. **Geolocation** - Map-based location picker
9. **Social Sharing** - Share items on social media
10. **Email Digests** - Weekly summary emails

---

## 📞 Support & Contact

### Developer
- **Name**: Surya S Koundinya
- **Email**: collegereclaimjc@gmail.com
- **Instagram**: @college_reclaim
- **UPI**: surya1@fam

### Project Links
- **GitHub**: github.com/suryaskoundinya/college-reclaim
- **Live Site**: college-reclaim.vercel.app
- **Documentation**: See README.md

---

## 📄 License

MIT License - Free for educational purposes

---

**Built with ❤️ for college communities**  
*Last Updated: December 22, 2025*
