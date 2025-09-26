import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

const PUBLIC_PATHS = new Set([
  "/login",
  "/register",
]);

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (shouldBypass(pathname)) {
    return NextResponse.next();
  }

  const isPublicPath = PUBLIC_PATHS.has(pathname);
  const authCookie = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (authCookie) {
    if (isPublicPath) {
      const targetUrl = new URL("/", request.url);
      return NextResponse.redirect(targetUrl);
    }
    return NextResponse.next();
  }

  if (isPublicPath) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);

  if (pathname !== "/") {
    loginUrl.searchParams.set("redirect", `${pathname}${search}`);
  }

  return NextResponse.redirect(loginUrl);
}

function shouldBypass(pathname: string) {
  if (pathname.startsWith("/_next")) return true;
  if (pathname.startsWith("/api/auth")) return true;
  if (pathname.startsWith("/api/")) return true;
  if (pathname.startsWith("/assets")) return true;
  if (pathname.startsWith("/public")) return true;
  if (pathname === "/favicon.ico") return true;
  if (pathname.endsWith(".svg")) return true;
  if (pathname.endsWith(".png")) return true;
  if (pathname.endsWith(".jpg")) return true;
  if (pathname.endsWith(".jpeg")) return true;
  if (pathname.endsWith(".webp")) return true;
  return false;
}

export const config = {
  matcher: ["/(.*)"],
};
