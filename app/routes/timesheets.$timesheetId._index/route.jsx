import { useLoaderData, useActionData, redirect } from "react-router-dom";
import { getTimesheetById, getEmployees, updateTimesheet } from "../../services/timesheetService";
import TimesheetEditForm from "../../pages/Timesheets/TimesheetEditForm";

export async function loader({ params }) {
  return {
    timesheet: await getTimesheetById(params.timesheetId),
    employees: await getEmployees(),
  };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time");
  const employee_id = formData.get("employee_id");
  const summary = formData.get("summary") || null;

  if (new Date(start_time) >= new Date(end_time)) {
    return { error: "Start time must be before end time." };
  }

  await updateTimesheet(params.timesheetId, { start_time, end_time, employee_id, summary });
  return redirect("/timesheets");
}

export default function TimesheetEditPage() {
  const { timesheet, employees } = useLoaderData();
  const actionData = useActionData();

  return <TimesheetEditForm timesheet={timesheet} employees={employees} actionData={actionData} />;
}
