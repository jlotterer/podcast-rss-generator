# Multi-Tenant Podcast Platform Implementation Plan

## Project Vision
Transform the single-user podcast app into a multi-tenant platform where users can:
- Create and manage their own Google Drive-based podcasts
- Create multiple podcasts (via subfolders)
- Invite and manage other users (admin only)
- Customize podcast settings and metadata

---

## Architecture Decision: Database Setup

**Choice: Prisma + Vercel Postgres**
- Production-ready from day one
- Free tier supports your needs
- Type-safe database access
- Easy migrations and schema changes

---

## Database Schema

```prisma
model User {
  id                    String    @id @default(cuid())
  email                 String    @unique
  name                  String?
  role                  String    @default("creator") // admin, creator, listener
  googleDriveFolderId   String?   // User's root Google Drive folder
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt

  podcasts              Podcast[]
  invitations           Invitation[] @relation("InvitedBy")
}

model Podcast {
  id                    String    @id @default(cuid())
  name                  String
  description           String?
  userId                String
  googleDriveFolderId   String    // Subfolder ID for this podcast
  coverImage            String?
  author                String?
  email                 String?
  publicUrl             String?
  isActive              Boolean   @default(true)
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt

  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Invitation {
  id                    String    @id @default(cuid())
  email                 String
  role                  String    @default("creator")
  token                 String    @unique
  invitedBy             String
  acceptedAt            DateTime?
  expiresAt             DateTime
  createdAt             DateTime  @default(now())

  inviter               User      @relation("InvitedBy", fields: [invitedBy], references: [id])
}
```

---

## Implementation Phases

### Phase 1: Database Setup ✓ FOUNDATIONAL
**Goal:** Get Prisma + Postgres working

**Tasks:**
1. ✅ Install Prisma and dependencies
2. ✅ Set up Vercel Postgres database
3. ✅ Create Prisma schema
4. ✅ Run initial migration
5. ✅ Test database connection
6. ✅ Create seed data for testing

**Files to Create/Modify:**
- `prisma/schema.prisma` - Database schema
- `lib/prisma.js` - Prisma client singleton
- `package.json` - Add Prisma dependencies

**Estimated Effort:** 1-2 hours
**Complexity:** Medium

---

### Phase 2: User Migration ✓ CRITICAL
**Goal:** Move user management from env vars to database

**Tasks:**
1. ✅ Migrate existing ADMIN_EMAILS to database
2. ✅ Update NextAuth to use database for roles
3. ✅ Create user profile API endpoints
4. ✅ Add user settings page
5. ✅ Allow users to set their Google Drive folder ID

**Files to Create/Modify:**
- `pages/api/auth/[...nextauth].js` - Update role fetching
- `pages/api/user/profile.js` - User profile CRUD
- `pages/settings.js` - User settings UI
- `lib/auth/roles.js` - Update to query database

**Estimated Effort:** 2-3 hours
**Complexity:** Medium

---

### Phase 3: Podcast Management ⭐ CORE FEATURE
**Goal:** Allow users to create and manage multiple podcasts

**Tasks:**
1. ✅ Create podcast CRUD API endpoints
2. ✅ Build podcast list UI (user dashboard)
3. ✅ Add "Create Podcast" flow
4. ✅ Implement podcast settings editor
5. ✅ Add podcast deletion with confirmation
6. ✅ Support subfolder detection from Google Drive
7. ✅ Display podcasts per user

**Files to Create/Modify:**
- `pages/api/podcasts/index.js` - List/create podcasts
- `pages/api/podcasts/[id].js` - Get/update/delete podcast
- `pages/dashboard.js` - User podcast dashboard
- `pages/podcast/[id]/settings.js` - Podcast settings UI
- `lib/google-drive.js` - Subfolder detection utilities

**Estimated Effort:** 4-6 hours
**Complexity:** High

---

### Phase 4: Dynamic RSS Feeds 🎯 KEY FEATURE
**Goal:** Generate RSS feeds per podcast, not per user

**Tasks:**
1. ✅ Update RSS endpoint to accept podcast ID
2. ✅ Fetch episodes from specific podcast subfolder
3. ✅ Use podcast-specific metadata
4. ✅ Generate unique RSS URLs per podcast
5. ✅ Add RSS feed preview/testing

**Files to Create/Modify:**
- `pages/api/rss/[podcastId].js` - Per-podcast RSS
- `pages/api/episodes/[podcastId].js` - Per-podcast episodes
- Update home page to show podcast selector

**Estimated Effort:** 3-4 hours
**Complexity:** Medium

---

### Phase 5: Admin User Management 👑 ADMIN FEATURE
**Goal:** Admins can invite, manage, and delete users

**Tasks:**
1. ✅ Create invitation system
2. ✅ Email invitation links (or show token)
3. ✅ Invitation acceptance flow
4. ✅ Admin user list with actions
5. ✅ Delete user functionality
6. ✅ Change user roles

**Files to Create/Modify:**
- `pages/api/admin/invitations.js` - Create/list invitations
- `pages/api/admin/users/[id].js` - Update/delete users
- `pages/admin/users.js` - User management UI
- `pages/accept-invitation/[token].js` - Invitation acceptance

