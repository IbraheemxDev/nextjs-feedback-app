import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// fixed: removed `export { default } from "next-auth/middleware"` —
// having both that AND a custom `middleware` function conflicted with
// each other. We only need our own custom middleware below.

// Middleware to protect routes and handle authentication-based redirects
export async function middleware(request: NextRequest) {
  // Retrieve the user's JWT token
  const token = await getToken({ req: request });

  // Get the current request URL
  const url = request.nextUrl;

  // fixed: exact match on "/" instead of startsWith("/"), which matched
  // EVERY route (including "/dashboard" itself) and caused an infinite
  // redirect loop for logged-in users
  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify") ||
      url.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // added: protect /dashboard from unauthenticated users
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

// Define the routes where this middleware should run
export const config = {
  matcher: ["/sign-in", "/sign-up", "/", "/dashboard/:path*", "/verify/:path*"],
};