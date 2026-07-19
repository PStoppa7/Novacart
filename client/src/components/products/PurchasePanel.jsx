import { useState } from "react";
import {
  FiHeart,
  FiMinus,
  FiPlus,
  FiTruck,
  FiRefreshCw,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";

export default function PurchasePanel({
  product,
  onBuyNow,
  onWishlist,
}) {
  const [qty, setQty] = useState(1);

  const { addToCart } = useCart();

  function increase() {
    setQty((q) => q + 1);
  }

  function decrease() {
    if (qty > 1) {
      setQty((q) => q - 1);
    }
  }

  async function handleAddCart() {
    await addToCart(product, qty);
  }

  function handleBuyNow() {
    if (onBuyNow) {
      onBuyNow(product, qty);
    } else {
      toast.success("Redirecting to checkout...");
    }
  }

  function handleWishlist() {
    if (onWishlist) {
      onWishlist(product);
    } else {
      toast.success("Added to wishlist ❤️");
    }
  }

  return (
    <div className="sticky top-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">

      <div className="space-y-8">

        {/* Price */}

        <div>

          <h2 className="text-5xl font-bold text-blue-600">
            R{Number(product.price).toFixed(2)}
          </h2>

          <p className="mt-2 font-semibold text-green-600">
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

        </div>

        {/* Quantity */}

        <div>

          <h3 className="mb-4 font-semibold">
            Quantity
          </h3>

          <div className="flex w-fit items-center rounded-2xl border">

            <button
              onClick={decrease}
              className="p-4 hover:bg-gray-100"
            >
              <FiMinus />
            </button>

            <span className="w-16 text-center text-xl font-bold">
              {qty}
            </span>

            <button
              onClick={increase}
              className="p-4 hover:bg-gray-100"
            >
              <FiPlus />
            </button>

          </div>

        </div>

        {/* Buttons */}

        <div className="grid gap-4">

          <button
            onClick={handleAddCart}
            className="
              rounded-2xl
              bg-blue-600
              py-4
              text-lg
              font-bold
              text-white
              transition
              hover:scale-[1.02]
              hover:bg-blue-700
            "
          >
            Add To Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="
              rounded-2xl
              bg-gradient-to-r
              from-green-500
              to-emerald-600
              py-4
              text-lg
              font-bold
              text-white
              transition
              hover:scale-[1.02]
            "
          >
            Buy Now
          </button>

          <button
            onClick={handleWishlist}
            className="
              flex
              items-center
              justify-center
              gap-3
              rounded-2xl
              border
              py-4
              font-semibold
              transition
              hover:bg-gray-100
            "
          >
            <FiHeart size={20} />
            Add to Wishlist
          </button>

        </div>

        {/* Shipping */}

        <div className="space-y-5 rounded-2xl bg-gray-50 p-6">

          <div className="flex items-start gap-4">

            <FiTruck
              className="mt-1 text-blue-600"
              size={24}
            />

            <div>

              <h4 className="font-semibold">
                Free Delivery
              </h4>

              <p className="text-gray-500">
                Free shipping on qualifying orders.
              </p>

            </div>

          </div>

          <div className="flex items-start gap-4">

            <FiRefreshCw
              className="mt-1 text-green-600"
              size={22}
            />

            <div>

              <h4 className="font-semibold">
                30 Day Returns
              </h4>

              <p className="text-gray-500">
                Hassle-free returns within 30 days.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}