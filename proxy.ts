import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

const PUBLIC_ADMIN_PATHS = [
  "/admin/login",
  "/admin/forgot-password",
  "/admin/reset-password",
];

/**
 * Next 16 renamed `middleware.ts` to `proxy.ts`. Optimistic check of the signed
 * session cookie only; pages and actions re-check against the database.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const signedIn = Boolean(
    await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value),
  );

  if (PUBLIC_ADMIN_PATHS.includes(pathname)) {
    return signedIn && pathname === "/admin/login"
      ? NextResponse.redirect(new URL("/admin", request.url))
      : NextResponse.next();
  }
  if (!signedIn) return NextResponse.redirect(new URL("/admin/login", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
