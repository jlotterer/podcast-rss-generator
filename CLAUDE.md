# CLAUDE.md - Project Context for AI Assistants

## Project Overview

**Poddio** is an automated podcast RSS generator with Google Drive integration. It enables users to create and publish podcasts by simply uploading audio files to Google Drive folders. The platform features a modern web interface built with Next.js and integrates deeply with Google Drive for seamless content management.

### Key Differentiator
The NotebookLM integration is the killer feature - users can convert AI-generated audio from Google's NotebookLM directly into podcast feeds, creating a unique workflow for research digests, learning series, and educational content.

## Technology Stack

### Core Technologies
- **Framework**: Next.js 14 (Pages Router)
- **Language**: JavaScript (React)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth
- **Styling**: Tailwind CSS with shadcn/ui components
- **UI Components**: Radix UI primitives

### Key Dependencies
- `googleapis` - Google Drive API integration
- `@prisma/client` - Database ORM
- `next-auth` - Authentication
- `lucide-react` - Icon library
- `tailwindcss-animate` - Animation utilities

### Development Setup
```bash
npm run dev          # Start development server on port 3001
npm run build        # Build for production (includes Prisma generate)
npm run start        # Start production server
npx prisma generate  # Generate Prisma client
npx prisma migrate   # Run database migrations
```

## Project Structure

```
podcast-publisher/
├── pages/                    # Next.js pages (Pages Router)
│   ├── api/                 # API routes
│   │   ├── auth/            # NextAuth endpoints
│   │   ├── admin/           # Admin panel APIs
│   │   ├── podcasts/        # Podcast CRUD operations
│   │   ├── drive/           # Google Drive integration
│   │   └── rss/             # RSS feed generation
│   ├── podcasts/            # Podcast management pages
│   ├── admin/               # Admin panel
│   ├── auth/                # Authentication pages
│   ├── index.js             # Landing page
│   ├── guides.js            # User guides collection
│   ├── notebooklm-guide.js  # Comprehensive NotebookLM guide
│   ├── pricing.js           # Pricing page
│   └── settings.js          # User settings
├── components/              # React components
│   ├── PageLayout.js        # Consistent header/layout wrapper
│   ├── AuthHeader.js        # Navigation for authenticated users
│   └── (shadcn/ui components)
├── lib/                     # Utility functions
├── prisma/                  # Database schema and migrations
├── public/                  # Static assets
├── styles/                  # Global styles
└── scripts/                 # Utility scripts
```

## Database Schema

### User Model
- Multi-tenant support with role-based access (admin, creator, listener)
- Stores Google OAuth tokens for Drive access
- Tracks user activity via `lastAccessedAt`

### Podcast Model
- Each podcast linked to a Google Drive folder
- Supports metadata: name, description, cover image, author, email
- Active/inactive status for soft deletion
- Cascade delete when user is removed

### Invitation Model
- Token-based user invitation system
- Expires after set duration
- Tracks who invited whom

## Key Features

### Current Implementation
1. **Google Drive Integration**
   - Auto-detects audio files in Drive folders
   - Generates RSS feeds from folder contents
   - Supports cover image selection from Drive

2. **Multi-User Support**
   - User authentication via Google OAuth
   - Each user can create multiple podcasts
   - Admin panel for user management

3. **Podcast Management**
   - Create, edit, delete podcasts
   - Configure podcast metadata
   - RSS feed generation
   - Public podcast URLs

4. **Modern UI/UX** *(Recently Updated)*
   - Consistent PageLayout component across all authenticated pages
   - Unified header with logo + icon-based navigation
   - Responsive design optimized for desktop and mobile
   - Icon-only buttons for better mobile experience
   - AuthHeader component with guides access, settings, and profile dropdown
   - Clean, professional interface with consistent spacing

### NotebookLM Workflow (Killer Feature)
1. Create audio in NotebookLM
2. Download generated audio files
3. Upload to designated Google Drive folder
4. Poddio auto-generates RSS feed
5. Publish to podcast platforms

## Authentication & Security

### OAuth Flow
- Google OAuth 2.0 via NextAuth.js
- Scopes: `userinfo.email`, `userinfo.profile`, `drive.readonly`
- Stores refresh tokens for persistent Drive access
- Token refresh handled automatically

### Environment Variables Required
```
DATABASE_URL=              # PostgreSQL connection string
NEXTAUTH_URL=              # Your deployment URL
NEXTAUTH_SECRET=           # Random secret for JWT signing
GOOGLE_CLIENT_ID=          # Google OAuth client ID
GOOGLE_CLIENT_SECRET=      # Google OAuth client secret
```

## API Routes

### Public Routes
- `GET /api/rss/[podcastId]` - RSS feed XML

### Authenticated Routes
- `GET /api/podcasts` - List user's podcasts
- `POST /api/podcasts` - Create new podcast
- `GET /api/podcasts/[id]` - Get podcast details
- `PUT /api/podcasts/[id]` - Update podcast
- `DELETE /api/podcasts/[id]` - Delete podcast
- `GET /api/podcasts/[id]/episodes` - List episodes
- `GET /api/drive/folders` - List Drive folders
- `GET /api/drive/images/[folderId]` - List images in folder

### Admin Routes (Role: admin)
- `GET /api/admin/users` - List all users
- `GET /api/admin/podcasts` - List all podcasts

## Important Implementation Notes

### Google Drive Integration
- Files are accessed via Google Drive API using user's OAuth token
- Audio files are streamed through `/api/podcasts/[id]/play`
- Cover images are proxied through `/api/drive/image/[fileId]`
- Only audio files (.mp3, .m4a, .wav) should be counted as episodes

