'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Workspace",
    items: [
      { label: "Dashboard", href: "/" },
      { label: "Employees", href: "/employees" },
      { label: "Organization", href: "/organization" },
      { label: "Leave", href: "/leave" },
      { label: "Attendance", href: "/attendance" },
    ],
  },
  {
    title: "Insights",
    items: [
      { label: "Documents", href: "/documents" },
      { label: "Salary & Payroll", href: "/payroll" },
      { label: "Reports & Analytics", href: "/reports" },
    ],
  },
  {
    title: "Administration",
    items: [
      { label: "System Settings", href: "/settings" },
      { label: "My Personal", href: "/me" },
    ],
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 flex-shrink-0 lg:flex">
      <div className="sticky top-0 flex h-screen flex-col overflow-y-auto bg-slate-950 text-slate-200 shadow-xl">
        <div className="space-y-8 px-6 py-8">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-300">
              Super Admin
            </span>
            <div>
              <p className="text-lg font-semibold text-white">PeoplePulse</p>
              <p className="text-xs text-slate-400">Workforce intelligence suite</p>
            </div>
          </div>

          <nav className="space-y-6 text-sm">
            {NAV_SECTIONS.map((section) => (
              <div key={section.title} className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {section.title}
                </p>
                <ul className="space-y-1.5">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-2 rounded-xl px-3 py-2 transition ${
                            isActive
                              ? "bg-blue-500/20 text-white"
                              : "text-slate-300 hover:bg-slate-900/70 hover:text-white"
                          }`}
                        >
                          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-current" aria-hidden />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="space-y-4 px-6 pb-8">
          <div className="rounded-2xl bg-slate-900/80 px-4 py-5 text-xs text-slate-300">
            <p className="font-semibold text-white">Need support?</p>
            <p className="mt-1 text-slate-400">1-day response time for HR admins.</p>
            <button className="mt-4 w-full rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-500">
              Contact team
            </button>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-slate-900/50 px-4 py-3 text-sm text-slate-300">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-base font-semibold text-white">
              JS
            </div>
            <div className="leading-tight">
              <p className="font-semibold text-white">John Smith</p>
              <p className="text-xs text-slate-400">Chief Executive Officer</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
