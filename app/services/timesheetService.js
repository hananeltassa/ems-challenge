import { getDB } from "../db/getDB";

export async function getTimesheets() {
  const db = await getDB();
  return await db.all(
    `SELECT timesheets.id, timesheets.start_time, timesheets.end_time, 
            timesheets.summary, employees.full_name, employees.id AS employee_id 
     FROM timesheets 
     JOIN employees ON timesheets.employee_id = employees.id`
  );
}


export async function getEmployees() {
  const db = await getDB();
  return await db.all("SELECT id, full_name FROM employees");
}

export async function createTimesheet(formData) {
  const db = await getDB();
  const employee_id = formData.get("employee_id");
  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time");
  const summary = formData.get("summary") || null;

  await db.run(
    "INSERT INTO timesheets (employee_id, start_time, end_time, summary) VALUES (?, ?, ?, ?)",
    [employee_id, start_time, end_time, summary]
  );
}
