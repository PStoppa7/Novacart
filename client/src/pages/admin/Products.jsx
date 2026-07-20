import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import api from "../../services/api";

import AdminButton from "../../components/admin/AdminButton";
import SearchBar from "../../components/admin/SearchBar";

function Products() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // ======================
  // Load Products
  // ======================
  async function fetchProducts() {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products",
        {
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );

      setProducts(res.data);
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  }

  // ======================
  // Delete Product
  // ======================
  async function deleteProduct(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchProducts();

      alert("Product deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  }

  // ======================
  // Update Stock
  // ======================
  async function updateStock(id, amount) {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/products/${id}/stock`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to update stock.");
    }
  }

  // ======================
  // Search
  // ======================
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // ======================
  // Stock Badge
  // ======================
  function stockBadge(stock) {
    if (stock === 0) {
      return (
        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
          Out of Stock
        </span>
      );
    }

    if (stock <= 5) {
      return (
        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
          Low Stock ({stock})
        </span>
      );
    }

    return (
      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600">
        In Stock ({stock})
      </span>
    );
  }

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="text-gray-500">
            Manage your store products.
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={fetchProducts}
            className="rounded-lg bg-gray-700 px-5 py-2 font-semibold text-white hover:bg-gray-800"
          >
            🔄 Refresh
          </button>

          <Link to="/admin/add-product">
            <AdminButton>
              + Add Product
            </AdminButton>
          </Link>

        </div>

      </div>

      {/* Search */}
      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Products Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
                        {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-t hover:bg-gray-50"
                >
                  {/* Image */}
                  <td className="p-4">
                    <img
                      src={
                        product.image
                          ? product.image.startsWith("http")
                            ? product.image
                            : `http://localhost:5000${product.image}`
                          : "https://placehold.co/64x64?text=No+Image"
                      }
                      alt={product.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                  </td>

                  {/* Name */}
                  <td className="p-4 font-semibold">
                    {product.name}
                  </td>

                  {/* Category */}
                  <td className="p-4">
                    {product.category}
                  </td>

                  {/* Price */}
                  <td className="p-4 font-semibold">
                    R{Number(product.price).toFixed(2)}
                  </td>

                  {/* Stock */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">

                      <button
                        onClick={() =>
                          updateStock(product.id, -1)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-lg font-bold text-white hover:bg-red-600"
                      >
                        −
                      </button>

                      {stockBadge(product.stock)}

                      <button
                        onClick={() =>
                          updateStock(product.id, 1)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-lg font-bold text-white hover:bg-green-600"
                      >
                        +
                      </button>

                    </div>
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex justify-center gap-3">

                      <Link
                        to={`/admin/edit-product/${product.id}`}
                      >
                        <button className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200">
                          <FiEdit2 />
                        </button>
                      </Link>

                      <button
                        onClick={() =>
                          deleteProduct(product.id)
                        }
                        className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
                      >
                        <FiTrash2 />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="p-8 text-center text-gray-500"
                >
                  No products found.
                </td>
              </tr>
            )}

          </tbody>

        </table>
      </div>

    </div>
  );
}

export default Products;