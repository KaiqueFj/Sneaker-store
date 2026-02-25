import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

import { createUserService, getUserForAuthService, getUserServiceByEmail } from '@/services/users-service';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  trustHost: true,
  session: { strategy: 'jwt' },

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    CredentialsProvider({
      async authorize(credentials) {
        if (typeof credentials?.email !== 'string' || typeof credentials?.password !== 'string') {
          return null;
        }

        const user = await getUserForAuthService(credentials.email);
        if (!user?.password) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (typeof user.email !== 'string') return false;

      const provider =
        account?.provider === 'google' ? 'google' : account?.provider === 'github' ? 'github' : 'credentials';

      const existingUser = await getUserServiceByEmail(user.email);
      console.log(existingUser);

      if (!existingUser) {
        await createUserService({
          email: user.email,
          name: user.name,
          provider,
          password: null,
        });
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user && typeof user.email === 'string') {
        const dbUser = await getUserServiceByEmail(user.email);
        if (dbUser) token.userId = dbUser.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && typeof token.userId === 'string') {
        session.user.userId = token.userId;
      }
      return session;
    },
  },
});
