🎓 College ReClaim – Campus Lost & Found Platform

College ReClaim is a web-based application designed to simplify lost and found management, book exchange, and event registration within college campuses. The platform provides a secure, centralized system for students and administrators to manage campus resources efficiently.

🚀 Features
Core Features

🔐 User Authentication – Secure login using Google OAuth via NextAuth.js

📦 Lost & Found Reporting – Students can report lost or found items with details

📚 Book Exchange Module – Upload and exchange academic books within campus

🎉 Event Registration – Register for college events digitally

✅ Admin Approval System – All submissions require admin verification

🧑‍💼 Admin Dashboard – Manage users, posts, and approvals

User Roles

Students: Report lost/found items, exchange books, register for events

Admin: Review, approve/reject submissions and manage platform content

🛠 Tech Stack
Frontend

Next.js (App Router) – Full-stack React framework

React.js – Component-based UI

Tailwind CSS – Responsive and modern UI styling

Backend

Next.js API Routes – Server-side logic and REST APIs

Prisma ORM – Type-safe database access

Database

Neon DB (Serverless PostgreSQL) – Cloud-based relational database

Authentication

NextAuth.js

Google OAuth 2.0

Deployment

Vercel – Hosting and CI/CD

🗄 Database Overview

Neon DB is used to store:

User profiles and roles

Lost & found item details

Book exchange listings

Event registrations

Admin approval status

Prisma ORM ensures secure and efficient database operations.

🔧 Getting Started
Prerequisites

Node.js 18+

npm or yarn

Neon PostgreSQL database

📥 Clone the Repository
git clone https://github.com/your-username/college-reclaim.git
cd college-reclaim

📦 Install Dependencies
npm install

⚙️ Environment Setup

Create a .env.local file in the root directory:

DATABASE_URL=your_neon_database_url
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

🗃 Database Setup
npx prisma generate
npx prisma migrate dev

▶️ Run Development Server
npm run dev


Open http://localhost:3000
 in your browser.

🔒 Authentication & Security

Google OAuth login

Role-based access control (Student / Admin)

Secure environment variables

Protected API routes

📱 Responsive Design

Mobile-first UI

Fully responsive across devices

Clean and accessible design

🚀 Deployment

The application is Vercel-ready and uses:

Vercel – Frontend & backend hosting

Neon DB – Cloud PostgreSQL

Made with ❤️ Surya

