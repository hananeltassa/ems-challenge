import { Link } from "react-router-dom";

export default function EmployeeTable({ employees }) {
  return (
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
        {employees.length > 0 ? (
          employees.map((employee) => (
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
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center py-4 text-gray-400">
              No employees found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}