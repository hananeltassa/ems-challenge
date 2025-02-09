import { useLoaderData, Form, redirect } from "react-router-dom";
import { getDB } from "~/db/getDB";

export async function loader({ params }: { params: { employeeId: string } }) {
  const db = await getDB();
  const employee = await db.get("SELECT * FROM employees WHERE id = ?", params.employeeId);
  
  if (!employee) {
    throw new Response("Employee Not Found", { status: 404 });
  }

  return { employee };
}

export async function action({ request, params }: { request: Request, params: { employeeId: string } }) {
  const formData = await request.formData();
  const updatedEmployee = {
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    job_title: formData.get("job_title"),
    department: formData.get("department"),
    salary: formData.get("salary"),
  };

  const db = await getDB();
  await db.run(
    `UPDATE employees SET full_name = ?, email = ?, phone = ?, job_title = ?, department = ?, salary = ? WHERE id = ?`,
    [updatedEmployee.full_name, updatedEmployee.email, updatedEmployee.phone, updatedEmployee.job_title, updatedEmployee.department, updatedEmployee.salary, params.employeeId]
  );

  return redirect(`/employees`);
}

export default function EmployeePage() {
  const { employee } = useLoaderData();

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">Edit Employee</h1>

      <Form method="post" className="mt-4 flex flex-col gap-4">
        <label>Full Name:</label>
        <input type="text" name="full_name" defaultValue={employee.full_name} required className="px-4 py-2 rounded-md bg-gray-800 text-white"/>

        <label>Email:</label>
        <input type="email" name="email" defaultValue={employee.email} required className="px-4 py-2 rounded-md bg-gray-800 text-white"/>

        <label>Phone:</label>
        <input type="text" name="phone" defaultValue={employee.phone} required className="px-4 py-2 rounded-md bg-gray-800 text-white"/>

        <label>Job Title:</label>
        <input type="text" name="job_title" defaultValue={employee.job_title} required className="px-4 py-2 rounded-md bg-gray-800 text-white"/>

        <label>Department:</label>
        <input type="text" name="department" defaultValue={employee.department} required className="px-4 py-2 rounded-md bg-gray-800 text-white"/>

        <label>Salary:</label>
        <input type="number" name="salary" defaultValue={employee.salary} required className="px-4 py-2 rounded-md bg-gray-800 text-white"/>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Update Employee
        </button>
      </Form>

      <ul className="mt-6 flex justify-between text-blue-400">
        <li><a href="/employees" className="hover:underline">⬅ Back to Employees</a></li>
        <li><a href="/employees/new" className="hover:underline">➕ New Employee</a></li>
        <li><a href="/timesheets/" className="hover:underline">📅 View Timesheets</a></li>
      </ul>
    </div>
  );
}