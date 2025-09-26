"use client";

import type { Employee } from "@/lib/employees";

type EmployeeDocument = {
  id: string;
  name: string;
  category: string;
  status: "Signed" | "Pending" | "Issued";
  uploadedAt: string;
  owner: string;
};

type EmployeeDocumentsModalProps = {
  employee: Employee;
  onClose: () => void;
};

export function EmployeeDocumentsModal({ employee, onClose }: EmployeeDocumentsModalProps) {
  const documents = getDocumentsForEmployee(employee);
  const STATUS_BADGE_CLASSES: Record<EmployeeDocument["status"], string> = {
    Signed: "border-emerald-500/50 bg-emerald-500/10 text-emerald-300",
    Pending: "border-amber-500/50 bg-amber-500/10 text-amber-300",
    Issued: "border-blue-500/50 bg-blue-500/10 text-blue-300",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6 sm:py-12">
      <div className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900 text-slate-100 shadow-[0_40px_120px_-40px_rgba(8,47,73,0.7)] max-h-[calc(100vh-3rem)] sm:max-h-[calc(100vh-6rem)]">
        <header className="flex flex-col gap-4 border-b border-slate-800/80 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Employee Documents</p>
            <h2 className="text-2xl font-semibold text-white">{employee.fullName}</h2>
            <p className="text-sm text-slate-400">
              {employee.role} · {employee.department}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-10 w-10 rounded-full border border-slate-700 text-slate-300 transition hover:border-blue-500 hover:text-blue-200"
            aria-label="Close documents"
          >
            ×
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-8 px-8 py-8 pb-6">
            <div className="grid gap-4 text-xs font-medium uppercase tracking-wide text-slate-400 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-inner shadow-slate-950/40">
                <p className="text-xs text-slate-500">Employee ID</p>
                <p className="mt-2 text-sm font-semibold text-slate-100">{employee.id}</p>
              </div>
              <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-inner shadow-slate-950/40">
                <p className="text-xs text-slate-500">Status</p>
                <p className="mt-2 text-sm font-semibold text-slate-100">{employee.status}</p>
              </div>
              <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-inner shadow-slate-950/40">
                <p className="text-xs text-slate-500">Location</p>
                <p className="mt-2 text-sm font-semibold text-slate-100">{employee.location}</p>
              </div>
            </div>

            <section className="space-y-4">
              <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Document Library</h3>
                  <p className="text-xs text-slate-500">
                    {documents.length} documents available · latest updates synced automatically
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-blue-500 hover:text-blue-200"
                >
                  Export all
                </button>
              </header>

              <div className="grid gap-4">
                {documents.map((document) => (
                  <article
                    key={document.id}
                    className="flex flex-col gap-5 rounded-3xl border border-slate-800/80 bg-slate-900/80 px-6 py-5 shadow-lg shadow-slate-950/30 transition hover:border-blue-500/60 hover:shadow-blue-500/10"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-sm font-semibold text-blue-300">
                          {getDocumentGlyph(document)}
                        </div>
                        <div className="space-y-2">
                          <div>
                            <p className="text-base font-semibold text-slate-100">{document.name}</p>
                            <p className="text-xs uppercase tracking-wide text-slate-500">{document.category}</p>
                          </div>
                          <p className="text-xs text-slate-400">
                            Uploaded by <span className="font-semibold text-slate-200">{document.owner}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-2 text-xs text-slate-400 md:items-end">
                        <span
                          className={`rounded-full border px-3 py-1 font-semibold ${STATUS_BADGE_CLASSES[document.status]}`}
                        >
                          {document.status}
                        </span>
                        <span className="font-medium text-slate-500">Updated {formatDate(document.uploadedAt)}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="rounded-full border border-slate-700 px-4 py-2 font-semibold text-slate-200 transition hover:border-blue-500 hover:text-blue-200"
                        >
                          Preview
                        </button>
                        <button
                          type="button"
                          className="rounded-full bg-blue-600 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-blue-700"
                        >
                          Download
                        </button>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition hover:text-blue-200"
                      >
                        <span>View activity log</span>
                        <svg aria-hidden="true" className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor">
                          <path d="M3.172 10.828a.75.75 0 010-1.06L7.94 5l-4.768-4.768a.75.75 0 111.06-1.06l5.299 5.298a.75.75 0 010 1.06l-5.3 5.298a.75.75 0 01-1.06 0z" />
                        </svg>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>

        <footer className="flex justify-end border-t border-slate-800/80 bg-slate-900/90 px-8 py-4">
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

function getDocumentsForEmployee(employee: Employee): EmployeeDocument[] {
  const baseDocuments: EmployeeDocument[] = [
    {
      id: `${employee.id}-offer-letter`,
      name: "Offer Letter",
      category: "Employment Records",
      status: "Signed",
      uploadedAt: "2018-04-12",
      owner: "HR Operations",
    },
    {
      id: `${employee.id}-nda`,
      name: "Non-Disclosure Agreement",
      category: "Compliance",
      status: "Signed",
      uploadedAt: "2018-04-15",
      owner: "Legal Team",
    },
    {
      id: `${employee.id}-performance-2024`,
      name: "Performance Review 2024",
      category: "Performance",
      status: "Signed",
      uploadedAt: "2024-01-20",
      owner: "People Manager",
    },
    {
      id: `${employee.id}-id-card`,
      name: "Corporate ID Card",
      category: "Identity",
      status: "Issued",
      uploadedAt: "2018-04-18",
      owner: "Workplace Services",
    },
    {
      id: `${employee.id}-payroll-aug`,
      name: "Payroll Statement - August",
      category: "Payroll",
      status: "Issued",
      uploadedAt: "2024-08-31",
      owner: "Payroll Team",
    },
  ];

  if (employee.status === "On Leave") {
    baseDocuments.push({
      id: `${employee.id}-leave-approval`,
      name: "Leave of Absence Approval",
      category: "Leave Management",
      status: "Signed",
      uploadedAt: "2024-06-10",
      owner: "HR Business Partner",
    });
  }

  return baseDocuments;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getDocumentGlyph(document: EmployeeDocument) {
  return document.category
    .split(" ")
    .map((segment) => segment[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");
}
