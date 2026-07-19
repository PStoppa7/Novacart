import { useEffect, useMemo, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders"
      );

      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id, status) {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${id}`,
        { status }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order.id === id
            ? { ...order, status }
            : order
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update order status");
    }
  }

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const term = search.toLowerCase();

      return (
        order.full_name?.toLowerCase().includes(term) ||
        order.email?.toLowerCase().includes(term) ||
        order.id.toString().includes(term)
      );
    });
  }, [orders, search]);

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (o) => o.status === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (o) => o.status === "Delivered"
  ).length;

  const revenue = orders.reduce(
    (sum, order) => sum + Number(order.total),
    0
  );

  function badge(status) {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Processing":
        return "bg-blue-100 text-blue-700";

      case "Shipped":
        return "bg-purple-100 text-purple-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  if (loading) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold">
          Loading Orders...
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">

      <div>
        <h1 className="text-4xl font-bold">
          Orders
        </h1>

        <p className="text-gray-500">
          Manage customer orders
        </p>
      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-4">

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">
            Total Orders
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {totalOrders}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">
            Pending
          </p>

          <h2 className="mt-2 text-3xl font-bold text-yellow-600">
            {pendingOrders}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">
            Delivered
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {deliveredOrders}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">
            Revenue
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            R{revenue.toFixed(2)}
          </h2>
        </div>

        {/* Order Details Modal */}
{selectedOrder && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
    <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          Order #{selectedOrder.id}
        </h2>

        <button
          onClick={() => setSelectedOrder(null)}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Close
        </button>
      </div>

      {/* Customer */}
      <div className="mb-6 rounded-xl border p-5">
        <h3 className="mb-3 text-xl font-bold">
          Customer
        </h3>

        <p>
          <strong>Name:</strong> {selectedOrder.full_name}
        </p>

        <p>
          <strong>Email:</strong> {selectedOrder.email}
        </p>

        <p>
          <strong>Phone:</strong> {selectedOrder.phone}
        </p>
      </div>

      {/* Products */}
      <div className="mb-6">
        <h3 className="mb-4 text-xl font-bold">
          Products
        </h3>

        <div className="space-y-4">
          {selectedOrder.items?.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-xl border p-4"
            >
              <img
                src={
                  item.image
                    ? item.image.startsWith("http")
                      ? item.image
                      : `http://localhost:5000${item.image}`
                    : "https://placehold.co/100x100?text=No+Image"
                }
                alt={item.name}
                className="h-20 w-20 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h4 className="font-bold">
                  {item.name}
                </h4>

                <p>Quantity: {item.quantity}</p>

                <p>
                  Price: R
                  {Number(item.price).toFixed(2)}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-blue-600">
                  R
                  {(
                    Number(item.price) *
                    Number(item.quantity)
                  ).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery */}
      <div className="mb-6 rounded-xl border p-5">
        <h3 className="mb-3 text-xl font-bold">
          Delivery Address
        </h3>

        <p>{selectedOrder.address}</p>
        <p>{selectedOrder.city}</p>
        <p>{selectedOrder.province}</p>
        <p>{selectedOrder.postal_code}</p>
      </div>

      {/* Payment */}
      <div className="mb-6 rounded-xl border p-5">
        <h3 className="mb-3 text-xl font-bold">
          Payment Method
        </h3>

        <p>{selectedOrder.payment_method}</p>
      </div>

      {/* Total */}
      <div className="rounded-xl bg-blue-50 p-6 text-right">
        <h2 className="text-3xl font-bold text-blue-700">
          Total: R{Number(selectedOrder.total).toFixed(2)}
        </h2>
      </div>

    </div>
  </div>
)}

      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="Search by customer, email or order..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full rounded-lg border p-3"
      />

      {/* Orders Table */}

      <div className="overflow-x-auto rounded-xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left">
                Order
              </th>

              <th className="px-6 py-4 text-left">
                Customer
              </th>

              <th className="px-6 py-4 text-left">
                Total
              </th>

              <th className="px-6 py-4 text-left">
                Date
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Update
              </th>

              <th className="px-6 py-4 text-left">
                View
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-6 py-4 font-semibold">
                  #{order.id}
                </td>

                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold">
                      {order.full_name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {order.email}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4 font-bold">
                  R{Number(order.total).toFixed(2)}
                </td>

                <td className="px-6 py-4">
                  {new Date(
                    order.created_at
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${badge(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-4">

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order.id,
                        e.target.value
                      )
                    }
                    className="rounded border p-2"
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>

                </td>

                <td className="px-6 py-4">

                <button
  onClick={() => setSelectedOrder(order)}
  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
>
  View
</button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>



    </div>
  );
}

export default Orders;