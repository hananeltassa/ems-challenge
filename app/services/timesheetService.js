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
