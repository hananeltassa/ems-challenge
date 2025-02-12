import { getDB } from "../db/getDB";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, "../../public/uploads");

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

export async function getEmployeeById(employeeId) {
  const db = await getDB();
  return await db.get("SELECT * FROM employees WHERE id = ?", employeeId);
}

export async function updateEmployee(employeeId, formData) {
  const db = await getDB();
  const updatedEmployee = {
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    job_title: formData.get("job_title"),
    department: formData.get("department"),
    salary: formData.get("salary"),
  };

  const photoFile = formData.get("photo");
  if (photoFile && photoFile.size > 0) {
    const photoPath = path.join(UPLOADS_DIR, `${employeeId}_photo${path.extname(photoFile.name)}`);
    fs.writeFileSync(photoPath, Buffer.from(await photoFile.arrayBuffer()));
    updatedEmployee.photo = `/uploads/${path.basename(photoPath)}`;
  }

  await db.run(
    `UPDATE employees SET full_name = ?, email = ?, phone = ?, job_title = ?, department = ?, salary = ?, photo = ? WHERE id = ?`,
    [
      updatedEmployee.full_name,
      updatedEmployee.email,
      updatedEmployee.phone,
      updatedEmployee.job_title,
      updatedEmployee.department,
      updatedEmployee.salary,
      updatedEmployee.photo || null,
      employeeId
    ]
  );

  return updatedEmployee;
}
