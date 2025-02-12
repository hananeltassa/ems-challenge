import { useLoaderData, useSearchParams, Link } from "react-router-dom";
import DataTable from "../../components/DataTable";
import SearchBar from "../../components/SearchBar";

export default function EmployeesPage() {
  const { employees, totalPages } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "full_name";
  const department = searchParams.get("department") || "";
  const page = Number(searchParams.get("page")) || 1;

  const handleSearch = (query) => setSearchParams({ search: query, sort, department, page: 1 });
  const handleSort = (sortKey) => setSearchParams({ search, sort: sortKey, department, page });
  const handleFilter = (department) => setSearchParams({ search, sort, department, page: 1 });
  const handlePageChange = (newPage) => setSearchParams({ search, sort, department, page: newPage });

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

      <div className="flex gap-4 mt-4">
        <select value={sort} onChange={(e) => handleSort(e.target.value)} className="px-3 py-2 rounded-md bg-gray-700 text-white">
          <option value="full_name">Sort by Full Name</option>
          <option value="job_title">Sort by Job Title</option>
          <option value="department">Sort by Department</option>
        </select>

        <select value={department} onChange={(e) => handleFilter(e.target.value)} className="px-3 py-2 rounded-md bg-gray-700 text-white">
          <option value="">All Departments</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
        </select>
      </div>

      <DataTable columns={columns} data={employees} rowType="employees" totalPages={totalPages} currentPage={page} onPageChange={handlePageChange}/>

    </div>
  );
}
