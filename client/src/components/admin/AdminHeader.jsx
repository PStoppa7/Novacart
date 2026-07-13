import { FiBell, FiSearch, FiUser } from "react-icons/fi";

function AdminHeader() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-5">
      <h2 className="text-2xl font-bold">
        Admin Panel
      </h2>

      <div className="flex items-center gap-6">
        <FiSearch size={22} className="cursor-pointer" />
        <FiBell size={22} className="cursor-pointer" />
        <FiUser size={22} className="cursor-pointer" />
      </div>
    </header>
  );
}

export default AdminHeader;