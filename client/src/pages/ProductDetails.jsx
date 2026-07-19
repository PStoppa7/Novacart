import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

import ProductGallery from "../components/products/ProductGallery";
import ProductInfo from "../components/products/ProductInfo";
import PurchasePanel from "../components/products/PurchasePanel";
import ReviewsSection from "../components/products/ReviewsSection";

import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    addToCart,
  } = useCart();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    loadProduct();
    loadReviews();
  }, [id]);

  async function loadProduct() {
    try {

      const res = await api.get(
  `/products/${id}`
);

      setProduct(res.data);

    } catch (err) {

      console.error(err);

      toast.error("Unable to load product.");

    } finally {

      setLoading(false);

    }
  }

  async function loadReviews() {

    try {

      const res = await api.get(
  `/reviews/${id}`
);
      setReviews(res.data);

    } catch (err) {

      console.error(err);

    }

  }

  async function buyNow(product, qty) {

    try {

      await addToCart(product, qty);

      toast.success("Redirecting to checkout...");

      navigate("/checkout");

    } catch (err) {

      console.error(err);

      toast.error("Unable to continue to checkout.");

    }

  }

  function addToWishlist(product) {

    toast.success(
      `${product.name} added to wishlist ❤️`
    );

  }

  async function submitReview(review) {

    try {

      const token = localStorage.getItem("token");

    await api.post(
  "/reviews",
  {
    product_id: product.id,
    rating: review.rating,
    title: review.title,
    comment: review.comment,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
      toast.success("Review submitted!");

      await loadReviews();
      await loadProduct();

    } catch (err) {

      console.error(err);

      toast.error(
        err.response?.data?.message ||
        "Unable to submit review."
      );

    }

  }

  if (loading) {

    return (
      <div className="mx-auto max-w-7xl p-20 text-center">
        Loading...
      </div>
    );

  }

  if (!product) {

    return (
      <div className="mx-auto max-w-7xl p-20 text-center">
        Product not found.
      </div>
    );

  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      <div className="grid gap-12 xl:grid-cols-[1.2fr_1fr_420px]">

        <ProductGallery
          images={
            product.images?.length
              ? product.images
              : product.image
              ? [product.image]
              : []
          }
        />

        <ProductInfo
          product={product}
        />

        <PurchasePanel
          product={product}
          onAddToCart={addToCart}
          onBuyNow={buyNow}
          onWishlist={addToWishlist}
        />

      </div>

      <ReviewsSection
        reviews={reviews}
        onSubmit={submitReview}
      />

    </div>
  );
}