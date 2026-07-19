import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setCartItems([]);
        return;
      }

      const res = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(res.data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  }

  async function addToCart(product, quantity = 1) {
    try {

      const token = localStorage.getItem("token");

      await api.post(
        "/cart",
        {
          product_id: product.id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Added to cart");

      await loadCart();

    } catch (err) {

      console.error(err);

      toast.error("Unable to add to cart");

    }
  }

  async function removeFromCart(id) {
    try {

      const token = localStorage.getItem("token");

      await api.delete(`/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await loadCart();

    } catch (err) {

      console.error(err);

      toast.error("Unable to remove item");

    }
  }

  async function updateQuantity(id, quantity) {
    try {

      const token = localStorage.getItem("token");

      await api.put(
        `/cart/${id}`,
        {
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await loadCart();

    } catch (err) {

      console.error(err);

      toast.error("Unable to update quantity");

    }
  }

  async function clearCart() {
    try {

      const token = localStorage.getItem("token");

      await api.delete("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems([]);

    } catch (err) {

      console.error(err);

      toast.error("Unable to clear cart");

    }
  }

  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  function increaseQuantity(id) {
    const item = cartItems.find(
      (i) => i.id === id
    );

    if (item) {
      updateQuantity(
        id,
        item.quantity + 1
      );
    }
  }

  function decreaseQuantity(id) {
    const item = cartItems.find(
      (i) => i.id === id
    );

    if (!item) return;

    if (item.quantity <= 1) {
      removeFromCart(id);
    } else {
      updateQuantity(
        id,
        item.quantity - 1
      );
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}