**Estimated Effort:** 3-4 hours
**Complexity:** Medium

---

### Phase 6: Enhanced UI/UX 🎨 POLISH
**Goal:** Professional, intuitive interface

**Tasks:**
1. ✅ Podcast card components
2. ✅ Drag-and-drop podcast ordering
3. ✅ Image upload for podcast covers
4. ✅ Podcast analytics (episode count, size)
5. ✅ Search and filter podcasts
6. ✅ Responsive mobile design
7. ✅ Loading states and error handling

**Files to Create/Modify:**
- `components/PodcastCard.js`
- `components/PodcastList.js`
- `pages/dashboard.js` - Enhanced UI
- Add Tailwind customizations

**Estimated Effort:** 4-5 hours
**Complexity:** Medium

---

### Phase 7: Multi-User Google Drive Access 🔐 ADVANCED
**Goal:** Each user authenticates with their own Google account

**Tasks:**
1. ✅ Store user Google OAuth tokens in database
2. ✅ Refresh token management
3. ✅ Per-user Google Drive API access
4. ✅ Remove shared service account (optional)
5. ✅ Handle token expiration gracefully

**Files to Create/Modify:**
- Update `pages/api/auth/[...nextauth].js` - Store tokens
- `lib/google-drive.js` - Per-user Drive access
- Add token refresh logic

**Estimated Effort:** 3-4 hours
**Complexity:** High

---

### Phase 8: Production Deployment 🚀 LAUNCH
**Goal:** Deploy to Vercel with all features working

**Tasks:**
1. ✅ Set up Vercel Postgres in production
2. ✅ Run production migrations
3. ✅ Configure environment variables
4. ✅ Test OAuth in production
5. ✅ Set up monitoring/logging
6. ✅ Create backup strategy
7. ✅ Document deployment process

**Estimated Effort:** 2-3 hours
**Complexity:** Medium

---

## Total Estimated Timeline
**22-30 hours of development work**
- Can be done incrementally over several sessions
- Each phase is independently testable
- Early phases provide immediate value

---

## Dependencies Between Phases

```
Phase 1 (Database)
    ↓
Phase 2 (Users) → Phase 5 (Admin)
    ↓
Phase 3 (Podcasts) → Phase 4 (RSS) → Phase 6 (UI)
    ↓
Phase 7 (OAuth) → Phase 8 (Deploy)
```

---

## Current Status

**Completed:**
- ✅ Basic authentication with Google OAuth
- ✅ Role-based access control (env vars)
- ✅ Single podcast RSS feed
- ✅ Admin dashboard skeleton

**Next Steps:**
1. Start Phase 1: Database Setup
2. Install Prisma and create schema
3. Set up Vercel Postgres
4. Run first migration

---

## Technology Stack

**Core:**
- Next.js 14
- React 18
- NextAuth.js (authentication)
- Prisma (ORM)
- Vercel Postgres (database)

**UI:**
- Tailwind CSS
- Lucide Icons
- Headless UI (for modals, dropdowns)

**APIs:**
- Google Drive API
- Google OAuth

---

## Environment Variables (Updated)

```env
# Database
DATABASE_URL=postgres://...

# Authentication (existing)
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Google Service Account (legacy - may be deprecated)
GOOGLE_PRIVATE_KEY=
GOOGLE_CLIENT_EMAIL=

# Admin Bootstrap (only for initial setup)
ADMIN_EMAILS=jlotterer@gmail.com
```

---

## Migration Strategy

**From Current Setup to Multi-Tenant:**

1. **Keep existing functionality working** during migration
2. **Dual-mode operation**: Support both env vars and database initially
3. **Gradual rollout**: Enable new features for specific users first
4. **Data migration**: Script to move existing data to database
5. **Deprecation**: Remove env var support after full migration

---

## Success Metrics

**Phase 1-2:** User can sign in and see their profile
**Phase 3-4:** User can create a podcast and get RSS feed
**Phase 5:** Admin can invite new users
**Phase 6:** UI is intuitive and professional
**Phase 7:** Each user accesses their own Google Drive
**Phase 8:** Platform is live and stable

---

## Questions to Resolve

1. **Email Service:** How to send invitation emails?
   - Option A: Email API (SendGrid, Resend)
   - Option B: Show invitation link for manual sharing
   - **Recommendation:** Start with Option B, add Option A later

2. **Image Upload:** Where to store podcast cover images?
   - Option A: Google Drive
   - Option B: Vercel Blob Storage
   - Option C: Cloudinary
   - **Recommendation:** Option B (Vercel Blob) for simplicity

3. **Subfolder Detection:** How to scan Google Drive?
   - Option A: Manual folder ID entry
   - Option B: Automatic subfolder detection
   - **Recommendation:** Start with A, add B in Phase 3

4. **Access Control:** Can creators see other users' podcasts?
   - **Decision:** No, each user only sees their own podcasts
   - **Exception:** Admins can see all podcasts

---

## Next Action: Phase 1 Implementation

Ready to start? Let me know and I'll begin with Phase 1: Database Setup!
