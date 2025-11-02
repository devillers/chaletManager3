import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPrefixes = ["/tenant", "/owner", "/admin", "/api/tenant", "/api/owner", "/api/admin"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (isProtected && !token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/fr/signin", request.url));
  }

  if (token) {
    const role = token.role;
    const forbidden =
      (pathname.startsWith("/tenant") && role !== "tenant") ||
      (pathname.startsWith("/owner") && role !== "owner") ||
      (pathname.startsWith("/admin") && role !== "admin");
    if (forbidden) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      return NextResponse.redirect(new URL(`/${role}`, request.url));
    }
    if ((pathname.endsWith("/signin") || pathname.endsWith("/signup")) && role) {
      return NextResponse.redirect(new URL(`/${role}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/tenant/:path*",
    "/owner/:path*",
    "/admin/:path*",
    "/api/tenant/:path*",
    "/api/owner/:path*",
    "/api/admin/:path*",
    "/fr/signin",
    "/fr/signup",
    "/en/signin",
    "/en/signup",
  ],
};
