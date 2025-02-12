import { Link } from "react-router-dom";

export default function DataTable({ columns, data, rowType }) {
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
    </div>
  );
}