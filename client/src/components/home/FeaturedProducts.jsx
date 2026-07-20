import { useEffect, useState } from "react";

import api from "../../services/api";

import ProductCard from "./ProductCard";
import SectionTitle from "../common/SectionTitle";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <SectionTitle
        title="Featured Products"
        subtitle="Browse our most popular products."
      />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products available.
          </p>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;