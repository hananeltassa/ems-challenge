import { getDB } from "../../db/getDB";

export async function loader({ request }) {
  const db = await getDB();
  const url = new URL(request.url);

  const search = url.searchParams.get("search")?.toLowerCase() || "";
  const sort = url.searchParams.get("sort") || "id";

  let query = `SELECT id, full_name, email, job_title, department FROM employees`;
  let params = [];

  if (search) {
    query += ` WHERE LOWER(full_name) LIKE ? OR LOWER(email) LIKE ? OR LOWER(job_title) LIKE ? OR LOWER(department) LIKE ?`;
    params = [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`];
  }

  query += ` ORDER BY ${sort} ASC`;
  const employees = await db.all(query, params);

  return { employees, search, sort };
}