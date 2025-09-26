"use client";

import { FormEvent, useMemo, useState } from "react";
import type { Employee, EmploymentStatus } from "@/lib/employees";
import { EmployeeStatusCard } from "../EmployeeStatusCard/EmployeeStatusCard";
import { EmployeePreviewModal } from "../EmployeePreviewModal/EmployeePreviewModal";
import { EmployeeFormModal } from "../EmployeeFormModal/EmployeeFormModal";
import { EmployeeDocumentsModal } from "../EmployeeDocumentsModal/EmployeeDocumentsModal";
import { EmployeeHistoryModal } from "../EmployeeHistoryModal/EmployeeHistoryModal";

interface EmployeeTableProps {
  employees: Employee[];
}

const STATUS_COLORS: Record<EmploymentStatus, string> = {
  Active: "#2563eb",
  "On Leave": "#f97316",
  Terminated: "#ef4444",
};

const STATUS_BADGE_STYLES: Record<EmploymentStatus, string> = {
  Active:
    "border border-blue-500/20 bg-blue-500/10 text-blue-600 shadow-[0_8px_20px_-12px_rgba(37,99,235,0.4)]",
  "On Leave":
    "border border-amber-400/30 bg-amber-400/10 text-amber-600 shadow-[0_8px_20px_-12px_rgba(245,158,11,0.45)]",
  Terminated:
    "border border-rose-500/30 bg-rose-500/10 text-rose-500 shadow-[0_8px_20px_-12px_rgba(244,63,94,0.5)]",
};

const STATUS_OPTIONS: EmploymentStatus[] = ["Active", "On Leave", "Terminated"];

