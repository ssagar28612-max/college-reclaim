# College ReClaim - Campus Lost & Found Platform

College ReClaim is a comprehensive web application designed to simplify lost and found management, book exchange, and event registration within college campuses. The platform provides a secure, centralized system with modern UI/UX for students and administrators.

## Features

### Core Functionality

- **Lost & Found System** - Report and search for lost/found items with detailed descriptions and images
- **Book Exchange** - Buy, sell, or rent academic textbooks with price negotiation
- **Event Management** - Create and discover campus events with RSVP functionality
- **Smart Matching** - Automatic matching algorithm for lost and found items
- **Real-time Notifications** - Get notified when potential matches are found
- **Image Preview** - Full-screen image viewer with zoom controls for all item images
- **Advanced Search** - Filter items by category, location, date, and keywords

### Authentication & Roles

- **NextAuth.js** - Secure session management with email/password authentication
- **Role-based Access Control**
  - Users: Report items, exchange books, register for events
  - Coordinators: Create and manage events (requires admin approval)
  - Admins: Full platform management and approval system
- **Email Verification** - OTP-based email verification for new accounts
- **Password Reset** - Secure password recovery via email OTP

### UI/UX Enhancements

- **Mobile-Responsive Design** - Optimized for all screen sizes with special focus on mobile usability
- **Admin Panel Mobile Fix** - Sticky header with proper z-index layering prevents content overlap
- **Smart Notifications** - Red dot indicator shows unread count, auto-clears on view
- **Location Helper** - Contextual tips for selecting custom locations in forms
- **Image Lightbox** - Click any image to view full-screen with zoom (0.5x-3x) and download options
- **Animated Components** - Smooth page transitions and hover effects using Framer Motion
- **Dark Mode Support** - System-aware theme switching
- **Loading States** - Skeleton loaders for better perceived performance

### Admin Dashboard

- **User Management** - View, approve, and manage user roles
- **Content Moderation** - Approve/reject lost items, found items, books, and events
- **Coordinator Approvals** - Review coordinator role requests
- **Notification System** - Send platform-wide announcements
- **Analytics** - Track platform usage and metrics
- **Mobile-Optimized** - Responsive layout with fixed headers and accessible controls

## Tech Stack

### Frontend
- **Next.js 15.5** - React framework with App Router
- **React 19** - UI component library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Accessible component primitives
- **Framer Motion** - Animation library
- **React Query** - Data fetching and caching
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - RESTful API endpoints
- **Prisma ORM 6.16** - Type-safe database client
- **NextAuth.js 4.24** - Authentication provider
- **Nodemailer** - Email delivery
- **bcryptjs** - Password hashing

### Database
- **PostgreSQL** - Primary database (Neon DB for production)
- **Prisma Schema** - Database modeling and migrations

### Deployment
- **Vercel** - Hosting and CI/CD
- **Neon DB** - Serverless PostgreSQL

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- PostgreSQL database (local or Neon DB)

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/college-reclaim.git
cd college-reclaim
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/college_reclaim"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Email Configuration (for OTP)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_FROM="College ReClaim <noreply@collegereclaim.com>"

# Optional: File Upload
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
```

4. Set up the database
```bash
npx prisma generate
npx prisma migrate dev
```

5. (Optional) Seed demo data
```bash
npm run seed
```

This creates demo users, lost/found items, books, and events with Indian names and realistic data.
Demo credentials: `arjun.mehta@college.edu` / `Demo@123`

6. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed demo data
- `npm run seed:reset` - Reset database and seed fresh data

## Project Structure

```
college_reclaim_prod/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.js            # Demo data seeding
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── api/           # API endpoints
│   │   ├── admin/         # Admin dashboard
│   │   ├── coordinator/   # Coordinator pages
│   │   ├── auth/          # Authentication pages
│   │   ├── books/         # Book exchange
│   │   ├── events/        # Event management
│   │   ├── notifications/ # User notifications
│   │   ├── profile/       # User profile
│   │   ├── report/        # Report lost/found items
│   │   └── search/        # Search functionality
│   ├── components/
│   │   ├── ui/            # Reusable UI components
│   │   ├── navbar.tsx     # Navigation bar
│   │   └── footer.tsx     # Footer component
│   ├── lib/
│   │   ├── auth.ts        # NextAuth configuration
│   │   ├── prisma.ts      # Prisma client
│   │   ├── email.ts       # Email utilities
│   │   └── utils.ts       # Helper functions
│   └── types/             # TypeScript type definitions
└── public/                # Static assets
```

## Key Features Explained

### Image Preview Modal

All item images are clickable and open in a full-screen lightbox with:
- Zoom controls (0.5x to 3x)
- Download button
- Click outside or ESC to close
- Responsive and mobile-friendly

### Smart Notifications

- Red dot indicator on bell icon shows unread notification count
- Automatically marks notifications as read when viewed
- Polls for new notifications every 30 seconds
- Shows timestamp and relevant action buttons

### Mobile-First Admin Panel

- Sticky header with proper z-index prevents content overlap
- Responsive tab layout (3 columns on mobile, full width on desktop)
- Touch-friendly buttons and controls
- Consistent spacing across all screen sizes

### Location Selection Helper

When reporting items, the location dropdown includes:
- Pre-defined common campus locations
- "Other" option with custom text input
- Helper text: "Tip: Choose 'Other' to specify a custom location"

## Authentication Flow

1. User signs up with email and password
2. OTP sent to email for verification
3. User enters OTP to verify account
4. User can sign in with verified credentials
5. Password reset available via email OTP

## Admin Setup

To create an admin user, use the provided script:

```bash
node scripts/set-admin.js your-email@example.com
```

## Database Schema

Key models:
- **User** - User accounts with roles (USER, COORDINATOR, ADMIN)
- **LostItem** - Lost item reports
- **FoundItem** - Found item reports
- **Book** - Book exchange listings
- **Event** - Campus events
- **Notification** - User notifications
- **Match** - Automatic lost/found matches

See [prisma/schema.prisma](prisma/schema.prisma) for complete schema.

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database Migration

```bash
npx prisma migrate deploy
```

### Post-Deployment

- Run seed script to populate demo data
- Create admin account using set-admin script
- Test all authentication flows
- Verify email delivery

## Security Features

- Password hashing with bcryptjs (10 rounds)
- Email verification via OTP
- Role-based API route protection
- CSRF protection with NextAuth
- Secure session management
- Environment variable protection

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - see LICENSE file for details

## Contributors

Developed by Surya

## Support

For issues or questions, please open an issue on GitHub or contact the development team.

