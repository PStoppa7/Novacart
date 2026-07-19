import { Link } from "react-router-dom";
import { FiShoppingCart, FiStar, FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `http://localhost:5000${product.image}`
    : "https://placehold.co/400x400?text=No+Image";

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Product Image */}
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img
            src={imageUrl}
            alt={product.name}
            className="h-64 w-full object-cover"
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-md transition hover:scale-110"
        >
          {isInWishlist(product.id) ? (
            <FaHeart className="text-lg text-red-500" />
          ) : (
            <FiHeart className="text-lg" />
          )}
        </button>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <p className="text-sm text-blue-600">
          {product.category}
        </p>

        <Link to={`/product/${product.id}`}>
          <h3 className="mt-2 text-xl font-bold transition hover:text-blue-600">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <FiStar className="text-yellow-500" />
          <span>{product.rating}</span>
        </div>

        <p className="mt-4 text-2xl font-bold text-gray-900">
          R{product.price}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <FiShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;