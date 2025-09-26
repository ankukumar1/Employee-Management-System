import type { Metadata } from "next";
import { EmployeeTable } from "@/components/Employee/EmployeeTable/EmployeeTable";
import { getEmployees } from "@/lib/employees";

export const metadata: Metadata = {
  title: "Employees · PeoplePulse",
  description: "Explore the PeoplePulse employee directory, filter by status, and discover workforce insights.",
};

export default function EmployeesPage() {
  const employees = getEmployees();
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((employee) => employee.status === "Active").length;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <header className="flex flex-col gap-4 rounded-3xl border border-blue-100 bg-white/70 px-8 py-10 shadow-sm backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">People Directory</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">All employees</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Stay on top of your organisation&apos;s workforce with up-to-date employee records, role summaries, and
            status tracking.
          </p>
        </div>
        <div className="flex items-end gap-6">
          <div className="rounded-2xl bg-blue-50 px-5 py-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Active</p>
            <p className="mt-2 text-2xl font-semibold text-blue-700">{activeEmployees}</p>
          </div>
          <div className="rounded-2xl bg-slate-100 px-5 py-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total</p>
            <p className="mt-2 text-2xl font-semibold text-slate-800">{totalEmployees}</p>
          </div>
        </div>
      </header>

      <EmployeeTable employees={employees} />
    </div>
  );
}
