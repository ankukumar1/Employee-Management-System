export const AUTH_COOKIE_NAME = "pp_auth";

const FALLBACK_REDIRECT = "/";

export function getSafeRedirectPath(redirect?: string | null) {
  if (!redirect) {
    return FALLBACK_REDIRECT;
  }

  if (!redirect.startsWith("/") || redirect.startsWith("//")) {
    return FALLBACK_REDIRECT;
  }

  return redirect;
}

export function getCookieMaxAge() {
  // 7 days
  return 60 * 60 * 24 * 7;
}
