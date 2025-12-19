import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

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
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token and refresh_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }

      // Add user role to token on first sign in
      if (user) {
        token.role = await getUserRole(user.email);
        token.userId = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user role
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user.role = token.role;
      session.user.id = token.userId;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
};

export default NextAuth(authOptions);

// User role management
// In production, this should query a database
async function getUserRole(email) {
  // Define authorized users and their roles
  const authorizedUsers = {
    // Add your admin emails here
    // 'admin@example.com': 'admin',
    // 'creator@example.com': 'creator',
  };

  // Check environment variable for additional admin emails
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || [];
  const creatorEmails = process.env.CREATOR_EMAILS?.split(',').map(e => e.trim()) || [];

  if (adminEmails.includes(email) || authorizedUsers[email] === 'admin') {
    return 'admin';
  }

  if (creatorEmails.includes(email) || authorizedUsers[email] === 'creator') {
    return 'creator';
  }

  // Default role for authenticated users (read-only listener)
  return 'listener';
}
