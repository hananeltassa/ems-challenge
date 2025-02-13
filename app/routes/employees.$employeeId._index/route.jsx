import { redirect } from "react-router-dom";
import { getEmployeeById, updateEmployee } from "../../services/employeeService";
import EmployeePage from "../../pages/Employees/EditEmployee";

export async function loader({ params }) {
  const employee = await getEmployeeById(params.employeeId);

  if (!employee) {
    throw new Response("Employee Not Found", { status: 404 });
  }

  return { employee };
}

export async function action({ request, params }) {
  const formData = await request.formData();

  const startDate = formData.get("start_date");
  const endDate = formData.get("end_date");

  if (endDate && new Date(endDate) <= new Date(startDate)) {
    return new Response("End Date must be after Start Date", { status: 400 });
  }

  await updateEmployee(params.employeeId, formData);
  return redirect(`/employees`);
}

export default EmployeePage;