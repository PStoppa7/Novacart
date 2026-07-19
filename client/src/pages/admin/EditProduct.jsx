import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    loadProduct();
  }, []);

  async function loadProduct() {
    try {

      const res = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(res.data);

    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(e) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        product
      );

      alert("Product updated successfully!");

      navigate("/admin/products");

    } catch (err) {

      console.error(err);

      alert("Failed to update product.");

    }

  }

  return (
    <div className="mx-auto max-w-3xl p-8">

      <h1 className="mb-8 text-3xl font-bold">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl bg-white p-8 shadow"
      >

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

        <div>

          <label className="mb-2 block font-semibold">
            Category
          </label>

          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-semibold">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
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
            />

          </div>

        </div>

        <div>

          <label className="mb-2 block font-semibold">
            Image URL
          </label>

          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

        </div>

        <div>

          <label className="mb-2 block font-semibold">
            Description
          </label>

          <textarea
            rows="5"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white"
        >
          Save Changes
        </button>

      </form>

    </div>
  );

}

export default EditProduct;