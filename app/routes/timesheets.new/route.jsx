import { getEmployees, createTimesheet } from "../../services/timesheetService";
import TimesheetForm from "../../pages/Timesheets/TimesheetForm";
import { useLoaderData, redirect } from "react-router-dom";

export async function loader() {
  const employees = await getEmployees();
  return { employees };
}

export async function action({ request }) {
  const formData = await request.formData();
  const employee_id = formData.get("employee_id");
  const start_time = new Date(formData.get("start_time"));
  const end_time = new Date(formData.get("end_time"));
  const summary = formData.get("summary") || null;

  if (start_time >= end_time) {
    return new Response("End time must be after start time.", { status: 400 });
  }

  await createTimesheet(formData);
  return redirect("/timesheets");
}

export default function NewTimesheetPage() {
  const { employees } = useLoaderData();
  return <TimesheetForm employees={employees} isNew={true} />;
}
