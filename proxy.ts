// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "./lib/auth-edge";

export async function proxy(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*"],
};
