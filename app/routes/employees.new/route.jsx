import { redirect } from "react-router-dom";
import { addEmployee } from "../../services/addEmployee";
import NewEmployeeForm from "../../pages/Employees/NewEmployee";

export async function action({ request }) {
  const formData = await request.formData();
  const employeeData = Object.fromEntries(formData);

  employeeData.salary = parseInt(employeeData.salary, 10);
  
  if (!employeeData.full_name || !employeeData.email || !employeeData.phone || 
      !employeeData.date_of_birth || !employeeData.job_title || 
      !employeeData.department || !employeeData.salary || !employeeData.start_date) {
    return new Response("All fields except end date are required!", { status: 400 });
  }

  if (employeeData.salary < 30000) {
    return new Response("Salary must be at least 30,000!", { status: 400 });
  }
  
  const startDate = new Date(employeeData.start_date);
  const endDate = employeeData.end_date ? new Date(employeeData.end_date) : null;

  if (endDate && endDate <= startDate) {
    return new Response("End date must be after the start date!", { status: 400 });
  }

  await addEmployee(employeeData);

  return redirect("/employees");
}

export default NewEmployeeForm;