import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  if (!req.auth?.user) {
    const callbackUrl = encodeURIComponent(req.nextUrl.href);
    return NextResponse.redirect(
      new URL(`/api/signin?callbackUrl=${callbackUrl}`, req.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/editor/:path*"],
};