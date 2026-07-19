import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FiShoppingCart, FiStar } from "react-icons/fi";

import { useCart } from "../context/CartContext";

function Product() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  async function fetchProduct() {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <h1 className="p-10 text-3xl">
        Loading...
      </h1>
    );
  }

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
        src={
          product.image
            ? product.image.startsWith("http")
              ? product.image
              : `http://localhost:5000${product.image}`
            : "https://placehold.co/600x600?text=No+Image"
        }
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
          {product.rating || 5}
        </div>

        <h2 className="mt-6 text-4xl font-bold text-blue-600">
          R{product.price}
        </h2>

        <p className="mt-8 text-gray-600">
          {product.description ||
            "Premium quality product designed for performance, durability, and style."}
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