"use client";

import type { FormEvent } from "react";
import type { Employee, EmploymentStatus } from "@/lib/employees";

type EmployeeFormModalProps = {
  mode: "create" | "edit";
  initialValues?: Partial<Employee>;
  departmentOptions: string[];
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function EmployeeFormModal({
  mode,
  initialValues,
  departmentOptions,
  onClose,
  onSubmit,
}: EmployeeFormModalProps) {
  const isEdit = mode === "edit";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-12">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-8 py-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Employee Management</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">
              {isEdit ? "Edit employee" : "Add new employee"}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {isEdit
                ? "Update the employee details below to keep records accurate."
                : "Fill in the details below to create a new employee profile in the directory."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-10 w-10 rounded-full border border-slate-200 text-slate-500 transition hover:border-blue-500 hover:text-blue-600"
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <form onSubmit={onSubmit} className="grid gap-6 px-8 py-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Full name
              <input
                required
                name="fullName"
                placeholder="e.g. Aarav Kapoor"
                defaultValue={initialValues?.fullName ?? ""}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-normal text-slate-800 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Role / Title
              <input
                required
                name="role"
                placeholder="e.g. Engineering Manager"
                defaultValue={initialValues?.role ?? ""}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-normal text-slate-800 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Department
              <div className="relative">
                <select
                  required
                  name="department"
                  defaultValue={initialValues?.department ?? ""}
                  className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm font-normal text-slate-800 shadow-inner transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="" disabled hidden>
                    Select department
                  </option>
                  {departmentOptions.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.477l3.71-3.246a.75.75 0 111.04 1.08l-4.25 3.714a.75.75 0 01-1.04 0L5.21 8.29a.75.75 0 01.02-1.08z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Status
              <div className="relative">
                <select
                  name="status"
                  defaultValue={(initialValues?.status as EmploymentStatus) ?? "Active"}
                  className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm font-normal text-slate-800 shadow-inner transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Terminated">Terminated</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.477l3.71-3.246a.75.75 0 111.04 1.08l-4.25 3.714a.75.75 0 01-1.04 0L5.21 8.29a.75.75 0 01.02-1.08z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Work email
              <input
                required
                type="email"
                name="email"
                placeholder="name@example.com"
                defaultValue={initialValues?.email ?? ""}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-normal text-slate-800 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Phone
              <input
                required
                name="phone"
                placeholder="e.g. +91 98765 43210"
                defaultValue={initialValues?.phone ?? ""}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-normal text-slate-800 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Location
              <input
                required
                name="location"
                placeholder="City or region"
                defaultValue={initialValues?.location ?? ""}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-normal text-slate-800 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Employee ID
              <input
                required
                name="id"
                placeholder="e.g. EMP-1234"
                defaultValue={initialValues?.id ?? ""}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-normal text-slate-800 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
              Hire date
              <input
                required
                type="date"
                name="hireDate"
                defaultValue={initialValues?.hireDate ?? ""}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-normal text-slate-800 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </label>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-400 hover:text-blue-600 sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 sm:w-auto"
            >
              {isEdit ? "Save changes" : "Save employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
