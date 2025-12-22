# Quick Start Guide - Authentication Setup

## 🚀 Three Steps to Get Running

### Step 1: Generate NextAuth Secret (1 minute)

```bash
openssl rand -base64 32
```

Copy the output, open `.env.local`, and replace:
```env
NEXTAUTH_SECRET=YOUR_NEXTAUTH_SECRET_HERE_GENERATE_WITH_openssl_rand_base64_32
```

With:
```env
NEXTAUTH_SECRET=<paste_the_output_here>
```

---

### Step 2: Get Google OAuth Client Secret (2 minutes)

1. Open [Google Cloud Console](https://console.cloud.google.com/)
2. Click on "podcast-rss-generator-01" project
3. Go to: **APIs & Services** → **Credentials**
4. Find the OAuth 2.0 Client ID with ID: `107419371031353431699`
5. Click on it
6. Copy the **Client Secret**
7. Open `.env.local` and replace:
   ```env
   GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET_HERE
   ```
   With:
   ```env
   GOOGLE_CLIENT_SECRET=<paste_the_secret_here>
   ```

---

### Step 3: Configure OAuth Redirect URLs (2 minutes)

Still in the same OAuth client page in Google Cloud Console:

**Add these URLs:**

Under **Authorized JavaScript origins:**
- `http://localhost:3001`
- `https://podcast-rss-generator-hazel.vercel.app`

Under **Authorized redirect URIs:**
- `http://localhost:3001/api/auth/callback/google`
- `https://podcast-rss-generator-hazel.vercel.app/api/auth/callback/google`

Click **Save**

---

## ✅ Test It!

```bash
npm run dev
```

1. Open `http://localhost:3001`
2. Click "Sign in with Google"
3. Authorize with your Google account
4. You should see the podcast homepage with your user info in the top right
5. Click "Admin" button to access the admin dashboard

---

## 📋 Your Credentials Checklist

In your `.env.local` file, you should now have:

```env
# ✅ Already configured (don't change)
GOOGLE_CLIENT_ID=107419371031353431699
ADMIN_EMAILS=jlotterer@gmail.com

# ⚠️ YOU MUST SET THESE:
NEXTAUTH_SECRET=<32-character random string from Step 1>
GOOGLE_CLIENT_SECRET=<client secret from Google Cloud Console>

# ✅ Already set for local development:
NEXTAUTH_URL=http://localhost:3001

# Optional - add more users:
CREATOR_EMAILS=creator@example.com,another@example.com
```

---

## 🎯 What You Can Do Now

### As Admin (jlotterer@gmail.com):
✅ Access the admin dashboard at `/admin`
✅ View user roles and permissions
✅ View and listen to all podcast episodes
✅ Full system access

### As Other Authenticated Users:
✅ View podcast episodes
✅ Listen to audio content
✅ Access RSS feed
❌ Cannot access admin dashboard

---

## 🚢 Deploy to Production

### In Vercel Project Settings, add these environment variables:

```env
NEXTAUTH_URL=https://podcast-rss-generator-hazel.vercel.app
NEXTAUTH_SECRET=<same secret from local .env.local>
GOOGLE_CLIENT_SECRET=<same secret from local .env.local>
ADMIN_EMAILS=jlotterer@gmail.com
CREATOR_EMAILS=
```

Then redeploy your app!

---

## 🆘 Common Issues

**❌ "Configuration error"**
→ Missing `NEXTAUTH_SECRET` in `.env.local`

**❌ "Access denied"**
→ Check Google OAuth redirect URLs are configured

**❌ "Can't access admin dashboard"**
→ Make sure your email is in `ADMIN_EMAILS`

**❌ Changes not working**
→ Restart the dev server: `Ctrl+C` then `npm run dev`

---

## 📚 Need More Details?

See [AUTHENTICATION_SETUP.md](AUTHENTICATION_SETUP.md) for comprehensive documentation.

See [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) for technical details about what was implemented.

---

## 🎉 That's It!

You now have a fully authenticated podcast application with role-based access control!
