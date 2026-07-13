import ProductCard from "./ProductCard";
import SectionTitle from "../common/SectionTitle";
import products from "../../data/products";
const featuredProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 1299,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 2499,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
  },
  {
    id: 3,
    name: "Running Shoes",
    category: "Sports",
    price: 1799,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
  },
  {
    id: 4,
    name: "Leather Backpack",
    category: "Fashion",
    price: 899,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
  },
];

function FeaturedProducts() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <SectionTitle
        title="Featured Products"
        subtitle="Browse our most popular products."
      />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </section>
  );
}

export default FeaturedProducts;