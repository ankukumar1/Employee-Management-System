import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, getCookieMaxAge, getSafeRedirectPath } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const password = (formData.get("password") as string | null)?.trim() ?? "";
  const redirectInput = (formData.get("redirect") as string | null) ?? "";

  if (!email || !password) {
    const errorUrl = new URL("/login", request.url);
    errorUrl.searchParams.set("error", "missingCredentials");
    if (redirectInput) {
      errorUrl.searchParams.set("redirect", getSafeRedirectPath(redirectInput));
    }
    return NextResponse.redirect(errorUrl);
  }

  // In a real app, validate credentials against a data store here.
  const redirectPath = getSafeRedirectPath(redirectInput || "/");
  const redirectUrl = new URL(redirectPath, request.url);

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: Buffer.from(JSON.stringify({ email })).toString("base64"),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: getCookieMaxAge(),
    path: "/",
  });

  return response;
}
