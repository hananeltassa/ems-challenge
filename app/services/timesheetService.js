import { getDB } from "../db/getDB";
import { formatToScheduleX } from "../utils/dateUtils";

export async function getTimesheets() {
  const db = await getDB();
  const timesheets = await db.all(`
    SELECT timesheets.id, timesheets.start_time, timesheets.end_time, 
           timesheets.summary, employees.full_name, employees.id AS employee_id 
    FROM timesheets 
    JOIN employees ON timesheets.employee_id = employees.id
  `);

  return timesheets.map(ts => ({
    ...ts,
    start_time: formatToScheduleX(ts.start_time),
    end_time: formatToScheduleX(ts.end_time),
  }));
}

export async function createTimesheet(formData) {
  const db = await getDB();
  const employee_id = formData.get("employee_id");
  const start_time = formatToScheduleX(formData.get("start_time"));
  const end_time = formatToScheduleX(formData.get("end_time"));
  const summary = formData.get("summary") || null;

  if (new Date(start_time) >= new Date(end_time)) {
    throw new Error("Start time must be before end time.");
  }

  await db.run(
    "INSERT INTO timesheets (employee_id, start_time, end_time, summary) VALUES (?, ?, ?, ?)",
    [employee_id, start_time, end_time, summary]
  );
}

export async function updateTimesheet(timesheetId, { start_time, end_time, employee_id, summary }) {
  const db = await getDB();
  const formattedStartTime = formatToScheduleX(start_time);
  const formattedEndTime = formatToScheduleX(end_time);

  if (new Date(formattedStartTime) >= new Date(formattedEndTime)) {
    throw new Error("Start time must be before end time.");
  }

  await db.run(
    "UPDATE timesheets SET start_time = ?, end_time = ?, employee_id = ?, summary = ? WHERE id = ?",
    [formattedStartTime, formattedEndTime, employee_id, summary, timesheetId]
  );
}