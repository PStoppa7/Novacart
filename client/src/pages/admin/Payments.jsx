import { useEffect, useMemo, useState } from "react";
import axios from "axios";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  async function fetchPayments() {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/payments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPayments(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load payments.");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id, payment_status) {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/payments/${id}`,
        {
          payment_status,
          transaction_id:
            payment_status === "Paid"
              ? `TXN-${Date.now()}`
              : null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchPayments();
    } catch (err) {
      console.error(err);
      alert("Failed to update payment.");
    }
  }

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const term = search.toLowerCase();

      return (
        payment.full_name
          ?.toLowerCase()
          .includes(term) ||
        payment.email
          ?.toLowerCase()
          .includes(term) ||
        payment.order_id
          .toString()
          .includes(term)
      );
    });
  }, [payments, search]);

  const totalPayments = payments.length;

  const paidPayments = payments.filter(
    (p) => p.payment_status === "Paid"
  ).length;

  const pendingPayments = payments.filter(
    (p) => p.payment_status === "Pending"
  ).length;

  const failedPayments = payments.filter(
    (p) => p.payment_status === "Failed"
  ).length;

  const revenue = payments
    .filter((p) => p.payment_status === "Paid")
    .reduce(
      (sum, p) => sum + Number(p.amount),
      0
    );

  function badge(status) {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Failed":
        return "bg-red-100 text-red-700";

      case "Cancelled":
        return "bg-gray-200 text-gray-700";

      default:
        return "bg-blue-100 text-blue-700";
    }
  }

  if (loading) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold">
          Loading Payments...
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">

      <div>
        <h1 className="text-4xl font-bold">
          Payments
        </h1>

        <p className="text-gray-500">
          Manage customer payments
        </p>
      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-4">

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">
            Total Payments
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {totalPayments}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">
            Paid
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {paidPayments}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">
            Pending
          </p>

          <h2 className="mt-2 text-3xl font-bold text-yellow-600">
            {pendingPayments}
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

      {/* Payments Table */}

      <div className="overflow-x-auto rounded-xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left">
                Payment
              </th>

              <th className="px-6 py-4 text-left">
                Order
              </th>

              <th className="px-6 py-4 text-left">
                Customer
              </th>

              <th className="px-6 py-4 text-left">
                Amount
              </th>

              <th className="px-6 py-4 text-left">
                Method
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Date
              </th>

              <th className="px-6 py-4 text-left">
                Update
              </th>

            </tr>

          </thead>

          <tbody>
                        {filteredPayments.length > 0 ? (

              filteredPayments.map((payment) => (

                <tr
                  key={payment.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-6 py-4 font-semibold">
                    #{payment.id}
                  </td>

                  <td className="px-6 py-4">
                    #{payment.order_id}
                  </td>

                  <td className="px-6 py-4">

                    <div>

                      <p className="font-semibold">
                        {payment.full_name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {payment.email}
                      </p>

                    </div>

                  </td>

                  <td className="px-6 py-4 font-bold">
                    R{Number(payment.amount).toFixed(2)}
                  </td>

                  <td className="px-6 py-4">
                    {payment.payment_method}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${badge(
                        payment.payment_status
                      )}`}
                    >
                      {payment.payment_status}
                    </span>

                  </td>

                  <td className="px-6 py-4">
                    {new Date(
                      payment.created_at
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">

                    <select
                      value={payment.payment_status}
                      onChange={(e) =>
                        updateStatus(
                          payment.id,
                          e.target.value
                        )
                      }
                      className="rounded border p-2"
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Paid">
                        Paid
                      </option>

                      <option value="Failed">
                        Failed
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>

                    </select>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="8"
                  className="p-8 text-center text-gray-500"
                >
                  No payments found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Payments;