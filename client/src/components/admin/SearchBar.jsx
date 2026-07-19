import { FiSearch } from "react-icons/fi";

function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <FiSearch className="absolute left-4 top-3 text-gray-400" />

      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border py-2 pl-10 pr-4 outline-none focus:border-blue-500"
      />
    </div>
  );
}

export default SearchBar;