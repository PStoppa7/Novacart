import { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "../components/home/ProductCard";
import SectionTitle from "../components/common/SectionTitle";

function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data);
    } catch (err) {
      console.error("Failed to load products", err);
    }
  }

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === "low-high")
        return a.price - b.price;

      if (sort === "high-low")
        return b.price - a.price;

      if (sort === "rating")
        return (b.rating || 0) - (a.rating || 0);

      return 0;
    });

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SectionTitle
        title="Shop"
        subtitle="Browse our complete collection."
      />

      {/* Filters */}
      <div className="mb-10 grid gap-4 md:grid-cols-3">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="rounded-lg border p-3"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          className="rounded-lg border p-3"
        >
          <option value="default">
            Default
          </option>

          <option value="low-high">
            Price: Low → High
          </option>

          <option value="high-low">
            Price: High → Low
          </option>

          <option value="rating">
            Highest Rated
          </option>
        </select>

      </div>

      {/* Products */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Shop;