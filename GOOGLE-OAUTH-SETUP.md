# Google OAuth Setup Guide for College Reclaim

## 🔧 Setting up Google Authentication

### Step 1: Create Google OAuth App
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google+ API** and **Gmail API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Set Application Type: **Web Application**
6. Add Authorized Redirect URIs:
   - http://localhost:3000/api/auth/callback/google
   - https://college-reclaim-prod.vercel.app/api/auth/callback/google

### Step 2: Get Credentials
Copy the **Client ID** and **Client Secret** from Google Console

### Step 3: Add to Environment Variables
Add these to your .env.local file:

```bash
GOOGLE_CLIENT_ID="your-google-client-id-here"
GOOGLE_CLIENT_SECRET="your-google-client-secret-here"
```

### Step 4: Production Setup
For Vercel deployment, add the same variables in:
Vercel Dashboard → Project Settings → Environment Variables

## 🌐 Cloud Database Setup

### Option 1: Supabase (Recommended - Free)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from Settings → Database
4. Update DATABASE_URL in environment variables

### Option 2: Vercel Postgres
1. Vercel Dashboard → Storage → Create Database
2. Select PostgreSQL
3. Copy connection string
4. Add to environment variables

### Step 5: Test Setup
1. Run `npm run dev`
2. Visit http://localhost:3000/auth/signin
3. Click "Sign in with Google"
4. Should redirect to Google login page