import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  function toggleWishlist(product) {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        toast("Removed from wishlist 💔");

        return prev.filter((item) => item.id !== product.id);
      }

      toast.success(`${product.name} added to wishlist ❤️`);

      return [...prev, product];
    });
  }

  function isInWishlist(id) {
    return wishlistItems.some((item) => item.id === id);
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}