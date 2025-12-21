# Role-Based Authentication Setup Instructions

## Database Migration Required

After the code changes, you need to run database migrations to update the schema with new roles and fields.

### Steps to Apply Changes:

1. **Generate Prisma Migration**
   ```bash
   npx prisma migrate dev --name add_coordinator_role_and_department
   ```

2. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

3. **Verify Database Changes**
   - The `User` model now has:
     - `COORDINATOR` role added to the Role enum
     - `department` field for coordinators/staff

## Creating Admin and Coordinator Accounts

### Option 1: Using Database Console (Recommended for first admin)

Access your database and manually set a user's role to `ADMIN` or `COORDINATOR`:

```sql
-- Make a user an admin
UPDATE users SET role = 'ADMIN' WHERE email = 'admin@example.com';

-- Make a user a coordinator and set department
UPDATE users SET role = 'COORDINATOR', department = 'Computer Science' WHERE email = 'coordinator@example.com';
```

### Option 2: Via Sign-up and Manual Update

1. Sign up normally as a student
2. Update the role in the database using the SQL above
3. Sign in using the appropriate login page

## Access Points

### For Students:
- **Sign In**: `/auth/signin`
- Regular access to lost & found, books, and events

### For Coordinators:
- **Sign In**: `/auth/coordinator-signin`
- **Dashboard**: `/coordinator`
- Can create and manage events for their club/department
- Can delete their own events

### For Admins:
- **Sign In**: `/auth/admin-signin`
- **Dashboard**: `/admin`
- Full control over all platform content
- Can delete any items from:
  - Lost items
  - Found items
  - Books marketplace
  - Events

## Features by Role

### Student (STUDENT)
- ✅ Report lost/found items
- ✅ List and request books
- ✅ View events
- ✅ Mark interest in events

### Coordinator (COORDINATOR)
- ✅ All student features
- ✅ Create new events
- ✅ Manage own events
- ✅ Delete own events
- ✅ Access to coordinator dashboard

### Admin (ADMIN)
- ✅ All coordinator features
- ✅ Delete any lost items
- ✅ Delete any found items
- ✅ Delete any book listings
- ✅ Delete any events
- ✅ Access to admin panel
- ✅ Full platform management

## API Routes Created

### Admin Operations (Admin Only)
- `DELETE /api/admin/lost-items/[id]` - Delete lost item
- `DELETE /api/admin/found-items/[id]` - Delete found item
- `DELETE /api/admin/books/[id]` - Delete book listing
- `DELETE /api/admin/events/[id]` - Delete event

### Coordinator Operations (Coordinator + Admin)
- `POST /api/coordinator/events` - Create new event
- `DELETE /api/coordinator/events/[id]` - Delete own event (or any if admin)

### Auth Helper
- `GET /api/auth/verify-role` - Verify current user's role

## Security Notes

1. **All API routes check authentication** - Users must be signed in
2. **Role verification** - Each protected route verifies the user has the required role
3. **Ownership checks** - Coordinators can only delete their own events (unless admin)
4. **Admin access** - Admin role has unrestricted access to all management functions

## Testing the Setup

1. Create a test admin account (use database SQL)
2. Sign in at `/auth/admin-signin`
3. Access admin panel at `/admin`
4. Test deletion of items

For coordinators:
1. Create a test coordinator account
2. Sign in at `/auth/coordinator-signin`
3. Create an event at `/coordinator/create-event`
4. View coordinator dashboard at `/coordinator`

## Troubleshooting

If you get "Access Denied" errors:
1. Verify the user's role in the database
2. Check that you're signing in through the correct page
3. Clear browser cookies and sign in again
4. Verify Prisma client is up to date (`npx prisma generate`)

## Environment Variables

No new environment variables required. The system uses existing:
- `DATABASE_URL` - PostgreSQL connection
- `NEXTAUTH_SECRET` - NextAuth secret
- `NEXTAUTH_URL` - Application URL
