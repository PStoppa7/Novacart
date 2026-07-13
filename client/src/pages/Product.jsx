import { useParams } from "react-router-dom";
import products from "../data/products";
import { FiShoppingCart, FiStar } from "react-icons/fi";
import { useCart } from "../context/CartContext";

function Product() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    return (
      <h1 className="p-10 text-3xl">
        Product not found
      </h1>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2">

      <img
        src={product.image}
        alt={product.name}
        className="w-full rounded-2xl shadow-lg"
      />

      <div>

        <p className="text-blue-600">
          {product.category}
        </p>

        <h1 className="mt-3 text-5xl font-bold">
          {product.name}
        </h1>

        <div className="mt-4 flex items-center gap-2">
          <FiStar className="text-yellow-500" />
          {product.rating}
        </div>

        <h2 className="mt-6 text-4xl font-bold text-blue-600">
          R{product.price}
        </h2>

        <p className="mt-8 text-gray-600">
          Premium quality product designed for
          performance, durability, and style.
        </p>

        <button
          onClick={() => addToCart(product)}
          className="mt-10 flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 text-white hover:bg-blue-700"
        >
          <FiShoppingCart />
          Add to Cart
        </button>

      </div>

    </div>
  );
}

export default Product;