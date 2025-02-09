import { useLoaderData, Link, useSearchParams, Form } from "react-router-dom";
import { getDB } from "../../db/getDB";


export async function loader({ request }) {
  const db = await getDB();
  const url = new URL(request.url);

  const search = url.searchParams.get("search") || "";
  const sort = url.searchParams.get("sort") || "id";

  console.log(`🔍 Searching for: ${search}, Sorting by: ${sort}`);

  let query = `SELECT id, full_name, email, job_title, department FROM employees`;

  if (search) {
    query += ` WHERE full_name LIKE ? OR email LIKE ? OR job_title LIKE ? OR department LIKE ?`;
  }

  query += ` ORDER BY ${sort} ASC`;

  const employees = search
    ? await db.all(query, [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`])
    : await db.all(query);

  return { employees, search, sort };
}

export default function EmployeesPage() {
  const { employees, search, sort } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setSearchParams({ search: formData.get("search"), sort });
  };

  const handleSort = (sortKey) => {
    setSearchParams({ search, sort: sortKey });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center">Employees</h1>

      <Form method="get" onSubmit={handleSearch} className="flex gap-2 mt-4">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search employees..."
          className="px-4 py-2 rounded-md bg-gray-800 text-white w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          🔍 Search
        </button>
      </Form>

      <div className="flex gap-4 mt-4">
        <button onClick={() => handleSort("full_name")} className="bg-gray-700 px-3 py-1 rounded-md text-white">
          Sort by Name
        </button>
        <button onClick={() => handleSort("job_title")} className="bg-gray-700 px-3 py-1 rounded-md text-white">
          Sort by Job Title
        </button>
        <button onClick={() => handleSort("department")} className="bg-gray-700 px-3 py-1 rounded-md text-white">
          Sort by Department
        </button>
      </div>

      <table className="mt-6 w-full border-collapse border border-gray-600">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border border-gray-600 px-4 py-2">ID</th>
            <th className="border border-gray-600 px-4 py-2">Full Name</th>
            <th className="border border-gray-600 px-4 py-2">Email</th>
            <th className="border border-gray-600 px-4 py-2">Job Title</th>
            <th className="border border-gray-600 px-4 py-2">Department</th>
            <th className="border border-gray-600 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-700">
              <td className="border border-gray-600 px-4 py-2">{employee.id}</td>
              <td className="border border-gray-600 px-4 py-2">{employee.full_name}</td>
              <td className="border border-gray-600 px-4 py-2">{employee.email}</td>
              <td className="border border-gray-600 px-4 py-2">{employee.job_title}</td>
              <td className="border border-gray-600 px-4 py-2">{employee.department}</td>
              <td className="border border-gray-600 px-4 py-2">
                <Link to={`/employees/${employee.id}`} className="text-blue-400 hover:underline">
                  View/Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
