import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: null,
    description: "",
  });

  const [preview, setPreview] = useState(null);

  function handleChange(e) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    setProduct({
      ...product,
      image: file,
    });

    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("description", product.description);

      if (product.image) {
        formData.append("image", product.image);
      }

    await axios.post(
  "http://localhost:5000/api/products",
  formData,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  }
);

      alert("Product added successfully!");

      setProduct({
        name: "",
        category: "",
        price: "",
        stock: "",
        image: null,
        description: "",
      });

      setPreview(null);

      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Failed to save product.");
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-2 text-3xl font-bold">
        Add Product
      </h1>

      <p className="mb-8 text-gray-500">
        Fill in the details below to add a new product.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl bg-white p-8 shadow"
      >
        {/* Product Name */}
        <div>
          <label className="mb-2 block font-semibold">
            Product Name
          </label>

          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block font-semibold">
            Category
          </label>

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          >
            <option value="">Choose category</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Sports</option>
            <option>Home & Living</option>
          </select>
        </div>

        {/* Price & Stock */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-semibold">
              Price (R)
            </label>

            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              required
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="mb-2 block font-semibold">
            Product Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full rounded-lg border p-3"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 h-52 w-52 rounded-lg border object-cover"
            />
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block font-semibold">
            Description
          </label>

          <textarea
            name="description"
            rows="5"
            value={product.description}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;