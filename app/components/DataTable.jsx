import { Link } from "react-router-dom";

export default function DataTable({ columns, data, rowType, totalPages, currentPage, onPageChange }) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full bg-gray-800 text-white rounded-lg">
        <thead>
          <tr className="border-b border-gray-600">
            {columns.map((column) => (
              <th key={column.key} className="p-3">{column.label}</th>
            ))}
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row.id} className="border-b border-gray-600">
                {columns.map((column) => (
                  <td key={column.key} className="p-3">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
                <td className="p-3">
                  <Link to={`/${rowType}/${row.id}`} className="text-blue-400 hover:underline">
                    {rowType === "employees" ? "View/Edit" : "Edit"}
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4 text-gray-400">
                No {rowType} found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-4 py-2 rounded-md ${currentPage === pageNum ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}