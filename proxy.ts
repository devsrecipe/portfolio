import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, sessionToken } from "@/lib/auth";

/** Next 16 renamed `middleware.ts` to `proxy.ts`. Optimistic check only: redirect signed-out visitors. */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const signedIn = request.cookies.get(SESSION_COOKIE)?.value === (await sessionToken());

  if (pathname === "/admin/login") {
    return signedIn
      ? NextResponse.redirect(new URL("/admin", request.url))
      : NextResponse.next();
  }
  if (!signedIn) return NextResponse.redirect(new URL("/admin/login", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
