"use client";

import type { Employee } from "@/lib/employees";

type EmployeeDocumentsModalProps = {
  employee: Employee;
  onClose: () => void;
};

const MOCK_DOCUMENTS = [
  {
    id: "offer-letter",
    label: "Signed offer letter",
    description: "PDF · 1.2 MB",
    uploadedAt: "2023-02-14",
  },
  {
    id: "nda",
    label: "Non-disclosure agreement",
    description: "PDF · 680 KB",
    uploadedAt: "2023-02-18",
  },
  {
    id: "id-proof",
    label: "Government ID proof",
    description: "Image · 2.1 MB",
    uploadedAt: "2023-02-20",
  },
];

export function EmployeeDocumentsModal({ employee, onClose }: EmployeeDocumentsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-12">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-8 py-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Employee documents</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">{employee.fullName}</h2>
            <p className="mt-1 text-sm text-slate-500">Securely review the files shared during onboarding.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close documents"
            className="h-10 w-10 rounded-full border border-slate-200 text-slate-500 transition hover:border-blue-500 hover:text-blue-600"
          >
            ×
          </button>
        </header>

        <section className="grid gap-4 px-8 py-6">
          {MOCK_DOCUMENTS.map((document) => (
            <article
              key={document.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 px-5 py-4 text-sm shadow-inner"
            >
              <div>
                <p className="font-semibold text-slate-800">{document.label}</p>
                <p className="text-xs text-slate-500">{document.description}</p>
              </div>
              <div className="text-right text-xs text-slate-400">
                <p>Uploaded</p>
                <p>{new Date(document.uploadedAt).toLocaleDateString()}</p>
              </div>
            </article>
          ))}

          <p className="text-xs text-slate-400">
            Actual documents should be fetched from your secure storage layer. These placeholders indicate the expected layout.
          </p>
        </section>
      </div>
    </div>
  );
}
