import { getDB } from "../../db/getDB";
import { redirect } from "react-router-dom";

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
  await db.run(
    `UPDATE employees SET full_name = ?, email = ?, phone = ?, job_title = ?, department = ?, salary = ? WHERE id = ?`,
    [updatedEmployee.full_name, updatedEmployee.email, updatedEmployee.phone, updatedEmployee.job_title, updatedEmployee.department, updatedEmployee.salary, params.employeeId]
  );

  return redirect(`/employees`);
}
