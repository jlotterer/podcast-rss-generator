import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '../../../lib/prisma';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.readonly',
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Upsert user in database on sign-in
        const dbUser = await upsertUser({
          email: user.email,
          name: user.name,
          googleAccessToken: account.access_token,
          googleRefreshToken: account.refresh_token,
          googleTokenExpiry: account.expires_at ? new Date(account.expires_at * 1000) : null,
        });

        // Store database user ID for later use
        user.dbId = dbUser.id;
        user.role = dbUser.role;
        user.googleDriveFolderId = dbUser.googleDriveFolderId;

        return true;
      } catch (error) {
        console.error('Error during sign-in:', error);
        return false;
      }
    },
    async jwt({ token, account, user }) {
      // On initial sign-in, add user data to token
      if (user) {
        token.userId = user.dbId;
        token.role = user.role;
        token.googleDriveFolderId = user.googleDriveFolderId;
      }

      // Persist the OAuth tokens
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }

      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      session.user.id = token.userId;
      session.user.role = token.role;
      session.user.googleDriveFolderId = token.googleDriveFolderId;

      // Fetch fresh tokens from database to ensure they're up to date
      if (token.userId) {
        try {
          const user = await prisma.user.findUnique({
            where: { id: token.userId },
            select: {
              googleAccessToken: true,
              googleRefreshToken: true,
            },
          });

          if (user) {
            session.user.googleAccessToken = user.googleAccessToken;
            session.user.googleRefreshToken = user.googleRefreshToken;
          }
        } catch (error) {
          console.error('Error fetching user tokens:', error);
          // Fall back to tokens from JWT if database fetch fails
          session.user.googleAccessToken = token.accessToken;
          session.user.googleRefreshToken = token.refreshToken;
        }
      }

      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
};

export default NextAuth(authOptions);

// Upsert user in database
async function upsertUser({ email, name, googleAccessToken, googleRefreshToken, googleTokenExpiry }) {
  // Determine role for new users (check env vars for bootstrapping)
  const defaultRole = getDefaultRole(email);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      name,
      googleAccessToken,
      googleRefreshToken,
      googleTokenExpiry,
      lastAccessedAt: new Date(),
      updatedAt: new Date(),
    },
    create: {
      email,
      name,
      role: defaultRole,
      googleAccessToken,
      googleRefreshToken,
      googleTokenExpiry,
      lastAccessedAt: new Date(),
    },
  });

  return user;
}

// Get default role for new users (uses env vars for bootstrapping admins only)
function getDefaultRole(email) {
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || [];

  if (adminEmails.includes(email)) {
    return 'admin';
  }

  // Default role for all new users is creator
  return 'creator';
}
