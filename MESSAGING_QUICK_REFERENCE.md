# Messaging System - Quick Reference

## 🚀 Quick Start

### For Users

**Send a Message:**
1. Browse to any Lost Item / Found Item / Book / Event
2. Click "Send Message" button (below item details)
3. Type message in modal
4. Press Enter or click Send

**View Messages:**
1. Click Messages icon (💬) in navbar
2. Select conversation from list
3. Chat in modal

### For Admins

**Monitor Conversations:**
1. Go to Admin Panel
2. Click "Chats" tab
3. Click "View" on any conversation
4. Review messages and participants

OR directly visit: `/admin/conversations`

## 📍 Key URLs

- `/messages` - User messages page
- `/admin/conversations` - Admin monitoring
- `/admin` - Admin panel (has Chats tab)

## 🔌 API Quick Reference

### User APIs
```
GET  /api/conversations              - List conversations
POST /api/conversations              - Create conversation
GET  /api/conversations/[id]         - Get conversation
POST /api/conversations/[id]/messages - Send message
```

### Admin APIs
```
GET /api/admin/conversations     - List all (admin)
GET /api/admin/conversations/[id] - View details (admin)
```

## 🎛️ Configuration

### Rate Limits (in `src/lib/rate-limit.ts`)
```typescript
Messages: 30 per minute per user
Conversations: 10 per hour per user
```

### Message Limits
```typescript
Max length: 2000 characters
Min length: 1 character (after trim)
```

## 🗂️ File Locations

### Components
- `src/components/chat-modal.tsx` - Chat UI
- `src/components/send-message-button.tsx` - Trigger button

### Pages
- `src/app/messages/page.tsx` - User page
- `src/app/admin/conversations/page.tsx` - Admin page

### API Routes
- `src/app/api/conversations/` - User endpoints
- `src/app/api/admin/conversations/` - Admin endpoints

### Utilities
- `src/lib/rate-limit.ts` - Rate limiting
- `prisma/schema.prisma` - Database models

## 🔧 Common Commands

```bash
# Regenerate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# Create migration
npx prisma migrate dev --name add_messaging

# Clean build
rm -rf .next && npm run build

# Start dev server
npm run dev
```

## 🐛 Troubleshooting

### Issue: TypeScript errors about Prisma models
```bash
npx prisma generate
# Then restart TypeScript server in VSCode
```

### Issue: Rate limit too strict
Edit `src/lib/rate-limit.ts`:
```typescript
export function rateLimitMessages(userId: string) {
  return rateLimit(`message:${userId}`, {
    maxRequests: 50, // Increase from 30
    windowMs: 60000,
  });
}
```

### Issue: Messages not sending
1. Check browser console for errors
2. Verify user is authenticated
3. Check server logs
4. Verify database connection

## 📊 Database Tables

### Conversation
- Links to items via `itemType` + `itemId`
- Has many participants
- Has many messages

### ConversationParticipant
- Links users to conversations
- Tracks `lastReadAt`

### Message
- Links to conversation
- Has sender and receiver
- Tracks read status

### Indexes
- `Conversation`: `[itemType, itemId]`
- `Message`: `[conversationId]`, `[senderId]`, `[receiverId]`

## 🎨 UI Components Props

### SendMessageButton
```tsx
<SendMessageButton
  itemType="BOOK"           // LOST_ITEM | FOUND_ITEM | BOOK | EVENT
  itemId="abc123"           // Item ID
  ownerId="user123"         // Owner user ID
  ownerName="John Doe"      // Owner name
  ownerImage="/avatar.jpg"  // Optional
  itemTitle="Book Title"    // Display name
  variant="outline"         // Optional: button style
  size="sm"                 // Optional: button size
  className="w-full"        // Optional: custom classes
/>
```

### ChatModal
```tsx
<ChatModal
  itemType="BOOK"
  itemId="abc123"
  receiverId="user123"
  receiverName="John Doe"
  receiverImage="/avatar.jpg"
  itemTitle="Book Title"
  onClose={() => setShowChat(false)}
/>
```

## 🔐 Security Checklist

- [x] Authentication on all endpoints
- [x] Authorization checks (user/admin)
- [x] Rate limiting implemented
- [x] Input validation (length, content)
- [x] XSS prevention
- [x] CSRF protection (Next.js default)
- [x] Admin read-only access
- [x] No contact detail leakage

## 📈 Monitoring Metrics

Track these in production:
- Total conversations created
- Messages sent per day
- Rate limit hits per hour
- Average response time
- Reported abuse cases
- Admin monitoring frequency

## 🎯 Best Practices

### For Development
1. Always test both user and admin views
2. Verify rate limits work correctly
3. Test mobile responsiveness
4. Check error handling
5. Validate user permissions

### For Deployment
1. Run database migration first
2. Test in staging environment
3. Monitor error logs
4. Set up alerting for abuse
5. Have rollback plan ready

### For Maintenance
1. Review rate limit settings monthly
2. Check for spam patterns
3. Update dependencies regularly
4. Monitor database size
5. Archive old conversations

## 📚 Documentation

- Full docs: `MESSAGING_SYSTEM_DOCS.md`
- Summary: `MESSAGING_IMPLEMENTATION_SUMMARY.md`
- This guide: `MESSAGING_QUICK_REFERENCE.md`

## 🆘 Support

### Need Help?
1. Check documentation files above
2. Review error messages in console
3. Check server logs
4. Verify database schema
5. Test API endpoints with curl/Postman

### Contact Info Features
Place holder for your team contact info

---

**Last Updated:** December 29, 2025
**Version:** 1.0.0
**Status:** Production Ready ✅
