export default function SearchBar({ placeholder, defaultValue, onSearch }) {
    const handleSubmit = (event) => {
      event.preventDefault();
      onSearch(event.target.search.value);
    };
  
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <input
          type="text"
          name="search"
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="px-4 py-2 rounded-md bg-gray-800 text-white w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          🔍 Search
        </button>
      </form>
    );
  }  