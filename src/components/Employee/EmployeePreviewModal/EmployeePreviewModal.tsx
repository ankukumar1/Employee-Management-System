"use client";

import type { Employee } from "@/lib/employees";

type EmployeePreviewModalProps = {
  employee: Employee;
  initials: string;
  statusColor: string;
  onClose: () => void;
  onEdit: (employee: Employee) => void;
  onViewDocuments: (employee: Employee) => void;
  onViewHistory: (employee: Employee) => void;
};

export function EmployeePreviewModal({
  employee,
  initials,
  statusColor,
  onClose,
  onEdit,
  onViewDocuments,
  onViewHistory,
}: EmployeePreviewModalProps) {
  const formattedHireDate = new Date(employee.hireDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const badgeBackground = `${statusColor}44`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-12">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-slate-900 text-slate-100 shadow-2xl">
        <header className="flex flex-col gap-4 border-b border-slate-800 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/20 text-base font-semibold uppercase text-blue-200">
              {initials}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">{employee.fullName}</h2>
              <p className="text-sm text-slate-400">{employee.role}</p>
              <span
                className="mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  backgroundColor: badgeBackground,
                  color: statusColor,
                }}
              >
                {employee.status}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-10 w-10 rounded-full border border-slate-700 text-slate-300 transition hover:border-blue-500 hover:text-blue-200"
            aria-label="Close preview"
          >
            ×
          </button>
        </header>

        <section className="grid gap-8 px-8 py-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">About</h3>
              <p className="mt-2 text-sm text-slate-300">
                {employee.fullName} is a {employee.role.toLowerCase()} working with the {employee.department} team based in {employee.location}.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Employee information</h3>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Employee ID</dt>
                  <dd className="mt-1 text-sm text-slate-200">{employee.id}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Department</dt>
                  <dd className="mt-1 text-sm text-slate-200">{employee.department}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Role</dt>
                  <dd className="mt-1 text-sm text-slate-200">{employee.role}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Hire date</dt>
                  <dd className="mt-1 text-sm text-slate-200">{formattedHireDate}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Status</dt>
                  <dd className="mt-1 text-sm text-slate-200">{employee.status}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Location</dt>
                  <dd className="mt-1 text-sm text-slate-200">{employee.location}</dd>
                </div>
              </dl>
            </article>
          </div>

          <aside className="space-y-6">
            <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Contact</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</dt>
                  <dd className="mt-1 break-all text-slate-200">{employee.email}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</dt>
                  <dd className="mt-1 text-slate-200">{employee.phone}</dd>
                </div>
              </dl>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Actions</h3>
              <div className="mt-4 flex flex-col gap-3 text-sm">
                <button
                  type="button"
                  onClick={() => onEdit(employee)}
                  className="rounded-full border border-slate-700 px-4 py-2 font-semibold text-slate-200 transition hover:border-blue-500 hover:text-blue-200"
                >
                  Edit profile
                </button>
                <button
                  type="button"
                  onClick={() => onViewDocuments(employee)}
                  className="rounded-full border border-slate-700 px-4 py-2 font-semibold text-slate-200 transition hover:border-blue-500 hover:text-blue-200"
                >
                  View documents
                </button>
                <button
                  type="button"
                  onClick={() => onViewHistory(employee)}
                  className="rounded-full border border-slate-700 px-4 py-2 font-semibold text-slate-200 transition hover:border-indigo-500 hover:text-indigo-200"
                >
                  View history
                </button>
              </div>
            </article>
          </aside>
        </section>

        <footer className="flex justify-end border-t border-slate-800 bg-slate-900/80 px-8 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
