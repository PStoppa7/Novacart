import { Link } from "react-router-dom";
import {
  FiPlus,
  FiMinus,
  FiTrash2,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    loading,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const total = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        Loading cart...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">

      <h1 className="mb-10 text-4xl font-bold">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (

        <div className="text-center">

          <p className="mb-6 text-xl text-gray-500">
            Your cart is empty.
          </p>

          <Link to="/shop">
            <button className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
              Continue Shopping
            </button>
          </Link>

        </div>

      ) : (

        <>
          <div className="space-y-6">

            {cartItems.map((item) => (

              <div
                key={item.id}
                className="flex items-center gap-6 rounded-xl border bg-white p-5 shadow-sm"
              >

                <img
                  src={
                    item.image
                      ? item.image.startsWith("http")
                        ? item.image
                        : `http://localhost:5000${item.image}`
                      : "https://placehold.co/100x100?text=No+Image"
                  }
                  alt={item.name || "Product"}
                  className="h-24 w-24 rounded-lg object-cover"
                />

                <div className="flex-1">

                  <h3 className="text-xl font-bold">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-gray-500">
                    R{Number(item.price || 0).toFixed(2)}
                  </p>

                </div>

                {/* Quantity */}

                <div className="flex items-center gap-3">

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        Math.max(1, item.quantity - 1)
                      )
                    }
                    className="rounded bg-gray-200 p-2 hover:bg-gray-300"
                  >
                    <FiMinus />
                  </button>

                  <span className="w-8 text-center font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity + 1
                      )
                    }
                    className="rounded bg-gray-200 p-2 hover:bg-gray-300"
                  >
                    <FiPlus />
                  </button>

                </div>

                {/* Item Total */}

                <div className="w-28 text-right font-bold">

                  R
                  {(Number(item.price || 0) * item.quantity).toFixed(2)}

                </div>

                {/* Remove */}

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="rounded bg-red-100 p-3 text-red-600 hover:bg-red-200"
                >
                  <FiTrash2 />
                </button>

              </div>

            ))}

          </div>

          {/* Summary */}

          <div className="mt-10 rounded-xl bg-gray-100 p-6">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-bold">
                Total
              </h2>

              <span className="text-3xl font-bold text-blue-600">
                R{total.toFixed(2)}
              </span>

            </div>

            <div className="flex justify-end">

              <Link to="/checkout">
                <button className="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700">
                  Proceed to Checkout
                </button>
              </Link>

            </div>

          </div>

        </>

      )}

    </div>
  );
}

export default Cart;