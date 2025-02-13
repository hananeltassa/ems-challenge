import { Form } from "react-router-dom";
import { useState } from "react";

export default function NewEmployeeForm() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateWarning, setDateWarning] = useState("");

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);

    if (endDate && new Date(newStartDate) > new Date(endDate)) {
      setDateWarning("End Date must be after Start Date!");
    } else {
      setDateWarning("");
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);

    if (startDate && new Date(newEndDate) < new Date(startDate)) {
      setDateWarning("End Date must be after Start Date!");
    } else {
      setDateWarning("");
    }
  };

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
          { id: "salary", label: "Salary", type: "number", min: "30000" }
        ].map(({ id, label, type, min }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-white">{label}</label>
            <input 
              type={type} name={id} id={id} required 
              min={min || undefined}
              className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500"
            />
          </div>
        ))}

        <div>
          <label htmlFor="start_date" className="block text-white">Start Date</label>
          <input 
            type="date" name="start_date" id="start_date" required 
            value={startDate}
            onChange={handleStartDateChange}
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="end_date" className="block text-white">End Date (Optional)</label>
          <input 
            type="date" name="end_date" id="end_date" 
            value={endDate}
            onChange={handleEndDateChange}
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500"
          />
          {dateWarning && <p className="text-yellow-400 mt-1">{dateWarning}</p>}
        </div>

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