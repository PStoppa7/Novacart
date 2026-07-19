import { useEffect, useState } from "react";
import axios from "axios";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import {
  FiShoppingBag,
  FiUsers,
  FiPackage,
  FiDollarSign,
} from "react-icons/fi";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

      setStats(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#9333ea",
  "#ea580c",
  "#0891b2",
  "#f59e0b",
];

  return (
    <div className="space-y-8 p-8">

      <div>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome back, Admin 👋
        </p>
      </div>

      {/* Statistics */}
{/* Statistics */}

<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

  <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white shadow-lg transition hover:scale-105">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-blue-100">
          Products
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          {stats.totalProducts}
        </h2>

      </div>

      <FiPackage size={42} />

    </div>

  </div>

  <div className="rounded-2xl bg-gradient-to-r from-green-500 to-green-700 p-6 text-white shadow-lg transition hover:scale-105">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-green-100">
          Customers
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          {stats.totalCustomers}
        </h2>

      </div>

      <FiUsers size={42} />

    </div>

  </div>

  <div className="rounded-2xl bg-gradient-to-r from-purple-500 to-purple-700 p-6 text-white shadow-lg transition hover:scale-105">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-purple-100">
          Orders
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          {stats.totalOrders}
        </h2>

      </div>

      <FiShoppingBag size={42} />

    </div>

  </div>

  <div className="rounded-2xl bg-gradient-to-r from-red-500 to-red-700 p-6 text-white shadow-lg transition hover:scale-105">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-red-100">
          Revenue
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          R{stats.revenue.toFixed(2)}
        </h2>

      </div>

      <FiDollarSign size={42} />

    </div>

  </div>

</div>
{/* Sales Overview */}

<div className="rounded-xl bg-white p-6 shadow">

  <h2 className="mb-6 text-2xl font-bold">
    Sales Overview
  </h2>

  <div className="h-80">

    <ResponsiveContainer
      width="100%"
      height="100%"
    >

      <LineChart
        data={stats.salesChart}
      >

        <CartesianGrid
          strokeDasharray="3 3"
        />

        <XAxis
          dataKey="date"
        />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#2563eb"
          strokeWidth={3}
        />

      </LineChart>

    </ResponsiveContainer>

  </div>

</div>

{/* Product Categories */}

<div className="rounded-2xl bg-white p-6 shadow">

  <h2 className="mb-6 text-2xl font-bold">
    Product Categories
  </h2>

  <div className="h-96">

    <ResponsiveContainer width="100%" height="100%">


      <PieChart>

       <Pie
  data={stats.categoryStats.map((item) => ({
    ...item,
    total: Number(item.total),
  }))}
  dataKey="total"
  nameKey="category"
  cx="50%"
  cy="50%"
  outerRadius={120}
  fill="#8884d8"
  label
>
  {stats.categoryStats.map((entry, index) => (
    <Cell
      key={`cell-${index}`}
      fill={COLORS[index % COLORS.length]}
    />
  ))}
</Pie>

        <Tooltip />

        <Legend />

      </PieChart>

    </ResponsiveContainer>

  </div>

</div>

      {/* Recent Orders */}

      <div className="rounded-xl bg-white p-6 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          Recent Orders
        </h2>

        <table className="min-w-full">

          <thead className="border-b">

            <tr>

              <th className="py-3 text-left">
                Order
              </th>

              <th className="text-left">
                Customer
              </th>

              <th className="text-left">
                Total
              </th>

              <th className="text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {stats.recentOrders.map((order) => (

              <tr
                key={order.id}
                className="border-b"
              >

                <td className="py-4">
                  #{order.id}
                </td>

                <td>
                  {order.full_name}
                </td>

                <td>
                  R{Number(order.total).toFixed(2)}
                </td>

                <td>
                  {order.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Bottom Grid */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Low Stock */}

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-5 text-2xl font-bold">
            Low Stock Products
          </h2>

          {stats.lowStock.length === 0 ? (

            <p className="text-green-600">
              ✅ No products are running low.
            </p>

          ) : (

            stats.lowStock.map((product) => (

              <div
                key={product.id}
                className="mb-3 flex justify-between border-b pb-3"
              >
                <span>{product.name}</span>

                <span className="font-bold text-red-600">
                  {product.stock} left
                </span>

              </div>

            ))

          )}

        </div>

        {/* Customers */}

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-5 text-2xl font-bold">
            Latest Customers
          </h2>

          {stats.latestCustomers.map((customer) => (

            <div
              key={customer.id}
              className="mb-4 border-b pb-4"
            >

              <p className="font-bold">
                {customer.name}
              </p>

              <p className="text-gray-500">
                {customer.email}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;