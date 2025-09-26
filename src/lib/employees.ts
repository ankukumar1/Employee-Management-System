export type EmploymentStatus = "Active" | "On Leave" | "Terminated";

export interface Employee {
  id: string;
  fullName: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  status: EmploymentStatus;
  hireDate: string;
}

const EMPLOYEES: Employee[] = [
  {
    id: "EMP-1001",
    fullName: "Aarav Kapoor",
    role: "Engineering Manager",
    department: "Engineering",
    email: "aarav.kapoor@example.com",
    phone: "+91 98765 43210",
    location: "Bengaluru",
    status: "Active",
    hireDate: "2019-07-15",
  },
  {
    id: "EMP-1002",
    fullName: "Ishita Rao",
    role: "Senior Product Designer",
    department: "Design",
    email: "ishita.rao@example.com",
    phone: "+91 90123 45678",
    location: "Mumbai",
    status: "On Leave",
    hireDate: "2021-03-22",
  },
  {
    id: "EMP-1003",
    fullName: "Rohan Patel",
    role: "Backend Engineer",
    department: "Engineering",
    email: "rohan.patel@example.com",
    phone: "+91 91234 56789",
    location: "Ahmedabad",
    status: "Active",
    hireDate: "2020-10-01",
  },
  {
    id: "EMP-1004",
    fullName: "Meera Sharma",
    role: "HR Business Partner",
    department: "Human Resources",
    email: "meera.sharma@example.com",
    phone: "+91 93456 78901",
    location: "Delhi NCR",
    status: "Active",
    hireDate: "2018-12-05",
  },
  {
    id: "EMP-1005",
    fullName: "Kabir Singh",
    role: "Finance Analyst",
    department: "Finance",
    email: "kabir.singh@example.com",
    phone: "+91 94567 89012",
    location: "Hyderabad",
    status: "Terminated",
    hireDate: "2017-05-18",
  },
  {
    id: "EMP-1006",
    fullName: "Nisha Verma",
    role: "QA Lead",
    department: "Quality Assurance",
    email: "nisha.verma@example.com",
    phone: "+91 95678 90123",
    location: "Pune",
    status: "Active",
    hireDate: "2022-01-11",
  },
  {
    id: "EMP-1007",
    fullName: "Rahul Bhatia",
    role: "Sales Manager",
    department: "Sales",
    email: "rahul.bhatia@example.com",
    phone: "+91 96789 01234",
    location: "Chennai",
    status: "Active",
    hireDate: "2016-09-29",
  },
  {
    id: "EMP-1008",
    fullName: "Tanvi Desai",
    role: "Customer Success Specialist",
    department: "Customer Success",
    email: "tanvi.desai@example.com",
    phone: "+91 97890 12345",
    location: "Kochi",
    status: "On Leave",
    hireDate: "2023-04-03",
  },
];

export function getEmployees(): Employee[] {
  return [...EMPLOYEES].sort((a, b) => a.fullName.localeCompare(b.fullName));
}

export function findEmployeeById(id: string): Employee | undefined {
  return EMPLOYEES.find((employee) => employee.id === id);
}

export function groupEmployeesByStatus(): Record<EmploymentStatus, Employee[]> {
  return EMPLOYEES.reduce(
    (groups, employee) => {
      groups[employee.status].push(employee);
      return groups;
    },
    {
      Active: [] as Employee[],
      "On Leave": [] as Employee[],
      Terminated: [] as Employee[],
    }
  );
}
