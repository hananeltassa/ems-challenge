import { getDB } from "../db/getDB";

export async function addEmployee(employeeData) {
  const { full_name, email, phone, date_of_birth, job_title, department, salary, start_date, end_date } = employeeData;

  if (!full_name || !email || !phone || !date_of_birth || !job_title || !department || !salary || !start_date) {
    return new Response("All fields except end date are required!", { status: 400 });
  }

  if (salary < 30000) {
    return new Response("Salary must be at least 30,000!", { status: 400 });
  }

  const startDateObj = new Date(start_date);
  const endDateObj = end_date ? new Date(end_date) : null;

  if (endDateObj && endDateObj <= startDateObj) {
    return new Response("End date must be after the start date!", { status: 400 });
  }

  const db = await getDB();
  await db.run(
    `INSERT INTO employees (full_name, email, phone, date_of_birth, job_title, department, salary, start_date, end_date) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [full_name, email, phone, date_of_birth, job_title, department, salary, start_date, end_date || null]
  );
}
