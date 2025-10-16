#!/usr/bin/env node

/**
 * College Reclaim - Quick Database Setup Script
 * Sets up Supabase for cross-device data persistence
 */

console.log("🚀 College Reclaim - Database Setup");
console.log("==================================");

const SUPABASE_SETUP_STEPS = `
📋 QUICK SETUP STEPS:

1. 🌐 Create Supabase Account
   → Go to https://supabase.com
   → Sign up with GitHub/Google
   → Create new project

2. 🔗 Get Database URL
   → Project Settings → Database
   → Copy "Connection string" (URI format)
   → Example: postgresql://postgres.xyz:password@aws-0-region.pooler.supabase.com:6543/postgres

3. 🔑 Setup Google OAuth
   → Go to https://console.cloud.google.com
   → Create OAuth 2.0 Client ID
   → Add redirect URI: http://localhost:3000/api/auth/callback/google
   → Copy Client ID and Secret

4. 📝 Update Environment Variables
   → Edit .env.local file:
   
   DATABASE_URL="your-supabase-connection-string"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

5. 🗄️ Setup Database Schema
   → Run: npm run prisma:push
   → Run: npm run dev

6. ✅ Test Cross-Device Access
   → Open localhost:3000 on computer
   → Open same URL on phone/tablet
   → Sign in with Google
   → Add lost item on one device
   → Check if visible on other device

💡 Benefits:
✅ Data persists across devices
✅ Google authentication
✅ Real-time synchronization
✅ No data loss on refresh
✅ Multi-user support
`;

console.log(SUPABASE_SETUP_STEPS);

console.log("🔧 AUTOMATED SETUP OPTIONS:");
console.log("1. Manual setup (follow steps above)");
console.log("2. Use SQLite for local testing (current setup)");
console.log("3. Deploy to production with Vercel Postgres");

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Choose option (1-3): ', (answer) => {
  switch(answer) {
    case '1':
      console.log("\n📖 Follow the manual setup steps above");
      console.log("🌐 Open: https://supabase.com");
      break;
    case '2':
      console.log("\n🔄 Keeping SQLite for local development");
      console.log("ℹ️  Data will be stored locally only");
      break;
    case '3':
      console.log("\n🚀 Production deployment setup");
      console.log("🌐 Open: https://vercel.com/dashboard");
      break;
    default:
      console.log("\n📖 See GOOGLE-OAUTH-SETUP.md for detailed instructions");
  }
  rl.close();
});