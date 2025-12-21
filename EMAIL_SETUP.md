# Email Setup Guide

## Gmail App Password Configuration

To enable email notifications in College ReClaim, you need to set up a Gmail App Password.

### Steps:

1. **Enable 2-Step Verification on your Gmail account:**
   - Go to https://myaccount.google.com/security
   - Find "2-Step Verification" and enable it

2. **Generate an App Password:**
   - Visit https://myaccount.google.com/apppasswords
   - Or go to Google Account → Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Name it "College ReClaim App"
   - Click "Generate"
   - **Copy the 16-character password** (it will look like: "abcd efgh ijkl mnop")

3. **Update your `.env.local` file:**
   ```env
   EMAIL_USER="collegereclaimjc@gmail.com"
   EMAIL_PASS="your-16-char-app-password-here"
   ```
   Replace `your-16-char-app-password-here` with the password from step 2
   **Remove any spaces** from the app password

4. **Restart the development server:**
   ```bash
   npm run dev
   ```

### Testing Email Functionality

1. Sign in as admin at http://localhost:3000/admin
2. Go to the "Notify" tab
3. Enter a test subject and message
4. Click "Send to All Users"
5. Check your email inbox (and spam folder) for the notification

### Troubleshooting

- **"Email credentials not configured"**: Make sure EMAIL_USER and EMAIL_PASS are set in `.env.local`
- **"Invalid login"**: Regenerate the App Password and update `.env.local`
- **Emails not received**: Check spam folder, verify emailVerified is set for users in database
- **Server not seeing new env vars**: Restart the dev server after updating `.env.local`

## Current Status

✅ Email system code is ready
✅ Admin notification endpoint created
⚠️ **ACTION REQUIRED**: Set up Gmail App Password in `.env.local`
