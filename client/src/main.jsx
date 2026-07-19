import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { LoadingProvider } from "./context/LoadingContext";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <LoadingProvider>

      <AuthProvider>

        <CartProvider>

          <WishlistProvider>

            <Toaster
              position="top-right"
              reverseOrder={false}
            />

            <App />

          </WishlistProvider>

        </CartProvider>

      </AuthProvider>

    </LoadingProvider>

  </React.StrictMode>
);