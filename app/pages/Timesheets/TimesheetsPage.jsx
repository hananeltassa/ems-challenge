import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import DataTable from "../../components/DataTable";
import { formatToScheduleX } from "../../utils/dateUtils";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import "@schedule-x/theme-default/dist/index.css";

export default function TimesheetsPage() {
  const { timesheets } = useLoaderData();
  const [view, setView] = useState("table");


  const calendarEvents = timesheets.map((timesheet) => ({
    id: timesheet.id.toString(),
    title: `Timesheet: ${timesheet.full_name}`,
    start: formatToScheduleX(timesheet.start_time),
    end: formatToScheduleX(timesheet.end_time),
  }));

  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: calendarEvents,
    plugins: [eventsService],
  });

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-md">
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
        <DataTable
          columns={[
            { key: "full_name", label: "Employee" },
            { key: "start_time", label: "Start Time", render: (value) => formatToScheduleX(value) },
            { key: "end_time", label: "End Time", render: (value) => formatToScheduleX(value) },
          ]}
          data={timesheets}
          rowType="timesheets"
        />
      ) : (
        <div className="mt-6 bg-white p-4 rounded-md shadow-md">
          {calendarEvents.length > 0 ? (
            <ScheduleXCalendar calendarApp={calendar} />
          ) : (
            <p className="text-gray-700 text-center">No timesheets available.</p>
          )}
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