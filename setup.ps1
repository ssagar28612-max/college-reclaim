#!/usr/bin/env pwsh
# Quick Setup Script for College Reclaim

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "College Reclaim - Quick Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env.local exists
if (-not (Test-Path ".env.local")) {
    Write-Host "❌ .env.local file not found!" -ForegroundColor Red
    Write-Host "Please copy .env.example to .env.local first" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Found .env.local file" -ForegroundColor Green
Write-Host ""

# Read current DATABASE_URL
$envContent = Get-Content ".env.local" -Raw
if ($envContent -match 'DATABASE_URL="([^"]+)"') {
    $currentDb = $matches[1]
    Write-Host "Current DATABASE_URL: $currentDb" -ForegroundColor Yellow
    
    if ($currentDb -like "file:*") {
        Write-Host "⚠️  You're using SQLite (file-based database)" -ForegroundColor Yellow
        Write-Host "   This means data is stored locally only - not available across devices" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "📝 To enable cross-device access:" -ForegroundColor Cyan
        Write-Host "   1. Create a free Supabase account: https://supabase.com" -ForegroundColor White
        Write-Host "   2. Create a new project" -ForegroundColor White
        Write-Host "   3. Copy the PostgreSQL connection string" -ForegroundColor White
        Write-Host "   4. Update DATABASE_URL in .env.local" -ForegroundColor White
        Write-Host ""
    } elseif ($currentDb -like "postgresql:*") {
        Write-Host "✅ PostgreSQL configured - Cross-device data will work!" -ForegroundColor Green
        Write-Host ""
    }
}

# Check Google OAuth
if ($envContent -match 'GOOGLE_CLIENT_ID="([^"]+)"') {
    $googleId = $matches[1]
    if ($googleId -like "your-google-*" -or $googleId -eq "") {
        Write-Host "⚠️  Google OAuth not configured" -ForegroundColor Yellow
        Write-Host "   Users won't be able to sign in with Google" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "📝 To enable Google login:" -ForegroundColor Cyan
        Write-Host "   1. Go to: https://console.cloud.google.com" -ForegroundColor White
        Write-Host "   2. Create OAuth credentials" -ForegroundColor White
        Write-Host "   3. Update GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local" -ForegroundColor White
        Write-Host "   4. See GOOGLE-AUTH-DATABASE-SETUP.md for detailed instructions" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host "✅ Google OAuth configured" -ForegroundColor Green
        Write-Host ""
    }
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$response = Read-Host "Do you want to initialize the database now? (y/n)"
if ($response -eq "y" -or $response -eq "Y") {
    Write-Host ""
    Write-Host "📦 Generating Prisma Client..." -ForegroundColor Cyan
    npx prisma generate
    
    Write-Host ""
    Write-Host "🗄️  Pushing database schema..." -ForegroundColor Cyan
    npx prisma db push
    
    Write-Host ""
    Write-Host "✅ Database initialized!" -ForegroundColor Green
    Write-Host ""
}

Write-Host ""
Write-Host "🚀 To start the development server, run:" -ForegroundColor Cyan
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "📖 For detailed setup instructions, see:" -ForegroundColor Cyan
Write-Host "   GOOGLE-AUTH-DATABASE-SETUP.md" -ForegroundColor White
Write-Host ""
