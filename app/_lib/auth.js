import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createUser, getUser } from "./data-service";
import CredentialsProvider from "next-auth/providers/credentials";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const user = await getUser(credentials.email);

        if (!user || user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      console.log("authorized:", auth);
      return !!auth?.user;
    },

    async signIn({ user }) {
      console.log(user);
      try {
        console.log("SESSION RECEIVED:", session);

        const existingUser = await getUser(user.email);

        if (!existingUser) {
          await createUser({ email: user.email, name: user.name });
        }

        return true;
      } catch (err) {
        console.error("signIn error:", err);
        return false;
      }
    },

    async session({ session }) {
      console.log(session);

      const user = await getUser(session.user.email);

      console.log("session user:", user);

      session.user.userId = user.id;
      return {
        ...session,
        user: {
          ...session.user,
          userId: user.id,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
