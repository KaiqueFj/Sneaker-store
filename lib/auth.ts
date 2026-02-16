import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createUser, getUser, getUserForAuth } from "../services/users-service";
import authConfig from "./auth-config";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,

  providers: [
    ...authConfig.providers!,

    CredentialsProvider({
      async authorize(credentials) {
        if (
          typeof credentials?.email !== "string" ||
          typeof credentials?.password !== "string"
        ) {
          return null;
        }

        const user = await getUserForAuth(credentials.email);
        if (!user?.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
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
    async signIn({ user, account }) {
      if (typeof user.email !== "string") return false;

      const provider =
        account?.provider === "google"
          ? "google"
          : account?.provider === "github"
            ? "github"
            : "credentials";

      const existingUser = await getUser(user.email);

      if (!existingUser) {
        await createUser({
          email: user.email,
          name: user.name,
          provider,
          password: null,
        });
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user && typeof user.email === "string") {
        const dbUser = await getUser(user.email);
        if (dbUser) token.userId = dbUser.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && typeof token.userId === "string") {
        session.user.userId = token.userId;
      }
      return session;
    },
  },
});
