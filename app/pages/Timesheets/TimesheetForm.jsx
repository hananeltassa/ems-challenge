import { Form } from "react-router-dom";

export default function TimesheetForm({ employees, isNew , error}) {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-white text-center">
        {isNew ? "Create New Timesheet" : "Edit Timesheet"}
      </h1>

      {error && <p className="text-red-500 text-center font-bold">{error}</p>}

      <Form method="post" className="mt-4 flex flex-col gap-4">
        
        <label className="text-white">Employee:</label>
        <select name="employee_id" required className="px-4 py-2 rounded-md bg-gray-800 text-white">
          <option value="" disabled>Select Employee</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.full_name}
            </option>
          ))}
        </select>

        
        <label className="text-white">Start Time:</label>
        <input type="datetime-local" name="start_time" required className="px-4 py-2 rounded-md bg-gray-800 text-white" />

        
        <label className="text-white">End Time:</label>
        <input type="datetime-local" name="end_time" required className="px-4 py-2 rounded-md bg-gray-800 text-white" />

        
        <label className="text-white">Summary:</label>
        <textarea name="summary" className="px-4 py-2 rounded-md bg-gray-800 text-white"></textarea>

        
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          {isNew ? "Create Timesheet" : "Update Timesheet"}
        </button>
      </Form>

      
      <div className="flex justify-between mt-6">
        <a href="/timesheets" className="text-blue-400 hover:underline">⬅ Back to Timesheets</a>
        <a href="/employees" className="text-blue-400 hover:underline">👥 View Employees</a>
      </div>
    </div>
  );
}