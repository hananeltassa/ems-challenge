import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import DataTable from "../../components/DataTable";

export default function TimesheetsPage() {
  const { timesheets } = useLoaderData();
  const [view, setView] = useState("table");

  const columns = [
    { key: "full_name", label: "Employee" },
    { key: "start_time", label: "Start Time", render: (value) => new Date(value).toLocaleString() },
    { key: "end_time", label: "End Time", render: (value) => new Date(value).toLocaleString() },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-white text-center">Timesheets</h1>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setView("table")}
          className={`px-4 py-2 rounded-md ${view === "table" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
        >
          Table View
        </button>
        <button
          onClick={() => setView("calendar")}
          className={`px-4 py-2 rounded-md ${view === "calendar" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
        >
          Calendar View
        </button>
      </div>

      {view === "table" ? (
        <DataTable columns={columns} data={timesheets} rowType="timesheets" />
      ) : (
        <div className="mt-6 text-center text-gray-300">
          <p>To be implemented</p>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <Link to="/timesheets/new" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
          ➕ New Timesheet
        </Link>
        <Link to="/employees" className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md">
          👥 View Employees
        </Link>
      </div>
    </div>
  );
}