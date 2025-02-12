import { useLoaderData, useSearchParams, Link } from "react-router-dom";
import DataTable from "../../components/DataTable";
import SearchBar from "../../components/SearchBar";
import SortButtons from "../../components/SortButtons";

export default function EmployeesPage() {
  const { employees } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "full_name";

  const handleSearch = (query) => setSearchParams({ search: query, sort });
  const handleSort = (sortKey) => setSearchParams({ search, sort: sortKey });

  const columns = [
    { key: "id", label: "ID" },
    { key: "full_name", label: "Full Name" },
    { key: "email", label: "Email" },
    { key: "job_title", label: "Job Title" },
    { key: "department", label: "Department" },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-white">Employees</h1>

      <div className="flex justify-end mt-4">
        <Link to="/employees/new" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
          ➕ Create New Employee
        </Link>
      </div>

      <SearchBar placeholder="Search employees..." defaultValue={search} onSearch={handleSearch} />
      <SortButtons sortOptions={["full_name", "job_title", "department"]} activeSort={sort} onSort={handleSort} />

      <DataTable columns={columns} data={employees} rowType="employees" />
    </div>
  );
}
