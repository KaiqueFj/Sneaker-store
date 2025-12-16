// app/_lib/auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { createUser, getUser } from "./data-service";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),

    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await getUser(credentials.email);
        if (!user?.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
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
    async signIn({ user }) {
      const existingUser = await getUser(user.email);
      if (!existingUser) {
        await createUser({ email: user.email, name: user.name });
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) token.userId = user.id;
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.userId = token.userId;
      }
      return session;
    },
  },

  session: { strategy: "jwt" },
});
