import EmployeesPage from "../../pages/EmployeeTable/EmployeesTablePage";
import { getDB } from "../../db/getDB";

export async function loader({ request }) {
    const db = await getDB();
    const url = new URL(request.url);
  
    const search = url.searchParams.get("search")?.toLowerCase() || "";
    const sort = url.searchParams.get("sort") || "full_name";
    const department = url.searchParams.get("department") || "";
    const page = Number(url.searchParams.get("page")) || 1;
    const pageSize = 5;
    const offset = (page - 1) * pageSize;
  
    let query = `SELECT id, full_name, email, job_title, department FROM employees WHERE 1=1`;
    let params = [];
  
    if (search) {
      query += ` AND (LOWER(full_name) LIKE ? OR LOWER(email) LIKE ? OR LOWER(job_title) LIKE ? OR LOWER(department) LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }
  
    if (department) {
      query += ` AND department = ?`;
      params.push(department);
    }
  
    query += ` ORDER BY ${sort} COLLATE NOCASE ASC LIMIT ? OFFSET ?`;
    params.push(pageSize, offset);
  
    const employees = await db.all(query, params);
    const totalEmployees = await db.get(`SELECT COUNT(*) as count FROM employees WHERE department LIKE ?`, [`%${department}%`]);
    const totalPages = Math.ceil(totalEmployees.count / pageSize);
  
    return { employees, totalPages };
}

export default EmployeesPage;