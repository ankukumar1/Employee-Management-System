import type { EmploymentStatus } from "@/lib/employees";

interface EmployeeStatusCardProps {
  label: EmploymentStatus;
  count: number;
  accentColor: string;
}

export function EmployeeStatusCard({
  label,
  count,
  accentColor,
}: EmployeeStatusCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
      </header>
      <div className="mt-4 flex items-end gap-2">
        <span className="text-3xl font-semibold text-slate-900">{count}</span>
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Employees
        </span>
      </div>
    </section>
  );
}