### RSS Feed Generation
- Generated dynamically from Drive folder contents
- Follows iTunes podcast RSS specification
- Includes podcast metadata and episode list
- Public URL format: `https://yourdomain.com/api/rss/[podcastId]`

### UI Components & Layout
- **PageLayout Component**: Wraps all authenticated pages with consistent header
  - Logo (clickable, links to /podcasts)
  - AuthHeader with icon navigation (Podcasts, Guides, Settings, Profile)
  - Consistent max-width (`max-w-7xl` default, customizable per page)
  - White background header, gray-50 content area
- **AuthHeader Component**: Icon-based navigation for authenticated users
  - Podcasts icon (link to /podcasts)
  - Create button (when onCreateClick prop provided)
  - Guides icon (link to /guides)
  - Settings icon (link to /settings)
  - User avatar with dropdown (profile info, guides, settings, admin, sign out)
- **Mobile-First Design**: Icon-only buttons with tooltips for better mobile UX
- Uses shadcn/ui component library and Radix UI primitives

## Known Issues & TODOs

See [IDEAS.md](IDEAS.md) for comprehensive backlog.

## Recent Updates (Dec 2024)

### UI/UX Consistency Improvements
- **Unified Header System**: All authenticated pages now use consistent PageLayout component
- **Removed Subtitles**: Eliminated tall headers with title/subtitle below logo for cleaner, more compact design
- **Icon Navigation**: Standardized to icon-only buttons with tooltips for better mobile experience
- **Browse Buttons**: Changed "Browse Drive" and "Browse Folders" buttons to compact 40x40px icons
- **Page Alignment**: All pages now use consistent max-width and spacing

### Content & Guides
- **NotebookLM Guide**: Added comprehensive `/notebooklm-guide` page with:
  - 6 podcast types with specific guidance (Research Digests, Industry News, Educational, Technical, Business, Personal)
  - Prompting strategies with 4 detailed examples
  - Optimal content length guidance (5k-15k words sweet spot)
  - Complete Poddio integration workflow
- **Navigation Access**: Guides accessible from both icon navigation and user dropdown menu

### Input Field Fixes
- Fixed dark gray input fields appearing in edit forms
- All input fields now explicitly use `bg-white` and `text-gray-900` for consistent appearance

## Development Guidelines

### Code Style
- Use functional React components with hooks
- Follow Next.js conventions (Pages Router)
- Use Tailwind CSS for styling
- Leverage shadcn/ui components when possible
- Keep API routes focused and RESTful

### Database Changes
1. Update `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name description`
3. Run `npx prisma generate`
4. Update API routes and components as needed

### Adding New Features
1. Consider if it fits the core value proposition (easy podcast publishing)
2. Check if it enhances the NotebookLM workflow
3. Ensure it works within Google Drive integration
4. Update this CLAUDE.md with significant changes

### Security Considerations
- Never expose Google OAuth tokens in client-side code
- Validate user ownership before allowing podcast modifications
- Use Prisma's parameterized queries to prevent SQL injection
- Implement rate limiting for public RSS feeds if needed

## Marketing & SEO Focus

### Target Keywords
- "NotebookLM podcast"
- "AI podcast generator"
- "Google Drive podcast hosting"
- "Automated podcast RSS"

### Content Strategy
- NotebookLM integration tutorials (high priority)
- YouTube to podcast conversion guides
- Traditional podcast publishing workflows
- Video walkthroughs for each use case

### Unique Selling Propositions
1. Seamless NotebookLM to podcast workflow
2. Zero manual RSS editing required
3. Google Drive native integration
4. Simple, modern interface
5. Multi-podcast management for creators

## Deployment

### Platform
- Currently configured for Vercel deployment
- Requires PostgreSQL database (Vercel Postgres, Supabase, etc.)
- Environment variables must be set in deployment platform

### Build Process
```bash
npm run build  # Includes prisma generate step
```

### Post-Deployment Checklist
1. Run database migrations
2. Verify Google OAuth callback URLs
3. Test RSS feed generation
4. Verify Drive API access
5. Check admin panel access

## Contact & Resources

- **Documentation**: See `/guides` page for user-facing guides
- **Implementation Plans**: See `IMPLEMENTATION_PLAN.md` and `IDEAS.md`
- **Phase Completions**: Multiple `PHASE_*_COMPLETION.md` files document development history

## Working with Claude

### Best Practices
- Reference file paths like [pages/index.js](pages/index.js) or [prisma/schema.prisma:14](prisma/schema.prisma#L14)
- Check [IDEAS.md](IDEAS.md) before proposing new features
- Consider NotebookLM workflow impact for all changes
- Maintain consistent UI/UX with existing shadcn components
- Test Google Drive integration thoroughly after API changes

### Common Tasks
- **Add new authenticated page**: Create in `pages/`, wrap with `<PageLayout>` component
- **New API endpoint**: Add to `pages/api/`, use NextAuth for auth
- **Database changes**: Update schema, migrate, regenerate client
- **UI components**: Use shadcn/ui CLI or copy from existing components
- **Google Drive operations**: See existing `drive` API routes for patterns
- **Add navigation**: Update `AuthHeader.js` for icon navigation or dropdown links

### UI/UX Guidelines
- **All authenticated pages** must use `PageLayout` component for consistency
- **No title/subtitle props** on PageLayout - add page titles in content area instead
- **Icon-only buttons** for actions that need to work well on mobile
- **Tooltips** (via `title` attribute) required for all icon-only buttons
- **Input fields** must explicitly set `bg-white` and `text-gray-900` to avoid dark mode issues
- **Max-width**: Use `max-w-7xl` for list pages, `max-w-4xl` for forms, `max-w-6xl` for detail pages

---

**Last Updated**: 2024-12-29
**Project Status**: Active development, focusing on UI consistency, content marketing, and NotebookLM integration guides
