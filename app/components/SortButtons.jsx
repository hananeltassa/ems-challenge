export default function SortButtons({ sortOptions, activeSort, onSort }) {
    return (
      <div className="flex gap-4 mt-4">
        {sortOptions.map((sortKey) => (
          <button
            key={sortKey}
            onClick={() => onSort(sortKey)}
            className={`px-3 py-1 rounded-md text-white ${
              activeSort === sortKey ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Sort by {sortKey.replace("_", " ")}
          </button>
        ))}
      </div>
    );
}  