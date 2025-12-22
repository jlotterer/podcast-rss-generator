# Authentication Setup Guide

This guide explains how to complete the setup of Google OAuth authentication for your podcast application.

## Overview

Your application now has:
- ✅ NextAuth.js installed and configured
- ✅ Google OAuth provider setup
- ✅ Role-based access control (Admin, Creator, Listener)
- ✅ Protected API routes
- ✅ Admin dashboard for user management
- ✅ Authentication UI components

## Required Setup Steps

### 1. Generate NextAuth Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Copy the output and update your `.env.local` file:

```env
NEXTAUTH_SECRET=<paste_the_generated_secret_here>
```

### 2. Get Google OAuth Client Secret

You need to obtain the OAuth client secret from Google Cloud Console:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: `podcast-rss-generator-01`
3. Navigate to **APIs & Services** > **Credentials**
4. Find your OAuth 2.0 Client ID (the one matching `GOOGLE_CLIENT_ID=107419371031353431699`)
5. Click on it to view details
6. Copy the **Client Secret**
7. Update your `.env.local` file:

```env
GOOGLE_CLIENT_SECRET=<paste_your_client_secret_here>
```

### 3. Configure OAuth Redirect URLs

In the same OAuth client configuration in Google Cloud Console:

1. Under **Authorized JavaScript origins**, add:
   - `http://localhost:3001` (for local development)
   - Your production URL (e.g., `https://podcast-rss-generator-hazel.vercel.app`)

2. Under **Authorized redirect URIs**, add:
   - `http://localhost:3001/api/auth/callback/google` (for local development)
   - `https://your-production-url.vercel.app/api/auth/callback/google` (for production)

3. Click **Save**

### 4. Update Production Environment Variables

For Vercel deployment, add these environment variables in your Vercel project settings:

```env
NEXTAUTH_URL=https://podcast-rss-generator-hazel.vercel.app
NEXTAUTH_SECRET=<same_secret_from_step_1>
GOOGLE_CLIENT_SECRET=<same_secret_from_step_2>
ADMIN_EMAILS=jlotterer@gmail.com
CREATOR_EMAILS=
```

## User Role Configuration

### Current Configuration

Your `.env.local` file has:

```env
ADMIN_EMAILS=jlotterer@gmail.com
CREATOR_EMAILS=
```

### How to Add Users

**Add more administrators:**
```env
ADMIN_EMAILS=jlotterer@gmail.com,another-admin@example.com
```

**Add creators:**
```env
CREATOR_EMAILS=creator1@example.com,creator2@example.com
```

**Role Permissions:**

| Role | Permissions |
|------|------------|
| **Admin** | Full access: manage users, settings, upload episodes, view all content |
| **Creator** | Can upload and publish podcast episodes, edit own episodes |
| **Listener** | Can view and listen to podcast content (default for all authenticated users) |

## Features Implemented

### 1. Authentication Pages

- **Sign In**: `/auth/signin` - Google OAuth login page
- **Error**: `/auth/error` - Authentication error handling

### 2. Protected Routes

All content now requires authentication:
- Home page (`/`) - Requires sign-in
- Episodes API (`/api/episodes`) - Requires authentication
- Play API (`/api/play`) - Requires authentication
- RSS Feed (`/api/rss`) - Public (needed for podcast apps)

### 3. Admin Dashboard

- **URL**: `/admin`
- **Access**: Admins only
- **Features**:
  - View all users and their roles
  - Configuration guide
  - Role permission reference

### 4. API Routes

**Public:**
- `GET /api/rss` - RSS feed (public for podcast apps)

**Authenticated:**
- `GET /api/episodes` - List all episodes
- `GET /api/play?fileId=xxx` - Stream audio

**Admin Only:**
- `GET /api/admin/users` - List users
- `POST /api/admin/users` - Update user roles

## Testing the Setup

### 1. Start the Development Server

```bash
npm run dev
```

### 2. Test Authentication Flow

1. Visit `http://localhost:3001`
2. You should be redirected to the sign-in page
3. Click "Sign in with Google"
4. Authorize with your Google account
5. You should be redirected back to the home page

