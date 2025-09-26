import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EmployeeTable } from "@/components/EmployeeTable";
import { getEmployees } from "@/lib/employees";

describe("EmployeeTable", () => {
  const employees = getEmployees();

  it("renders the employee directory and summary cards", () => {
    render(<EmployeeTable employees={employees} />);

    expect(screen.getByText(/Employee Directory/i)).toBeInTheDocument();
    expect(screen.getByText(/Active/i)).toBeInTheDocument();
    expect(screen.getByText(/On Leave/i)).toBeInTheDocument();
    expect(screen.getByText(/Terminated/i)).toBeInTheDocument();
  });

  it("filters employees by search term", async () => {
    const user = userEvent.setup();
    render(<EmployeeTable employees={employees} />);

    const searchInput = screen.getByPlaceholderText(/Search employees/i);

    await user.clear(searchInput);
    await user.type(searchInput, "Aarav");

    expect(screen.getByText(/Aarav Kapoor/i)).toBeInTheDocument();

    await user.clear(searchInput);
    await user.type(searchInput, "Unknown Person");

    expect(
      screen.getByText(/No employees found. Adjust your filters/i)
    ).toBeInTheDocument();
  });

  it("filters employees by status", async () => {
    const user = userEvent.setup();
    render(<EmployeeTable employees={employees} />);

    const statusSelect = screen.getByRole("combobox");
    await user.selectOptions(statusSelect, "On Leave");

    expect(screen.getByText(/On Leave/i)).toBeInTheDocument();
    expect(screen.getAllByText(/On Leave/i).length).toBeGreaterThan(1);
    expect(screen.getByText(/No employees found/i)).not.toBeInTheDocument();
  });
});
