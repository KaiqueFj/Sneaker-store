import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createUser, getUser } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },

    async signIn({ user }) {
      console.log("SignIn callback user:", user);
      try {
        const existingUser = await getUser(user.email);
        console.log("existingUser:", existingUser);

        if (!existingUser) {
          await createUser({ email: user.email, name: user.name });
          console.log("Created new user:", user.email);
        }

        return true; // IMPORTANT: must return true
      } catch (err) {
        console.error("signIn error:", err);
        return false; // triggers AccessDenied
      }
    },

    async session({ session }) {
      const user = await getUser(session.user.email);

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