### 3. Test Admin Access

1. Sign in with the email configured in `ADMIN_EMAILS`
2. You should see an "Admin" button in the header
3. Click it to access the admin dashboard at `/admin`

### 4. Test Role-Based Access

**As Admin:**
- Can access `/admin`
- Can view episodes and play audio
- Can manage users (view current configuration)

**As Creator:**
- Cannot access `/admin`
- Can view episodes and play audio

**As Listener (any other authenticated user):**
- Cannot access `/admin`
- Can view episodes and play audio

## File Structure

```
podcast-publisher/
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth].js    # NextAuth configuration
│   │   ├── admin/
│   │   │   └── users.js            # Admin user management API
│   │   ├── episodes.js             # Protected episodes API
│   │   ├── play.js                 # Protected audio streaming API
│   │   └── rss.js                  # Public RSS feed
│   ├── auth/
│   │   ├── signin.js               # Sign-in page
│   │   └── error.js                # Error page
│   ├── admin/
│   │   └── index.js                # Admin dashboard
│   ├── index.js                    # Home page (protected)
│   └── _app.js                     # App wrapper with SessionProvider
├── components/
│   ├── AuthHeader.js               # Authentication header component
│   └── ProtectedPage.js            # Page protection wrapper
├── lib/
│   └── auth/
│       ├── roles.js                # Role definitions and utilities
│       └── middleware.js           # API route protection middleware
└── .env.local                      # Environment variables (UPDATE THIS!)
```

## Common Issues and Troubleshooting

### Issue: "Configuration" error when signing in

**Solution:** Make sure `NEXTAUTH_SECRET` is set in `.env.local`

### Issue: "AccessDenied" error

**Solution:** Check that your Google OAuth client is configured correctly and the redirect URLs match

### Issue: Can't access admin dashboard

**Solution:** Verify your email is listed in `ADMIN_EMAILS` environment variable

### Issue: "Unauthorized" when fetching episodes

**Solution:** Make sure you're signed in. Check the browser console for auth errors.

### Issue: Environment variables not updating

**Solution:** Restart the development server after changing `.env.local`

```bash
# Stop the server (Ctrl+C)
npm run dev
```

## Security Notes

1. **Never commit** `.env.local` to version control (it's in `.gitignore`)
2. **Keep secrets secure** - Don't share `NEXTAUTH_SECRET` or `GOOGLE_CLIENT_SECRET`
3. **Use environment variables** for all production deployments
4. **Rotate secrets** periodically for production environments

## Future Enhancements

Consider implementing these features for production:

1. **Database Integration**: Replace environment variable user management with a proper database (PostgreSQL, MongoDB, etc.)
2. **User Invitation System**: Allow admins to invite users via email
3. **Audit Logging**: Track user actions for security
4. **Rate Limiting**: Protect API endpoints from abuse
5. **Email Verification**: Verify user emails before granting access
6. **Two-Factor Authentication**: Add 2FA for admin accounts

## Middleware Usage Examples

### Protect an API route with authentication:

```javascript
import { withAuth } from '../../lib/auth/middleware';

async function handler(req, res) {
  // User is authenticated, accessible via req.user
  return res.json({ user: req.user });
}

export default withAuth(handler);
```

### Protect an API route for admins only:

```javascript
import { withAdmin } from '../../lib/auth/middleware';

async function handler(req, res) {
  // Only admins can access this
  return res.json({ message: 'Admin only content' });
}

export default withAdmin(handler);
```

### Protect an API route for creators and admins:

```javascript
import { withCreator } from '../../lib/auth/middleware';

async function handler(req, res) {
  // Creators and admins can access this
  return res.json({ message: 'Creator content' });
}

export default withCreator(handler);
```

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check the server console for errors
3. Verify all environment variables are set correctly
4. Ensure Google OAuth client is configured properly
5. Restart the development server

## Next Steps

1. ✅ Complete steps 1-4 above to finish the setup
2. ✅ Test authentication locally
3. ✅ Deploy to Vercel with environment variables
4. ✅ Test in production
5. Consider implementing a database for user management (optional)
