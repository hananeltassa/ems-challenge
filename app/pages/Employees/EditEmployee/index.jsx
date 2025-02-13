import { useLoaderData, Form } from "react-router-dom";

export default function EmployeePage() {
  const { employee } = useLoaderData();

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-white mb-6">Edit Employee</h1>

      <Form method="post" encType="multipart/form-data" className="flex flex-col gap-6">

        {employee.photo && (
          <div className="mt-4 flex flex-col items-center">
            <img src={employee.photo} alt="Employee" 
              className="w-32 h-32 rounded-full shadow-md border-2 border-gray-700" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-white">Full Name:</label>
            <input type="text" name="full_name" defaultValue={employee.full_name} required 
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500" />
          </div>

          <div>
            <label className="text-white">Email:</label>
            <input type="email" name="email" defaultValue={employee.email} required 
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500" />
          </div>
        </div>

        <div>
          <label className="text-white">Date of Birth:</label>
          <input 
            type="date" name="date_of_birth" defaultValue={employee.date_of_birth} required 
            max={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-white">Phone:</label>
            <input type="text" name="phone" defaultValue={employee.phone} required 
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500" />
          </div>

          <div>
            <label className="text-white">Job Title:</label>
            <input type="text" name="job_title" defaultValue={employee.job_title} required 
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-white">Department:</label>
            <input type="text" name="department" defaultValue={employee.department} required 
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500" />
          </div>

          <div>
            <label className="text-white">Salary:</label>
            <input type="number" name="salary" defaultValue={employee.salary} required min="30000" 
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-white">Start Date:</label>
            <input type="date" name="start_date" defaultValue={employee.start_date} required 
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500" />
          </div>

          <div>
            <label className="text-white">End Date:</label>
            <input type="date" name="end_date" defaultValue={employee.end_date || ""} 
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500" />
          </div>
        </div>

        <div>
          <label className="text-white">Upload Employee Photo:</label>
          <input type="file" name="photo" accept="image/*" 
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700" />
        </div>

        <button type="submit" className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold text-lg rounded-md hover:bg-blue-700 transition">
          Update Employee
        </button>
      </Form>

      <div className="mt-6 flex flex-wrap justify-between text-blue-400 text-sm">
        <a href="/employees" className="hover:underline flex items-center">⬅ Back to Employees</a>
        <a href="/employees/new" className="hover:underline flex items-center">➕ New Employee</a>
        <a href="/timesheets/" className="hover:underline flex items-center">📅 View Timesheets</a>
      </div>
    </div>
  );
}
