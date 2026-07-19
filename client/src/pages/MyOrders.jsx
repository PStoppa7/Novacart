import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function MyOrders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  async function fetchOrders() {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/orders/user/${user.id}`
      );

      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function statusColor(status) {
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
      <div className="mx-auto max-w-6xl p-10">
        <h1 className="text-3xl font-bold">
          Loading Orders...
        </h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">

      <h1 className="mb-10 text-4xl font-bold">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="rounded-xl bg-gray-100 p-10 text-center">
          <h2 className="text-2xl font-bold">
            No Orders Yet
          </h2>

          <p className="mt-3 text-gray-500">
            Once you purchase something, your orders will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-8">

          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >

              {/* Header */}
              <div className="flex flex-col gap-4 md:flex-row md:justify-between">

                <div>
                  <h2 className="text-2xl font-bold">
                    Order #{order.id}
                  </h2>

                  <p className="mt-2 text-gray-500">
                    {new Date(
                      order.created_at
                    ).toLocaleDateString("en-ZA", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="text-right">

                  <p className="text-3xl font-bold text-blue-600">
                    R{Number(order.total).toFixed(2)}
                  </p>

                  <span
                    className={`mt-3 inline-block rounded-full px-4 py-2 text-sm font-semibold ${statusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>

                </div>

              </div>

              <hr className="my-6" />

              {/* Products */}
              <h3 className="mb-4 text-xl font-bold">
                Products
              </h3>

              <div className="space-y-4">

                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-5 rounded-xl border p-4"
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

                      <h4 className="text-lg font-bold">
                        {item.name}
                      </h4>

                      <p className="text-gray-500">
                        Quantity: {item.quantity}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="font-bold text-blue-600">
                        R{Number(item.price).toFixed(2)}
                      </p>

                      <p className="text-gray-500">
                        Total:
                        {" "}
                        R
                        {(
                          Number(item.price) *
                          item.quantity
                        ).toFixed(2)}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

              <hr className="my-6" />

              {/* Delivery */}
              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <h3 className="font-bold">
                    Delivery Address
                  </h3>

                  <p>{order.full_name}</p>

                  <p>{order.address}</p>

                  <p>
                    {order.city},{" "}
                    {order.province}
                  </p>

                  <p>{order.postal_code}</p>
                </div>

                <div>
                  <h3 className="font-bold">
                    Payment
                  </h3>

                  <p>{order.payment_method}</p>
                </div>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default MyOrders;