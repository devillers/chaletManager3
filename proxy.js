import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Routes protégées par rôle
const PROTECTED_PREFIXES = [
  "/tenant",
  "/owner",
  "/admin",
  "/api/tenant",
  "/api/owner",
  "/api/admin",
];

// Pages d'auth publiques
const AUTH_PAGES = ["/fr/signin", "/fr/signup", "/en/signin", "/en/signup"];

export default async function proxy(request) {
  const url = request.nextUrl;
  const { pathname, search } = url;

  // 0) Normalisation de casse du 1er segment (fix hydratation /OWNER → /owner)
  const segments = pathname.split("/").filter(Boolean);
  // skip assets/_next plus bas via matcher ; si quand même présent, on sort
  if (segments.length) {
    const lower = segments[0].toLowerCase();
    if (segments[0] !== lower) {
      const to = new URL(request.url);
      segments[0] = lower;
      to.pathname = "/" + segments.join("/");
      return NextResponse.redirect(to);
    }
  }

  // 1) Auth / rôles (NextAuth v4 → AUTH_SECRET)
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p));

  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req: request, secret }).catch(() => null);
  const role = token?.role;

  if (isProtected && !token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const signin = new URL("/fr/signin", request.url);
    signin.searchParams.set("callbackUrl", pathname + (search || ""));
    return NextResponse.redirect(signin);
  }

  if (token) {
    const forbidden =
      (pathname.startsWith("/tenant") && role !== "tenant") ||
      (pathname.startsWith("/owner") && role !== "owner") ||
      (pathname.startsWith("/admin") && role !== "admin");

    if (forbidden) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      return NextResponse.redirect(new URL(`/${role || ""}`, request.url));
    }

    if (isAuthPage) {
      return NextResponse.redirect(new URL(`/${role || ""}`, request.url));
    }
  }

  return NextResponse.next();
}

// 🔧 Catch-all : applique la normalisation/guard partout (hors assets & fichiers)
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
