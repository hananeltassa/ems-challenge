import { getTimesheets } from "../../services/timesheetService";
import TimesheetsPage from "../../pages/Timesheets/TimesheetsPage";

export async function loader() {
  const timesheets = await getTimesheets();
  return { timesheets };
}

export default TimesheetsPage;
