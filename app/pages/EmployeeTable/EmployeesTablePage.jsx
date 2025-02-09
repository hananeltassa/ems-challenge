import { useLoaderData, useSearchParams, Form, Link } from "react-router-dom";
import EmployeeTable from "../../components/EmployeeTable";

export default function EmployeesPage() {
  const { employees } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "full_name";

  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setSearchParams({ search: formData.get("search") || "", sort });
  };

  const handleSort = (sortKey) => {
    console.log("🛠️ Changing Sort Field to:", sortKey);
    setSearchParams({ search, sort: sortKey });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-white">Employees</h1>

      <div className="flex justify-end mt-4">
        <Link
          to="/employees/new"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          ➕ Create New Employee
        </Link>
      </div>

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
        {["full_name", "job_title", "department"].map((sortKey) => (
          <button
            key={sortKey}
            onClick={() => handleSort(sortKey)}
            className={`px-3 py-1 rounded-md text-white ${
              sort === sortKey ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Sort by {sortKey.replace("_", " ")}
          </button>
        ))}
      </div>

      <EmployeeTable employees={employees} />
    </div>
  );
}
