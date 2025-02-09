import { useLoaderData, useSearchParams, Form } from "react-router-dom";
import EmployeeTable from "./EmployeeTable";

export default function EmployeesPage() {
  const { employees, search, sort } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setSearchParams({ search: formData.get("search") || "", sort });
  };

  const handleSort = (sortKey) => setSearchParams({ search, sort: sortKey });

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center">Employees</h1>

      {/* Search Bar */}
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

      {/* Sorting Buttons */}
      <div className="flex gap-4 mt-4">
        {["full_name", "job_title", "department"].map((sortKey) => (
          <button
            key={sortKey}
            onClick={() => handleSort(sortKey)}
            className="bg-gray-700 px-3 py-1 rounded-md text-white"
          >
            Sort by {sortKey.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* 📋 Employees Table */}
      <EmployeeTable employees={employees} />
    </div>
  );
}
