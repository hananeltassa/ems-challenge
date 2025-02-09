import { getDB } from "../db/getDB";

export async function loader({ request }) {
  const db = await getDB();
  const url = new URL(request.url);

  const search = url.searchParams.get("search")?.toLowerCase() || "";
  const sort = url.searchParams.get("sort") || "full_name";

  let query = `SELECT id, full_name, email, job_title, department FROM employees`;
  let params = [];

  if (search) {
    query += ` WHERE LOWER(full_name) LIKE ? OR LOWER(email) LIKE ? OR LOWER(job_title) LIKE ? OR LOWER(department) LIKE ?`;
    params = [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`];
  }


  const allowedSortFields = ["id", "full_name", "email", "job_title", "department"];
  if (!allowedSortFields.includes(sort)) {
    console.warn("🚨 Invalid sort field detected:", sort);
  }

  query += ` ORDER BY ${sort} COLLATE NOCASE ASC`;

  //console.log("Backend: Final SQL Query:", query);
  //console.log("Backend: Query Parameters:", params);

  const employees = await db.all(query, params);
  return { employees, search, sort };
}