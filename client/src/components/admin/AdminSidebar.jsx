import {
  FiHome,
  FiBox,
  FiPlusSquare,
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiSettings,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/admin", icon: FiHome },
  { name: "Products", path: "/admin/products", icon: FiBox },
  { name: "Add Product", path: "/admin/add-product", icon: FiPlusSquare },
  { name: "Categories", path: "/admin/categories", icon: FiGrid },
  { name: "Orders", path: "/admin/orders", icon: FiShoppingBag },
  { name: "Customers", path: "/admin/customers", icon: FiUsers },
  { name: "Settings", path: "/admin/settings", icon: FiSettings },
];

function AdminSidebar() {
  return (
    <aside className="w-72 bg-slate-900 text-white">
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-3xl font-bold text-blue-400">
          NovaCart
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Admin Dashboard
        </p>
      </div>

      <nav className="mt-6 flex flex-col gap-2 px-4">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default AdminSidebar;