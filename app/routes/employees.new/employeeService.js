import { getDB } from "../../db/getDB";

export async function addEmployee(employeeData) {
  const { full_name, email, phone, date_of_birth, job_title, department, salary, start_date } = employeeData;

  if (!full_name || !email || !phone || !date_of_birth || !job_title || !department || !salary) {
    return new Response("All fields are required!", { status: 400 });
  }

  const db = await getDB();
  await db.run(
    `INSERT INTO employees (full_name, email, phone, date_of_birth, job_title, department, salary, start_date) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [full_name, email, phone, date_of_birth, job_title, department, salary, start_date]
  );
}
