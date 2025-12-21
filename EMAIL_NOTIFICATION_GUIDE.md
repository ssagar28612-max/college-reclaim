# Email Notification System Guide

## Overview
The College Reclaim application now has a comprehensive email notification system that allows admins to send emails to all users or specific users from the database.

## Features

### 1. **Send to All Users**
- Broadcast email notifications to all verified users in the database
- Perfect for announcements, updates, or system-wide notifications

### 2. **Send to Specific User**
- Select individual users from a dropdown populated from the database
- Shows user name, email, role, and verification status
- Useful for targeted communications

### 3. **Automatic Coordinator Emails**
- Confirmation email sent when someone submits a coordinator request
- Approval email with credentials when request is approved
- Rejection email with polite message when request is rejected

## How to Use the Email Notification System

### Step 1: Access Admin Dashboard
1. Go to `http://localhost:3000/auth/signin`
2. Sign in with admin credentials:
   - **Email**: collegereclaimjc@gmail.com
   - **Password**: Enixboi21

### Step 2: Navigate to Notifications Tab
1. Once logged in, you'll see the Admin Dashboard
2. Click on the **"Notify"** tab (last tab with Mail icon)

### Step 3: Choose Recipient Type
You have two options:

#### Option A: Send to All Users
1. Select the radio button **"Send to All Users"**
2. Fill in the subject and message
3. Click **"Send to All Users"** button

#### Option B: Send to Specific User
1. Select the radio button **"Send to Specific User"**
2. A dropdown will appear showing all users from the database
3. Each user shows: `Name (Email) - Role ✓/Unverified`
4. Select the desired user from the dropdown
5. Fill in the subject and message
6. Click **"Send to Selected User"** button

### Step 4: Compose Your Message
1. **Subject**: Enter a clear, concise subject line
2. **Message**: Enter your message (supports multi-line text)
   - Each line will be formatted as a separate paragraph in the email

### Step 5: Send
- Click the button at the bottom
- Wait for the success/error message
- Success: "Notification sent to X users" or "Notification sent to [email]"
- Error: "Failed to send notification" or "Please select a recipient"

## Email Configuration

The system is configured to use Gmail SMTP with the following settings:

```env
EMAIL_USER="collegereclaimjc@gmail.com"
EMAIL_PASS="mgjdjexugehriyoz"  # App Password
```

### Gmail Setup Requirements
- Gmail account must have 2-Step Verification enabled
- Must use an App Password (not your regular Gmail password)
- App Password is already configured in `.env.local`

## Automatic Email Notifications

The system automatically sends emails in these scenarios:

### 1. Coordinator Request Submission
When someone submits a coordinator access request:
- **Recipient**: The requester
- **Content**: Confirmation of submission with "What's Next" information
- **Also sent to**: Admin notification

### 2. Coordinator Request Approval
When admin approves a coordinator request:
- **Recipient**: The approved user
- **Content**: 
  - Welcome message
  - Login credentials (email + auto-generated password)
  - Instructions to change password after first login

### 3. Coordinator Request Rejection
When admin rejects a coordinator request:
- **Recipient**: The rejected user
- **Content**: Polite rejection message with next steps

## API Endpoints

### 1. Send Notification (Admin Only)
```
POST /api/admin/notify
```

**Request Body:**
```json
{
  "subject": "Email Subject",
  "message": "Your message here",
  "recipientEmail": "optional@email.com"  // Omit for broadcast
}
```

**Response:**
```json
{
  "success": true,
  "message": "Notification sent to X users"
}
```

### 2. Fetch All Users (Admin Only)
```
GET /api/admin/users
```

**Response:**
```json
{
  "users": [
    {
      "id": "user_id",
      "email": "user@example.com",
      "name": "User Name",
      "role": "STUDENT",
      "department": "Computer Science",
      "emailVerified": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## Troubleshooting

### "Failed to send email"
1. **Check Email Credentials**:
   - Verify `EMAIL_USER` and `EMAIL_PASS` in `.env.local`
   - Ensure the App Password is correct (not regular Gmail password)

2. **Check Gmail Security**:
   - Enable 2-Step Verification in Google Account
   - Generate a new App Password if needed
   - Go to: https://myaccount.google.com/apppasswords

3. **Check Console Logs**:
   - Open browser DevTools Console (F12)
   - Look for error messages
   - Check terminal where dev server is running

4. **Verify User Selection**:
   - If sending to specific user, ensure you've selected one from dropdown
   - Check that the user has a valid email address

### "Please select a recipient"
- You chose "Send to Specific User" but didn't select anyone
- Select a user from the dropdown or switch to "Send to All Users"

### Email not received
1. **Check Spam/Junk Folder**: Gmail may mark automated emails as spam
2. **Verify Email Verified Status**: Only users with verified emails receive broadcast messages
3. **Check Email Address**: Ensure the email address in database is correct

### Dropdown is empty
1. **No users in database**: Create some test users first
2. **Not on Notifications tab**: Users are only fetched when you click the "Notify" tab
3. **Server error**: Check terminal logs for database connection issues

## Email Template

All emails are sent with the College Reclaim branding:

```html
- Purple gradient header with "College Reclaim" title
- Greeting with user's name
- Message content in a styled box
- Footer with contact information
```

## Security

- **Admin Only**: Only users with ADMIN role can access notification system
- **Session Validation**: All requests check for valid admin session
- **Error Handling**: Email failures are logged but don't crash the server
- **Try-Catch Blocks**: All email operations wrapped in error handling

## Testing the System

### Test Send to All
1. Sign in as admin
2. Go to Notify tab
3. Select "Send to All Users"
4. Subject: "Test Notification"
5. Message: "This is a test email to all users"
6. Click send
7. Check all verified user emails

### Test Send to Specific User
1. Sign in as admin
2. Go to Notify tab
3. Select "Send to Specific User"
4. Choose your own email from dropdown
5. Subject: "Test Personal Email"
6. Message: "This is a test email to me"
7. Click send
8. Check your email inbox

### Test Coordinator Request Flow
1. Sign out from admin
2. Go to `/auth/signup` (or coordinator request page)
3. Submit a coordinator request with your email
4. Check email for confirmation
5. Sign back in as admin
6. Approve the request from Coordinators tab
7. Check email for approval with credentials

## Support

If you encounter issues:
1. Check this guide first
2. Verify email configuration in `.env.local`
3. Check browser console and server terminal for errors
4. Ensure database connection is working
5. Test with Gmail account directly

## Files Modified

- `/src/app/admin/page.tsx` - Admin dashboard with notification UI
- `/src/app/api/admin/notify/route.ts` - Send notification endpoint
- `/src/app/api/admin/users/route.ts` - Fetch users endpoint
- `/src/app/api/coordinator-requests/route.ts` - Confirmation emails
- `/src/app/api/coordinator-requests/[id]/route.ts` - Approval/rejection emails
- `/src/lib/email.ts` - Email utility functions
- `/prisma/schema.prisma` - Database schema with user roles

## Next Steps

Consider adding:
- [ ] Email templates for different notification types
- [ ] Scheduled emails
- [ ] Email history/logs in database
- [ ] Bulk email with CSV upload
- [ ] Email preview before sending
- [ ] Rich text editor for email composition
- [ ] Attachment support
