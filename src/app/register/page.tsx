import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME } from "@/lib/auth";
import { PasswordField } from "@/components/PasswordField/PasswordField";

type RegisterPageProps = {
  searchParams?: {
    redirect?: string;
    error?: string;
  };
};

export const metadata: Metadata = {
  title: "Create account · PeoplePulse",
  description: "Set up your PeoplePulse account to start managing your teams effectively.",
};

const ERROR_MESSAGES: Record<string, string> = {
  missingFields: "Please fill in all required fields.",
  passwordMismatch: "Passwords do not match. Please try again.",
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
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
          <h1 className="text-3xl font-semibold text-slate-900">Create your account</h1>
          <p className="text-sm text-slate-500">
            Start onboarding employees, tracking workforce insights, and collaborating with your HR team.
          </p>
        </div>

        {errorMessage && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {errorMessage}
          </div>
        )}

        <form className="space-y-5" action="/api/auth/register" method="post">
          <input name="redirect" type="hidden" value={safeRedirect} />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700" htmlFor="name">
              Full name
            </label>
            <input
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              id="name"
              name="name"
              type="text"
              placeholder="Alex Johnson"
              required
              autoComplete="name"
            />
          </div>

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
            placeholder="Create a password"
            required
            autoComplete="new-password"
          />

          <PasswordField
            label="Confirm password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-enter your password"
            required
            autoComplete="new-password"
          />

          <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
            <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              ✓
            </span>
            <p>
              By creating an account, you agree to our <a className="font-medium text-blue-600 hover:text-blue-700" href="#">Terms of Service</a> and <a className="font-medium text-blue-600 hover:text-blue-700" href="#">Privacy Policy</a>.
            </p>
          </div>

          <button
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            type="submit"
          >
            Create account
          </button>
        </form>

        <p className="text-center text-sm text-slate-500">
          Already have an account? {" "}
          <Link
            className="font-medium text-blue-600 hover:text-blue-700"
            href={`/login${safeRedirect ? `?redirect=${encodeURIComponent(safeRedirect)}` : ""}`}
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