export function EmployeeTable({ employees }: EmployeeTableProps) {
  const [statusFilter, setStatusFilter] = useState<EmploymentStatus | "All">("All");
  const [departmentFilter, setDepartmentFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [formInitialValues, setFormInitialValues] = useState<Partial<Employee> | null>(null);
  const [previewEmployee, setPreviewEmployee] = useState<Employee | null>(null);
  const [documentsEmployee, setDocumentsEmployee] = useState<Employee | null>(null);
  const [historyEmployee, setHistoryEmployee] = useState<Employee | null>(null);
  const [menuEmployeeId, setMenuEmployeeId] = useState<string | null>(null);

  const departmentOptions = useMemo(() => {
    const uniqueDepartments = Array.from(new Set(employees.map((employee) => employee.department))).sort(
      (first, second) => first.localeCompare(second)
    );

    return ["All", ...uniqueDepartments];
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesStatus =
        statusFilter === "All" || employee.status === statusFilter;
      const matchesDepartment =
        departmentFilter === "All" || employee.department === departmentFilter;
      const lowered = searchTerm.trim().toLowerCase();
      const matchesSearch = lowered
        ? [
            employee.fullName,
            employee.role,
            employee.department,
            employee.email,
            employee.location,
            employee.id,
            employee.phone,
          ].some((value) => value.toLowerCase().includes(lowered))
        : true;

      return matchesStatus && matchesDepartment && matchesSearch;
    });
  }, [departmentFilter, employees, searchTerm, statusFilter]);

  const statusCounts = useMemo(() => {
    return STATUS_OPTIONS.reduce(
      (counts, status) => {
        counts[status] = employees.filter((employee) => employee.status === status).length;
        return counts;
      },
      {
        Active: 0,
        "On Leave": 0,
        Terminated: 0,
      } as Record<EmploymentStatus, number>
    );
  }, [employees]);

  const totalEmployees = employees.length;
  const filteredEmployeeCount = filteredEmployees.length;
  const directorySubtitle =
    filteredEmployeeCount === totalEmployees
      ? `Showing all ${totalEmployees} employees`
      : `Showing ${filteredEmployeeCount} of ${totalEmployees} employees`;

  const departmentChoices = useMemo(
    () => departmentOptions.filter((option) => option !== "All"),
    [departmentOptions]
  );

  const handleOpenCreateForm = () => {
    setFormMode("create");
    setFormInitialValues(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setFormInitialValues(null);
    setFormMode("create");
  };

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    console.info(
      formMode === "edit" ? "Update employee submission" : "New employee submission",
      payload
    );
    handleCloseForm();
  };

  const handleEditEmployee = (employee: Employee) => {
    setPreviewEmployee(null);
    setFormMode("edit");
    setFormInitialValues(employee);
    setIsFormOpen(true);
  };

  const handleViewDocuments = (employee: Employee) => {
    setPreviewEmployee(null);
    setDocumentsEmployee(employee);
  };

  const handleCloseDocuments = () => {
    setDocumentsEmployee(null);
  };

  const handleViewHistory = (employee: Employee) => {
    setPreviewEmployee(null);
    setHistoryEmployee(employee);
  };

  const handleCloseHistory = () => {
    setHistoryEmployee(null);
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="grid gap-4 md:grid-cols-3">
        {STATUS_OPTIONS.map((status) => {
          return (
            <EmployeeStatusCard
              key={status}
              label={status}
              count={statusCounts[status]}
              accentColor={STATUS_COLORS[status]}
            />
          );
        })}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="flex flex-col gap-4 border-b border-slate-100 pb-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold text-slate-900">Employee Directory</h2>
              <p className="text-sm text-slate-500">{directorySubtitle}</p>
            </div>
            <button
              type="button"
              onClick={handleOpenCreateForm}
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
            >
              + Add Employee
            </button>
          </div>

          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,220px)_minmax(0,220px)]">
            <div className="relative flex items-center">
              <input
                type="search"
                placeholder="Search by name, email, ID..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 shadow-inner transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <select
              value={departmentFilter}
              onChange={(event) => setDepartmentFilter(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-inner transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              {departmentOptions.map((option) => (
                <option key={option} value={option}>
                  {option === "All" ? "All departments" : option}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as EmploymentStatus | "All")
              }
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-inner transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">All statuses</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </header>

        <div className="mt-6">
          {filteredEmployees.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-16 text-center">
              <h3 className="text-base font-semibold text-slate-700">No employees found</h3>
              <p className="max-w-md text-sm text-slate-500">
                Try adjusting your search keywords or filters to locate the employee records you are looking for.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredEmployees.map((employee) => (
                <article
                  key={employee.id}
                  className="group relative flex h-full flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  onMouseLeave={() => setMenuEmployeeId((current) => (current === employee.id ? null : current))}
                >
                  <header className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-base font-semibold uppercase text-blue-700">
                        {getInitials(employee.fullName)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{employee.fullName}</h3>
                        <p className="text-sm text-slate-500">{employee.role}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <button
                        type="button"
                        className={`flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/0 text-slate-400 transition hover:border-slate-200/80 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 ${
                          menuEmployeeId === employee.id ? "border-slate-200/80 bg-slate-100 text-slate-600" : ""
                        }`}
                        onClick={() =>
                          setMenuEmployeeId((current) => (current === employee.id ? null : employee.id))
                        }
                        aria-haspopup="menu"
                        aria-expanded={menuEmployeeId === employee.id}
                      >
                        <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor">
                          <circle cx="4" cy="10" r="1.5" />
                          <circle cx="10" cy="10" r="1.5" />
                          <circle cx="16" cy="10" r="1.5" />
                        </svg>
                      </button>
                      {menuEmployeeId === employee.id && (
                        <div className="absolute right-0 top-10 z-20 w-40 rounded-2xl border border-slate-200 bg-white p-2 text-sm font-medium text-slate-600 shadow-lg">
                          <button
                            type="button"
                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
                            onClick={() => {
                              handleEditEmployee(employee);
                              setMenuEmployeeId(null);
                            }}
                          >
                            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
                              <path d="M4 13.5V16h2.5l7.374-7.374-2.5-2.5L4 13.5zm9.793-7.793l-1.5-1.5a1 1 0 00-1.414 0L9.586 5.5l2.5 2.5 1.707-1.707a1 1 0 000-1.414z" />
                            </svg>
                            Update
                          </button>
                          <button
                            type="button"
                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-red-500 transition hover:bg-red-50 hover:text-red-600"
                            onClick={() => {
                              console.info("Delete employee", employee.id);
                              setMenuEmployeeId(null);
                            }}
                          >
                            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
                              <path d="M7 3a2 2 0 00-2 2v1H3v2h1v7a2 2 0 002 2h8a2 2 0 002-2v-7h1V6h-2V5a2 2 0 00-2-2H7zm0 3V5h6v1H7zm1 4h2v5H8V10zm4 0h-2v5h2V10z" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </header>

                  <div className="flex flex-col gap-2 text-sm text-slate-600">
                    <p className="flex items-center gap-2">
                      <span className="font-medium text-slate-500">Department:</span>
                      <span>{employee.department}</span>
                    </p>
                    <p className="flex items-center gap-2 break-all">
                      <span className="font-medium text-slate-500">Email:</span>
                      <span>{employee.email}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-medium text-slate-500">Phone:</span>
                      <span>{employee.phone}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-medium text-slate-500">Location:</span>
                      <span>{employee.location}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-medium text-slate-500">Employee ID:</span>
                      <span>{employee.id}</span>
                    </p>
                  </div>

                  <footer className="mt-auto flex flex-col gap-3 text-xs text-slate-500">
                    <span>
                      Hired on
                      {" "}
                      {new Date(employee.hireDate).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide whitespace-nowrap transition ${STATUS_BADGE_STYLES[employee.status]}`}
                      >
                        {employee.status}
                      </span>
                      <button
                        type="button"
                        className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-blue-500 hover:text-blue-600"
                        onClick={() => setPreviewEmployee(employee)}
                      >
                        Preview
                      </button>
                    </div>
                  </footer>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {isFormOpen && (
        <EmployeeFormModal
          mode={formMode}
          initialValues={formInitialValues ?? undefined}
          departmentOptions={departmentChoices}
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
        />
      )}

      {previewEmployee && (
        <EmployeePreviewModal
          employee={previewEmployee}
          initials={getInitials(previewEmployee.fullName)}
          statusColor={STATUS_COLORS[previewEmployee.status]}
          onClose={() => setPreviewEmployee(null)}
          onEdit={handleEditEmployee}
          onViewDocuments={handleViewDocuments}
          onViewHistory={handleViewHistory}
        />
      )}

      {documentsEmployee && (
        <EmployeeDocumentsModal
          employee={documentsEmployee}
          onClose={handleCloseDocuments}
        />
      )}

      {historyEmployee && (
        <EmployeeHistoryModal employee={historyEmployee} onClose={handleCloseHistory} />
      )}
    </div>
  );
}

function getInitials(fullName: string) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((segment) => segment[0]?.toUpperCase() ?? "")
    .join("");
}
