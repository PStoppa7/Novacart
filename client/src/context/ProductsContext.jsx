import { createContext, useContext, useEffect, useState } from "react";
import initialProducts from "../data/products";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");

    return savedProducts
      ? JSON.parse(savedProducts)
      : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem(
      "products",
      JSON.stringify(products)
    );
  }, [products]);

  function addProduct(product) {
    setProducts((prev) => [
      ...prev,
      {
        ...product,
        id: Date.now(),
      },
    ]);
  }

  function deleteProduct(id) {
    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );
  }

  function updateProduct(updatedProduct) {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id
          ? updatedProduct
          : product
      )
    );
  }

  function getProduct(id) {
    return products.find(
      (product) => product.id === Number(id)
    );
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        updateProduct,
        getProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}