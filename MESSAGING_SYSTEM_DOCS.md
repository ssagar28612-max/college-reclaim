# In-App Messaging System Documentation

## Overview

A secure, monitored in-app messaging system that allows users to communicate directly within the platform regarding lost items, found items, books, and events.

## Features Implemented

### 1. User-Facing Features

#### Send Message Button
- Added to all listing pages (Lost Items, Found Items, Books, Events)
- Only visible to authenticated users
- Hidden for item owners (can't message yourself)
- Opens a clean chat modal when clicked

#### Chat Modal
- Real-time-like messaging interface
- Shows conversation history
- Message bubbles with sender identification
- Timestamps for each message
- Auto-scroll to latest messages
- Character limit (2000 characters per message)
- Send messages with Enter key (Shift+Enter for new line)

#### Messages Page (`/messages`)
- View all conversations in one place
- Shows unread message counts
- Preview of last message
- Organized by most recent activity
- Click to open chat modal

#### Navbar Integration
- Added "Messages" icon in navbar for quick access
- Positioned next to notifications for easy discovery

### 2. Admin Features

#### Admin Conversations Dashboard (`/admin/conversations`)
- View all user conversations platform-wide
- Read-only access (no message editing)
- Pagination support for large datasets
- Shows conversation metadata:
  - Participants with roles
  - Associated item/listing details
  - Message count
  - Last activity timestamp
  - Full conversation history

#### Detailed Conversation View
- Click any conversation to view full details
- See all participants with contact information
- View complete message thread
- See which messages are read/unread
- View related item/listing information

#### Admin Panel Integration
- Added "Chats" tab in admin dashboard
- Quick link to full conversations monitoring interface

### 3. Database Schema

#### New Models

**Conversation**
- Tracks conversations between users about specific items
- Links to item via `itemType` and `itemId`
- Indexed for efficient queries

**ConversationParticipant**
- Many-to-many relationship between users and conversations
- Tracks last read timestamp per user
- Ensures only participants can access conversations

**Message**
- Individual messages in conversations
- References sender and receiver
- Read status tracking
- Created/updated timestamps

**ItemType Enum**
- `LOST_ITEM` - For lost item discussions
- `FOUND_ITEM` - For found item discussions
- `BOOK` - For book-related conversations
- `EVENT` - For event-related conversations

**NotificationType Enhancement**
- Added `NEW_MESSAGE` type for chat notifications

### 4. API Endpoints

#### Public Endpoints (Authenticated Users)

**GET /api/conversations**
- Get all conversations for logged-in user
- Returns conversations with unread counts
- Ordered by most recent activity

**POST /api/conversations**
- Create new conversation or get existing one
- Parameters: `itemType`, `itemId`, `receiverId`
- Rate limited: 10 conversations per hour per user

**GET /api/conversations/[id]**
- Get specific conversation details
- Includes all messages
- Marks messages as read automatically
- Verifies user is a participant

**POST /api/conversations/[id]/messages**
- Send a message in a conversation
- Parameters: `content`
- Rate limited: 30 messages per minute per user
- Creates notification for receiver
- Updates conversation timestamp

#### Admin Endpoints

**GET /api/admin/conversations**
- List all conversations (admin only)
- Supports pagination (`page`, `limit` query params)
- Includes item details and message counts

**GET /api/admin/conversations/[id]**
- Get full conversation details (admin only)
- Includes all messages and participant info
- Includes related item/listing information

### 5. Security Measures

#### Authentication & Authorization
- All endpoints require authentication
- Users can only access their own conversations
- Admin endpoints verify ADMIN role
- No direct contact detail sharing (messages only)

#### Rate Limiting
- **Messages**: 30 per minute per user
- **New Conversations**: 10 per hour per user
- In-memory rate limiting (scalable to Redis)
- Returns 429 status with retry information

#### Input Validation
- Message content required and trimmed
- Maximum 2000 characters per message
- Prevents messaging yourself
- Validates conversation participant status

#### Privacy Protection
- Users cannot see other users' contact details directly
- All communication through platform
- Admin monitoring for safety and abuse prevention
- Read-only admin access (no editing)

### 6. Notification Integration

#### Auto-Notifications
- New message triggers notification to receiver
- Shows sender name and preview
- Clicking notification opens chat
- Unread indicators in messages list

#### Notification Format
```
Title: "New Message"
Message: "[Sender Name] sent you a message"
Type: NEW_MESSAGE
```

### 7. UI/UX Features

#### Responsive Design
- Mobile-friendly chat interface
- Responsive message bubbles
- Touch-optimized buttons
- Adaptive layouts for all screen sizes

#### Visual Feedback
- Loading states during message sending
- Unread message badges
- Message timestamps (relative time)
- Sender/receiver color coding
- Auto-scroll to latest messages

#### Accessibility
- Keyboard navigation support
- Clear visual hierarchy
- Readable text contrast
- Semantic HTML structure

## Usage Examples

### For Users

#### Starting a Conversation
1. Browse to any Lost Item, Found Item, Book, or Event
2. Click the "Send Message" button
3. Type your message in the modal
4. Click Send or press Enter

#### Viewing Messages
1. Click the Messages icon in navbar
2. Select a conversation from the list
3. View history and send new messages

### For Admins

#### Monitoring Conversations
1. Go to Admin Panel
2. Click "Chats" tab or navigate to `/admin/conversations`
3. Browse all conversations
4. Click "View" to see full details

#### Viewing Specific Conversation
1. In conversations list, click "View" button
2. See participants, item details, and messages
3. Review for policy violations or safety concerns

## Technical Implementation

### Tech Stack
- **Frontend**: React, Next.js, Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Date Formatting**: date-fns

### File Structure
```
src/
├── app/
│   ├── api/
│   │   ├── conversations/
│   │   │   ├── route.ts (GET, POST)
│   │   │   └── [id]/
│   │   │       ├── route.ts (GET conversation)
│   │   │       └── messages/
│   │   │           └── route.ts (POST message)
│   │   └── admin/
│   │       └── conversations/
│   │           ├── route.ts (GET all)
│   │           └── [id]/
│   │               └── route.ts (GET detail)
│   ├── messages/
│   │   └── page.tsx (User messages page)
│   └── admin/
│       └── conversations/
│           └── page.tsx (Admin dashboard)
├── components/
│   ├── chat-modal.tsx (Chat UI component)
│   └── send-message-button.tsx (Trigger button)
├── lib/
│   └── rate-limit.ts (Rate limiting utility)
└── prisma/
    └── schema.prisma (Database models)
```

### Database Relationships
```
User ──< ConversationParticipant >── Conversation ──< Message
     └─< Message (as sender)
     └─< Message (as receiver)
```

## Performance Considerations

### Optimizations
- Paginated conversation lists
- Indexed database queries
- Rate limiting to prevent abuse
- Efficient message loading
- Auto-cleanup of rate limit entries

### Scalability
- Ready for Redis-based rate limiting
- Prepared for WebSocket integration
- Database indexes for fast queries
- Modular code structure

## Future Enhancements

### Potential Features
1. **Real-time messaging** with WebSockets
2. **Image attachments** in messages
3. **Message reactions** (like, helpful, etc.)
4. **User blocking** functionality
5. **Report message** feature
6. **Conversation archiving**
7. **Message search** within conversations
8. **Typing indicators**
9. **Read receipts**
10. **Push notifications** for mobile

### Moderation Tools
1. **Keyword filtering**
2. **Automated flagging** of suspicious content
3. **User reports** system
4. **Admin message deletion**
5. **User suspension** from messaging

## Testing Checklist

- [x] Create conversation between two users
- [x] Send messages back and forth
- [x] Verify notifications are created
- [x] Check messages page shows conversations
- [x] Test admin can view all conversations
- [x] Verify rate limiting works
- [x] Test mobile responsiveness
- [x] Verify users can't message themselves
- [x] Test unauthorized access is blocked
- [x] Verify admin-only endpoints are protected

## Migration Instructions

### Database Migration
```bash
# Generate Prisma client with new models
npx prisma generate

# Create and apply migration
npx prisma migrate dev --name add_messaging_system

# Or push schema changes (development)
npx prisma db push
```

### Deployment Checklist
1. Run database migration
2. Update environment variables if needed
3. Test API endpoints
4. Verify rate limiting configuration
5. Test admin access controls
6. Monitor for errors in production

## Support & Maintenance

### Common Issues

**Rate Limit Errors**
- Users see "Rate limit exceeded" message
- Solution: Adjust limits in `src/lib/rate-limit.ts`

**Messages Not Sending**
- Check database connection
- Verify authentication
- Check rate limiting status

**Admin Can't Access**
- Verify user has ADMIN role
- Check session authentication

### Monitoring

Key metrics to track:
- Total conversations created
- Messages sent per day
- Average response time
- Rate limit hits
- Admin monitoring frequency

## Security Best Practices

1. **Never expose contact details directly** in messages
2. **Always validate user permissions** before showing data
3. **Rate limit aggressively** to prevent spam
4. **Log all admin actions** for audit trail
5. **Monitor for abusive behavior** patterns
6. **Keep dependencies updated** for security patches

## Conclusion

This messaging system provides a secure, monitored communication channel for users while giving administrators complete oversight for safety and moderation purposes. The implementation follows production-grade best practices with proper authentication, authorization, rate limiting, and user experience considerations.
