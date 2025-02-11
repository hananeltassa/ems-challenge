import { getDB } from "../db/getDB";
import { redirect } from "react-router-dom";
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


export async function loader({ params }) {
  const db = await getDB();
  const employee = await db.get("SELECT * FROM employees WHERE id = ?", params.employeeId);

  if (!employee) {
    throw new Response("Employee Not Found", { status: 404 });
  }

  return { employee };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedEmployee = {
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    job_title: formData.get("job_title"),
    department: formData.get("department"),
    salary: formData.get("salary"),
  };

  const db = await getDB();

  const photoFile = formData.get("photo");

  if (photoFile && photoFile.size > 0) {
    const photoPath = path.join(UPLOADS_DIR, `${params.employeeId}_photo${path.extname(photoFile.name)}`);
    
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
      params.employeeId
    ]
  );

  return redirect(`/employees`);
}