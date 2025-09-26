'use client';

import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { SidebarNav } from "@/components/SidebarNav/SidebarNav";

export function SiteShell({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const hideShellRoutes = ["/login", "/register"];
  const shouldHideShell = pathname ? hideShellRoutes.includes(pathname) : false;

  const isDashboardLike = !shouldHideShell && pathname?.startsWith("/");

  if (shouldHideShell) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="flex min-h-screen">
        {isDashboardLike && <SidebarNav />}
        <div className="flex h-full w-full flex-1 flex-col">
          <div className="border-b border-slate-200 bg-white/80 backdrop-blur">
            <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
              <div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600">
                  PeoplePulse
                </span>
                <p className="mt-1 text-sm text-slate-500">Workforce intelligence for modern organisations</p>
              </div>
              <nav className="hidden items-center gap-4 text-sm font-medium text-slate-600 md:flex">
                <a className="rounded-full px-3 py-1 transition hover:bg-blue-50 hover:text-blue-600" href="#overview">
                  Overview
                </a>
                <a className="rounded-full px-3 py-1 transition hover:bg-blue-50 hover:text-blue-600" href="#employees">
                  Employees
                </a>
              </nav>
              <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
                New employee
              </button>
            </header>
          </div>
          <div className={`flex-1 ${isDashboardLike ? "px-6 py-10 lg:px-10" : ""}`}>{children}</div>
          <footer className="mt-auto border-t border-slate-200 bg-white/70 py-6">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-6 text-sm text-slate-500 sm:flex-row sm:items-center">
              <p>© {new Date().getFullYear()} PeoplePulse. All rights reserved.</p>
              <div className="flex gap-4">
                <a className="hover:text-blue-600" href="#">
                  Privacy
                </a>
                <a className="hover:text-blue-600" href="#">
                  Terms
                </a>
                <a className="hover:text-blue-600" href="#">
                  Support
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
