import { Link } from "react-router-dom";

export default function TimesheetTable({ timesheets }) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full bg-gray-800 text-white rounded-lg">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="p-3">Employee</th>
            <th className="p-3">Start Time</th>
            <th className="p-3">End Time</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {timesheets.map((timesheet) => (
            <tr key={timesheet.id} className="border-b border-gray-600">
              <td className="p-3">{timesheet.full_name}</td>
              <td className="p-3">{new Date(timesheet.start_time).toLocaleString()}</td>
              <td className="p-3">{new Date(timesheet.end_time).toLocaleString()}</td>
              <td className="p-3">
                <Link to={`/timesheets/${timesheet.id}`} className="text-blue-400 hover:underline">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
