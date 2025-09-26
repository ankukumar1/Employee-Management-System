"use client";

import { useMemo, useState } from "react";
import type { Employee, EmploymentStatus } from "@/lib/employees";
import { EmployeeStatusCard } from "../EmployeeStatusCard/EmployeeStatusCard";

interface EmployeeTableProps {
  employees: Employee[];
}

const STATUS_COLORS: Record<EmploymentStatus, string> = {
  Active: "#2563eb",
  "On Leave": "#f97316",
  Terminated: "#ef4444",
};

const STATUS_OPTIONS: EmploymentStatus[] = ["Active", "On Leave", "Terminated"];

export function EmployeeTable({ employees }: EmployeeTableProps) {
  const [statusFilter, setStatusFilter] = useState<EmploymentStatus | "All">("All");
  const [departmentFilter, setDepartmentFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

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
                  className="group flex h-full flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
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
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        backgroundColor: `${STATUS_COLORS[employee.status]}22`,
                        color: STATUS_COLORS[employee.status],
                      }}
                    >
                      {employee.status}
                    </span>
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

                  <footer className="mt-auto flex items-center justify-between gap-3 text-xs text-slate-500">
                    <span>
                      Hired on
                      {" "}
                      {new Date(employee.hireDate).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <button
                      type="button"
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-blue-500 hover:text-blue-600"
                    >
                      Preview
                    </button>
                  </footer>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
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
