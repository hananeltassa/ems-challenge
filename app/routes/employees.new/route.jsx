import { redirect } from "react-router-dom";
import { addEmployee } from "./employeeService";
import NewEmployeePage from "./NewEmployeePage";

export async function action({ request }) {
  const formData = await request.formData();
  const employeeData = Object.fromEntries(formData);
  employeeData.start_date = new Date().toISOString().split("T")[0];

  await addEmployee(employeeData);

  return redirect("/employees");
}

export default NewEmployeePage;
