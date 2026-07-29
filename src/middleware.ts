import { NextResponse, type NextRequest } from "next/server";

import {
  hasSessionCookie,
  resolveAuthRedirect,
} from "@/features/auth/lib/route-access";

/**
 * Authentication middleware foundation.
 * Protects app/admin prefixes via mock session cookie.
 * Guest auth pages are not redirected here — GuestRoute handles that client-side
 * so a stale cookie cannot lock users out of /login and /register.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = hasSessionCookie(request.headers.get("cookie"));
  const redirectTo = resolveAuthRedirect(pathname, hasSession);

  if (redirectTo) {
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  const response = NextResponse.next();

  // Placeholder CSRF cookie bootstrap for future API mutations.
  if (!request.cookies.get("azpps_csrf")) {
    response.cookies.set("azpps_csrf", crypto.randomUUID(), {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/app/:path*",
    "/ai-factory/:path*",
    "/content/:path*",
    "/seo/:path*",
    "/analytics/:path*",
    "/admin",
    "/admin/:path*",
  ],
};
