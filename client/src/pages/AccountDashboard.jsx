import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function AccountDashboard() {
    const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] = useState({
    totalOrders: 0,
    wishlistItems: 0,
    reviewsWritten: 0,
    totalSpent: 0,
    recentOrders: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/account/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDashboard({
        totalOrders: res.data.totalOrders || 0,
        wishlistItems: res.data.wishlistItems || 0,
        reviewsWritten: res.data.reviewsWritten || 0,
        totalSpent: res.data.totalSpent || 0,
        recentOrders: res.data.recentOrders || [],
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-center text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-8">

      <h1 className="mb-2 text-4xl font-bold">
        My Account
      </h1>

      <p className="mb-10 text-gray-500">
        Welcome back to NovaCart.
      </p>

      {/* Summary Cards */}
      <div className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl bg-blue-600 p-6 text-white shadow-lg">
          <h2 className="text-lg font-semibold">
            Total Orders
          </h2>

          <p className="mt-4 text-5xl font-bold">
            {dashboard.totalOrders}
          </p>
        </div>

        <div className="rounded-2xl bg-pink-500 p-6 text-white shadow-lg">
          <h2 className="text-lg font-semibold">
            Wishlist
          </h2>

          <p className="mt-4 text-5xl font-bold">
            {dashboard.wishlistItems}
          </p>
        </div>

        <div className="rounded-2xl bg-yellow-500 p-6 text-white shadow-lg">
          <h2 className="text-lg font-semibold">
            Reviews
          </h2>

          <p className="mt-4 text-5xl font-bold">
            {dashboard.reviewsWritten}
          </p>
        </div>

        <div className="rounded-2xl bg-green-600 p-6 text-white shadow-lg">
          <h2 className="text-lg font-semibold">
            Total Spent
          </h2>

          <p className="mt-4 text-4xl font-bold">
            R{Number(dashboard.totalSpent).toFixed(2)}
          </p>
        </div>

      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl bg-white p-8 shadow-lg">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Recent Orders
          </h2>
<button
  onClick={() => navigate("/my-orders")}
  className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
>
  View All
</button>

        </div>
                {dashboard.recentOrders.length === 0 ? (

          <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">
            You haven't placed any orders yet.
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="border-b bg-gray-50">

                <tr>

                  <th className="px-4 py-3 text-left">
                    Order #
                  </th>

                  <th className="px-4 py-3 text-left">
                    Date
                  </th>

                  <th className="px-4 py-3 text-left">
                    Total
                  </th>

                  <th className="px-4 py-3 text-left">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {dashboard.recentOrders.map((order) => (

                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="px-4 py-4 font-medium">
                      #{order.id}
                    </td>

                    <td className="px-4 py-4">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-4 font-semibold">
                      R{Number(order.total).toFixed(2)}
                    </td>

                    <td className="px-4 py-4">

                      <span
                        className={`rounded-full px-4 py-1 text-sm font-semibold text-white ${
                          order.status === "Delivered"
                            ? "bg-green-600"
                            : order.status === "Paid"
                            ? "bg-blue-600"
                            : order.status === "Cancelled"
                            ? "bg-red-600"
                            : "bg-yellow-500"
                        }`}
                      >
                        {order.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

  {/* Dashboard Widgets */}
<div className="mt-10 grid gap-8 lg:grid-cols-2">

              {/* Wishlist Preview */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">

          <h2 className="mb-6 text-2xl font-bold">
            ❤️ Wishlist
          </h2>

          <div className="space-y-4">

            {dashboard.wishlistItems === 0 ? (

              <div className="rounded-xl border border-dashed p-6 text-center text-gray-500">
                Your wishlist is empty.
              </div>

            ) : (

              <>
                <p className="text-gray-600">
                  You currently have
                </p>

                <h3 className="text-5xl font-bold text-pink-600">
                  {dashboard.wishlistItems}
                </h3>

                <p className="text-gray-500">
                  products saved for later.
                </p>

              </>

            )}

          </div>

        </div>

        {/* Reviews */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">

          <h2 className="mb-6 text-2xl font-bold">
            ⭐ Product Reviews
          </h2>

          <div className="space-y-4">

            <h3 className="text-5xl font-bold text-yellow-500">
              {dashboard.reviewsWritten}
            </h3>

            <p className="text-gray-500">
              Reviews you've written.
            </p>

          </div>

        </div>

        {/* Recently Viewed */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">

          <h2 className="mb-6 text-2xl font-bold">
            👀 Recently Viewed
          </h2>

          <div className="rounded-xl border border-dashed p-8 text-center text-gray-500">
            Recently viewed products will appear here.
          </div>

        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">

          <h2 className="mb-6 text-2xl font-bold">
            ⚡ Quick Actions
          </h2>

          <div className="grid gap-4">
<button
  onClick={() => navigate("/shop")}
  className="rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700"
>
  Continue Shopping
</button>

<button
  onClick={() => navigate("/my-orders")}
  className="rounded-xl bg-green-600 py-4 font-semibold text-white transition hover:bg-green-700"
>
  View My Orders
</button>

<button
  onClick={() => navigate("/profile")}
  className="rounded-xl bg-purple-600 py-4 font-semibold text-white transition hover:bg-purple-700"
>
  Edit Profile
</button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AccountDashboard;