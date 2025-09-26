import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME } from "@/lib/auth";
import { PasswordField } from "@/components/PasswordField/PasswordField";

type LoginPageProps = {
  searchParams?: {
    redirect?: string;
    error?: string;
  };
};

export const metadata: Metadata = {
  title: "Sign in · PeoplePulse",
  description: "Securely sign in to access the PeoplePulse employee management dashboard.",
};

const ERROR_MESSAGES: Record<string, string> = {
  missingCredentials: "Enter your email and password to continue.",
  invalidCredentials: "Those credentials didn’t match our records.",
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const redirectParam = searchParams?.redirect;
  const safeRedirect = redirectParam && redirectParam.startsWith("/") ? redirectParam : "";
  const errorKey = searchParams?.error;
  const errorMessage = errorKey ? ERROR_MESSAGES[errorKey] ?? "Something went wrong. Please try again." : null;

  const authCookie = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
  if (authCookie) {
    redirect(safeRedirect || "/");
  }

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-6xl items-center justify-center px-6 py-16">
      <div className="grid w-full max-w-lg gap-8 rounded-3xl border border-blue-100 bg-white/80 p-10 shadow-lg backdrop-blur">
        <div className="space-y-2 text-center">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600">
            PeoplePulse
          </span>
          <h1 className="text-3xl font-semibold text-slate-900">Welcome back</h1>
          <p className="text-sm text-slate-500">
            Sign in to manage employees, review workforce insights, and stay on top of your HR operations.
          </p>
        </div>

        {errorMessage && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {errorMessage}
          </div>
        )}

        <form className="space-y-5" action="/api/auth/login" method="post">
          <input name="redirect" type="hidden" value={safeRedirect} />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700" htmlFor="email">
              Work email
            </label>
            <input
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              required
              autoComplete="email"
            />
          </div>

          <PasswordField
            label="Password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            autoComplete="current-password"
          />

          <div className="flex items-center justify-between text-sm text-slate-600">
            <label className="flex items-center gap-2" htmlFor="remember">
              <input
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                id="remember"
                name="remember"
                type="checkbox"
              />
              Keep me signed in
            </label>
            <Link className="font-medium text-blue-600 hover:text-blue-700" href="#">
              Forgot password?
            </Link>
          </div>

          <button
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            type="submit"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-sm text-slate-500">
          New to PeoplePulse? {" "}
          <Link
            className="font-medium text-blue-600 hover:text-blue-700"
            href={`/register${safeRedirect ? `?redirect=${encodeURIComponent(safeRedirect)}` : ""}`}
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
