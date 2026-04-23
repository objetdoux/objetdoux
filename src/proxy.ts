import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function hasSupabaseAuthCookie(request: NextRequest) {
  return request.cookies
    .getAll()
    .some((cookie) => cookie.name.startsWith("sb-"));
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAdminLogin = pathname === "/admin/login";
  const hasAuthCookie = hasSupabaseAuthCookie(request);

  if (!isAdminLogin && !hasAuthCookie) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
