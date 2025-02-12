import { Form, Link } from "react-router-dom";

export default function TimesheetEditForm({ timesheet, employees, actionData }) {
  if (!timesheet) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-white">Edit Timesheet</h1>
      <h2 className="text-lg text-gray-300">Employee: {timesheet.employeeName}</h2>
      {actionData?.error && <p className="text-red-500">{actionData.error}</p>}

      <Form method="post" className="mt-4 flex flex-col gap-4">
        <label className="text-white">Employee:</label>
        <select name="employee_id" defaultValue={timesheet.employeeId} required className="px-4 py-2 rounded-md bg-gray-800 text-white">
          {employees.map(({ id, full_name }) => (
            <option key={id} value={id}>{full_name}</option>
          ))}
        </select>

        <label className="text-white">Start Time:</label>
        <input type="datetime-local" name="start_time" defaultValue={timesheet.start_time} required className="px-4 py-2 rounded-md bg-gray-800 text-white" />

        <label className="text-white">End Time:</label>
        <input type="datetime-local" name="end_time" defaultValue={timesheet.end_time} required className="px-4 py-2 rounded-md bg-gray-800 text-white" />

        <label className="text-white">Summary:</label>
        <textarea name="summary" defaultValue={timesheet.summary} className="px-4 py-2 rounded-md bg-gray-800 text-white" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Update Timesheet
        </button>
      </Form>

      <ul className="mt-6 flex justify-between text-blue-400">
        <li><Link to="/timesheets" className="hover:underline">⬅ Back to Timesheets</Link></li>
        <li><Link to={`/employees/${timesheet.employeeId}`} className="hover:underline">👤 View Employee</Link></li>
      </ul>
    </div>
  );
}