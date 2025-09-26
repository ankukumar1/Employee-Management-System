"use client";

import type { Employee } from "@/lib/employees";

type EmployeeHistoryModalProps = {
  employee: Employee;
  onClose: () => void;
};

const MOCK_HISTORY = [
  {
    id: "status-update",
    title: "Status updated to Active",
    description: "Marked active after completing onboarding tasks.",
    timestamp: "2023-03-01T10:24:00Z",
  },
  {
    id: "promotion",
    title: "Promotion recommended",
    description: "Line manager recommended promotion to Senior Engineer.",
    timestamp: "2024-01-10T16:05:00Z",
  },
  {
    id: "leave",
    title: "Leave approved",
    description: "Approved 10 days of annual leave for April.",
    timestamp: "2024-03-18T09:12:00Z",
  },
];

export function EmployeeHistoryModal({ employee, onClose }: EmployeeHistoryModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-12">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-8 py-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Employee history</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">{employee.fullName}</h2>
            <p className="mt-1 text-sm text-slate-500">
              Key milestones and updates recorded for this employee.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close history"
            className="h-10 w-10 rounded-full border border-slate-200 text-slate-500 transition hover:border-blue-500 hover:text-blue-600"
          >
            ×
          </button>
        </header>

        <section className="space-y-4 px-8 py-6">
          {MOCK_HISTORY.map((event) => (
            <article
              key={event.id}
              className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 text-sm shadow-inner"
            >
              <h3 className="text-sm font-semibold text-slate-800">{event.title}</h3>
              <p className="mt-1 text-xs text-slate-500">
                {new Date(event.timestamp).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
              <p className="mt-2 text-sm text-slate-600">{event.description}</p>
            </article>
          ))}

          <p className="text-xs text-slate-400">
            Replace this sample data with entries from your activity log or HRIS integration.
          </p>
        </section>
      </div>
    </div>
  );
}
