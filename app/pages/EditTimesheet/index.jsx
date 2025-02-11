import { useLoaderData, Form } from "react-router-dom";

export default function TimesheetPage() {
  const { timesheet, employees } = useLoaderData();

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-white">
        {timesheet ? "Edit Timesheet" : "New Timesheet"}
      </h1>

      <Form method="post" className="mt-4 flex flex-col gap-4">
        <label>Employee:</label>
        <select
          name="employee_id"
          required
          defaultValue={timesheet?.employee_id || ""}
          className="px-4 py-2 rounded-md bg-gray-800 text-white"
        >
          <option value="" disabled>Select an Employee</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.full_name}
            </option>
          ))}
        </select>

        <label>Start Time:</label>
        <input
          type="datetime-local"
          name="start_time"
          required
          defaultValue={timesheet?.start_time || ""}
          className="px-4 py-2 rounded-md bg-gray-800 text-white"
        />

        <label>End Time:</label>
        <input
          type="datetime-local"
          name="end_time"
          required
          defaultValue={timesheet?.end_time || ""}
          className="px-4 py-2 rounded-md bg-gray-800 text-white"
        />

        <label>Summary:</label>
        <textarea
          name="summary"
          defaultValue={timesheet?.summary || ""}
          className="px-4 py-2 rounded-md bg-gray-800 text-white"
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {timesheet ? "Update Timesheet" : "Create Timesheet"}
        </button>
      </Form>

      <ul className="mt-6 flex justify-between text-blue-400">
        <li><a href="/timesheets" className="hover:underline">⬅ Back to Timesheets</a></li>
        <li><a href="/timesheets/new" className="hover:underline">➕ New Timesheet</a></li>
        <li><a href="/employees" className="hover:underline">👥 View Employees</a></li>
      </ul>
    </div>
  );
}


