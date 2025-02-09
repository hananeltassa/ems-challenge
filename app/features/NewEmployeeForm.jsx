import { Form } from "react-router-dom";

export default function NewEmployeeForm() {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-white text-center">Create New Employee</h1>

      <Form method="post" className="mt-6 flex flex-col gap-4">
        {[
          { id: "full_name", label: "Full Name", type: "text" },
          { id: "email", label: "Email", type: "email" },
          { id: "phone", label: "Phone", type: "text" },
          { id: "date_of_birth", label: "Date of Birth", type: "date" },
          { id: "job_title", label: "Job Title", type: "text" },
          { id: "department", label: "Department", type: "text" },
          { id: "salary", label: "Salary", type: "number" }
        ].map(({ id, label, type }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-white">{label}</label>
            <input type={type} name={id} id={id} required className="w-full p-2 rounded-md bg-gray-800 text-white" />
          </div>
        ))}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full">
          ➕ Create Employee
        </button>
      </Form>

      <ul className="mt-6 flex justify-between text-blue-400">
        <li><a href="/employees" className="hover:underline">⬅ Back to Employees</a></li>
        <li><a href="/timesheets" className="hover:underline">📅 View Timesheets</a></li>
      </ul>
    </div>
  );
}
