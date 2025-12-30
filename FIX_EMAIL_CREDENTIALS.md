# 🔧 Fix Email Credentials - Gmail App Password Setup

## ❌ Current Error
```
Error: Invalid login: 535-5.7.8 Username and Password not accepted
Code: EAUTH
```

This means the Gmail App Password is **invalid, expired, or incorrect**.

---

## ✅ Solution: Generate New Gmail App Password

### Step 1: Enable 2-Step Verification
1. Go to: **https://myaccount.google.com/security**
2. Click on **"2-Step Verification"**
3. Follow the steps to enable it if not already enabled
4. You MUST have 2-Step Verification enabled to create App Passwords

### Step 2: Generate App Password
1. Go to: **https://myaccount.google.com/apppasswords**
2. You may need to sign in again
3. In the "App name" field, type: **College Reclaim**
4. Click **"Create"**
5. Google will generate a 16-character password (e.g., `abcd efgh ijkl mnop`)
6. **Copy this password** (you won't see it again!)

### Step 3: Update .env.local File
1. Open: `c:\Users\surya\Desktop\code\college_reclaim_prod\.env.local`
2. Find the line: `EMAIL_PASS="mgjdjexugehriyoz"`
3. Replace with your NEW app password (remove spaces):
   ```env
   EMAIL_PASS="abcdefghijklmnop"
   ```
4. **Important**: Remove all spaces from the app password
5. Save the file

### Step 4: Restart Dev Server
1. Stop the current server: Press `Ctrl + C` in terminal
2. Restart: `npm run dev`
3. Wait for server to start
4. Test sending an email from admin panel

---

## 🧪 Test Email System

### After updating credentials:

1. **Go to Admin Dashboard**: http://localhost:3000/admin
2. **Sign in** with admin credentials:
   - Email: `collegereclaimjc@gmail.com`
   - Password: `redacted`
3. **Click "Notify" tab**
4. **Test with yourself**:
   - Select "Send to Specific User"
   - Choose your email from dropdown
   - Subject: "Test"
   - Message: "Testing email system"
   - Click "Send to Selected User"
5. **Check your email** (including spam folder)

---

## 📋 Troubleshooting Checklist

### If emails still fail:

- [ ] **2-Step Verification is enabled** on Google Account
- [ ] **App Password is fresh** (just generated)
- [ ] **No spaces in EMAIL_PASS** in .env.local
- [ ] **Correct email** in EMAIL_USER field
- [ ] **Dev server restarted** after changing .env.local
- [ ] **Gmail account not locked** - check https://mail.google.com
- [ ] **Less secure app access disabled** (not needed with App Password)

### Common Mistakes:

❌ **Using regular Gmail password** → Use App Password instead  
❌ **Spaces in App Password** → Remove all spaces: `abcd efgh ijkl mnop` → `abcdefghijklmnop`  
❌ **2-Step Verification disabled** → Must be enabled  
❌ **Not restarting server** → Server caches .env variables  
❌ **Wrong email account** → Must match EMAIL_USER  

---

## 🔍 Verify Configuration

### Quick Test Command:
After updating credentials, run in terminal:
```powershell
node -e "require('nodemailer').createTransport({service:'gmail',auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_PASS}}).verify().then(console.log).catch(console.error)"
```

If successful: `true`  
If failed: Error message with details

---

## 📧 Alternative: Use Different Email Provider

If Gmail doesn't work, you can use other services:

### Outlook/Hotmail:
```env
EMAIL_USER="your-email@outlook.com"
EMAIL_PASS="your-password"
```

Update `src/lib/email.ts`:
```typescript
service: 'outlook'  // instead of 'gmail'
```

### Custom SMTP:
```env
EMAIL_HOST="smtp.yourdomain.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@yourdomain.com"
EMAIL_PASS="your-password"
```

Update `src/lib/email.ts`:
```typescript
host: process.env.EMAIL_HOST,
port: Number(process.env.EMAIL_PORT),
secure: false,
```

---

## 🎯 Current Configuration

**File**: `.env.local`

```env
EMAIL_USER="collegereclaimjc@gmail.com"
EMAIL_PASS="mgjdjexugehriyoz"  # ⚠️ NEEDS UPDATE
```

**Status**: ❌ Invalid - generates EAUTH error

**Action Required**: Generate new App Password and update EMAIL_PASS

---

## 📞 Support Links

- **Gmail App Passwords**: https://myaccount.google.com/apppasswords
- **Google 2-Step Verification**: https://myaccount.google.com/security
- **Gmail Help**: https://support.google.com/mail/?p=BadCredentials
- **Nodemailer Docs**: https://nodemailer.com/usage/using-gmail/

---

## ✨ After Fixing

Once emails work, you can:

✅ Send notifications to all users  
✅ Send to specific users from dropdown  
✅ Automatic coordinator request emails  
✅ Approval/rejection emails with credentials  

All these features are already implemented and will work once credentials are fixed!
