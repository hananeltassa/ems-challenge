import { useLoaderData, Link } from "react-router-dom";
import { getDB } from "~/db/getDB";

export async function loader() {
  const db = await getDB();
  const employees = await db.all("SELECT id, full_name, email, job_title, department FROM employees;");
  return { employees };
}

export default function EmployeesPage() {
  const { employees } = useLoaderData();

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center">Employees</h1>

      <div className="flex justify-between items-center mt-4">
        <Link to="/employees/new" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          ➕ Add Employee
        </Link>
        <Link to="/timesheets/" className="text-gray-300 hover:text-white">
          View Timesheets
        </Link>
      </div>

      <table className="mt-6 w-full border-collapse border border-gray-600">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border border-gray-600 px-4 py-2">ID</th>
            <th className="border border-gray-600 px-4 py-2">Full Name</th>
            <th className="border border-gray-600 px-4 py-2">Email</th>
            <th className="border border-gray-600 px-4 py-2">Job Title</th>
            <th className="border border-gray-600 px-4 py-2">Department</th>
            <th className="border border-gray-600 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee: any) => (
            <tr key={employee.id} className="hover:bg-gray-700">
              <td className="border border-gray-600 px-4 py-2">{employee.id}</td>
              <td className="border border-gray-600 px-4 py-2">{employee.full_name}</td>
              <td className="border border-gray-600 px-4 py-2">{employee.email}</td>
              <td className="border border-gray-600 px-4 py-2">{employee.job_title}</td>
              <td className="border border-gray-600 px-4 py-2">{employee.department}</td>
              <td className="border border-gray-600 px-4 py-2">
                <Link to={`/employees/${employee.id}`} className="text-blue-400 hover:underline">
                  View/Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
