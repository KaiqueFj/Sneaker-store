import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      email?: string;
      name?: string;
    };
  }

  interface User {
    userId: string;
  }
}
