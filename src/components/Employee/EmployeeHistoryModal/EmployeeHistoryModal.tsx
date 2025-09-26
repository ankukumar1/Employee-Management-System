"use client";

import type { Employee } from "@/lib/employees";

type TimelineEvent = {
  id: string;
  date: string;
  title: string;
  description: string;
  tone: "success" | "warning" | "info";
};

type EmployeeHistoryModalProps = {
  employee: Employee;
  onClose: () => void;
};

export function EmployeeHistoryModal({ employee, onClose }: EmployeeHistoryModalProps) {
  const timeline = getTimelineForEmployee(employee);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6 sm:py-12">
      <div className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900 text-slate-100 shadow-[0_32px_80px_-24px_rgba(8,47,73,0.65)] max-h-[calc(100vh-3rem)] sm:max-h-[calc(100vh-5rem)]">
        <header className="flex flex-col gap-3 border-b border-slate-800/80 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Employment Timeline</p>
            <h2 className="text-2xl font-semibold text-white">{employee.fullName}</h2>
            <p className="text-sm text-slate-400">{employee.role} · {employee.department}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-10 w-10 rounded-full border border-slate-700 text-slate-300 transition hover:border-blue-500 hover:text-blue-200"
            aria-label="Close history"
          >
            ×
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-10 px-6 py-8 sm:px-8">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              {timeline.length} milestones captured · latest updates sync automatically
            </p>

            <div className="relative flex flex-col gap-14">
              <span className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-slate-800/60 lg:block" aria-hidden="true" />

              {timeline.map((event, index) => {
                const isLeft = index % 2 === 0;
                const cardSide = isLeft ? "lg:self-start" : "lg:self-end";
                const alignment = isLeft ? "lg:items-end lg:text-right" : "lg:items-start lg:text-left";
                const iconPosition = isLeft
                  ? "top-4 left-4"
                  : "top-4 right-4";

                return (
                  <div key={event.id} className={`relative flex flex-col gap-4 ${cardSide}`}>
                    <div
                      className={`relative flex max-w-xl flex-col gap-4 rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-900/60 px-6 py-6 shadow-[0_32px_80px_-32px_rgba(15,23,42,0.9)] backdrop-blur-sm ${alignment}`}
                    >
                      <span className={`absolute ${iconPosition} flex h-12 w-12 items-center justify-center rounded-full border-2 ${getBadgeStyles(event.tone)} bg-slate-900 shadow-[0_10px_30px_-12px_rgba(59,130,246,0.45)]`}>
                        <span className="text-sm">{getToneIcon(event.tone)}</span>
                      </span>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {formatDate(event.date)}
                        </span>
                        <h3 className="text-base font-semibold text-slate-100">{event.title}</h3>
                      </div>
                      <p className="text-sm text-slate-300">{event.description}</p>
                      <span
                        className={`inline-flex w-max items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${getBadgeStyles(
                          event.tone
                        )}`}
                      >
                        {getToneLabel(event.tone)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <footer className="flex justify-end border-t border-slate-800/80 bg-slate-900/90 px-8 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}

function getTimelineForEmployee(employee: Employee): TimelineEvent[] {
  const base: TimelineEvent[] = [
    {
      id: `${employee.id}-created`,
      date: "2018-01-15",
      title: "Record Created",
      description: "Employee record created in the PeoplePulse system.",
      tone: "info",
    },
    {
      id: `${employee.id}-hired`,
      date: employee.hireDate,
      title: "Hired",
      description: `${employee.fullName} joined the ${employee.department} team as ${employee.role}.`,
      tone: "success",
    },
    {
      id: `${employee.id}-review`,
      date: "2024-04-15",
      title: "Performance Review",
      description: "Annual performance review completed with actionable growth plan.",
      tone: "info",
    },
  ];

  if (employee.status === "On Leave") {
    base.push({
      id: `${employee.id}-on-leave`,
      date: "2024-06-01",
      title: "Leave Approved",
      description: "Extended leave of absence approved by HR Business Partner.",
      tone: "warning",
    });
  }

  base.push({
    id: `${employee.id}-synced`,
    date: "2025-04-19",
    title: "Record Updated",
    description: "Employment information refreshed across integrated systems.",
    tone: "info",
  });

  return base.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getBadgeStyles(tone: TimelineEvent["tone"]) {
  const toneMap: Record<TimelineEvent["tone"], string> = {
    success: "border-emerald-500/60 bg-emerald-500/10 text-emerald-300",
    warning: "border-amber-500/60 bg-amber-500/10 text-amber-300",
    info: "border-blue-500/60 bg-blue-500/10 text-blue-300",
  };

  return toneMap[tone];
}

function getToneLabel(tone: TimelineEvent["tone"]) {
  const labels: Record<TimelineEvent["tone"], string> = {
    success: "Milestone",
    warning: "Attention",
    info: "Update",
  };

  return labels[tone];
}

function getToneIcon(tone: TimelineEvent["tone"]) {
  const icons: Record<TimelineEvent["tone"], string> = {
    success: "✔",
    warning: "⚠",
    info: "ⓘ",
  };

  return icons[tone];
}
