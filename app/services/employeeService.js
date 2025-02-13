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

  const full_name = formData.get("full_name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const job_title = formData.get("job_title");
  const department = formData.get("department");
  const salary = parseInt(formData.get("salary"), 10);
  const start_date = formData.get("start_date");
  const end_date = formData.get("end_date");

  if (salary < 30000) {
    throw new Error("Salary must be at least 30,000.");
  }

  if (end_date && new Date(end_date) <= new Date(start_date)) {
    throw new Error("End Date must be after Start Date.");
  }

  let photoPath = null;
  const photoFile = formData.get("photo");

  if (photoFile && photoFile.size > 0) {
    const photoFileName = `${employeeId}_photo${path.extname(photoFile.name)}`;
    const fullPhotoPath = path.join(UPLOADS_DIR, photoFileName);
    
    fs.writeFileSync(fullPhotoPath, Buffer.from(await photoFile.arrayBuffer()));

    photoPath = `/uploads/${photoFileName}`;
  }

  await db.run(
    `UPDATE employees 
     SET full_name = ?, email = ?, phone = ?, job_title = ?, department = ?, salary = ?, start_date = ?, end_date = ?, photo = COALESCE(?, photo) 
     WHERE id = ?`,
    [
      full_name, email, phone, job_title, department, salary, start_date, end_date || null, 
      photoPath,
      employeeId
    ]
  );

  return {
    id: employeeId,
    full_name,
    email,
    phone,
    job_title,
    department,
    salary,
    start_date,
    end_date,
    photo: photoPath || (await getEmployeeById(employeeId)).photo
  };
}
