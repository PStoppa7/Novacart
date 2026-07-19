import ProductCard from "../components/home/ProductCard";
import { useWishlist } from "../context/WishlistContext";

function Wishlist() {
  const { wishlistItems } = useWishlist();

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="mb-10 text-4xl font-bold">
        My Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <p className="text-gray-500">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {wishlistItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;