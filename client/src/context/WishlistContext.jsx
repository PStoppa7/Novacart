import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  async function loadWishlist() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const res = await api.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlistItems(res.data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  }

  async function toggleWishlist(product) {
    try {
      const token = localStorage.getItem("token");

      const exists = wishlistItems.some(
        (item) => item.id === product.id
      );

      if (exists) {

        await api.delete(`/wishlist/${product.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast("Removed from wishlist 💔");

      } else {

        await api.post(
          "/wishlist",
          {
            product_id: product.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success(`${product.name} added to wishlist ❤️`);

      }

      await loadWishlist();

    } catch (err) {

      console.error(err);

      toast.error("Unable to update wishlist.");

    }
  }

  function isInWishlist(id) {
    return wishlistItems.some(
      (item) => item.id === id
    );
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        loading,
        toggleWishlist,
        isInWishlist,
        loadWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}