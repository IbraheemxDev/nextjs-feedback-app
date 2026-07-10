import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Middleware to protect routes and handle authentication-based redirects
export async function middleware(request: NextRequest) {
  // Retrieve the user's JWT token
  const token = await getToken({ req: request });

  // Get the current request URL
  const url = request.nextUrl;

  // fixed: removed `url.pathname === "/"` from this condition — logged-in
  // users can now visit the home page (e.g. via the Footer's Home link)
  // instead of being bounced straight back to /dashboard
  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // protect /dashboard from unauthenticated users
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

// Define the routes where this middleware should run
export const config = {
  matcher: ["/sign-in", "/sign-up", "/", "/dashboard/:path*", "/verify/:path*"],
};