import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, getCookieMaxAge, getSafeRedirectPath } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const password = (formData.get("password") as string | null)?.trim() ?? "";
  const confirmPassword = (formData.get("confirmPassword") as string | null)?.trim() ?? "";
  const redirectInput = (formData.get("redirect") as string | null) ?? "";

  const redirectParam = redirectInput ? getSafeRedirectPath(redirectInput) : "";

  if (!name || !email || !password || !confirmPassword) {
    const errorUrl = new URL("/register", request.url);
    errorUrl.searchParams.set("error", "missingFields");
    if (redirectParam) {
      errorUrl.searchParams.set("redirect", redirectParam);
    }
    return NextResponse.redirect(errorUrl);
  }

  if (password !== confirmPassword) {
    const errorUrl = new URL("/register", request.url);
    errorUrl.searchParams.set("error", "passwordMismatch");
    if (redirectParam) {
      errorUrl.searchParams.set("redirect", redirectParam);
    }
    return NextResponse.redirect(errorUrl);
  }

  // In a production-ready app, you would persist the user and hash the password here.
  const redirectPath = redirectParam || "/";
  const redirectUrl = new URL(redirectPath, request.url);

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: Buffer.from(JSON.stringify({ email, name })).toString("base64"),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: getCookieMaxAge(),
    path: "/",
  });

  return response;
}
