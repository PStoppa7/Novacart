import {
  createContext,
  useContext,
  useState,
} from "react";

const LoadingContext = createContext();

let loadingSetter = null;

export function LoadingProvider({ children }) {

  const [loading, setLoading] = useState(false);

  loadingSetter = setLoading;

  return (

    <LoadingContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >

      {children}

    </LoadingContext.Provider>

  );

}

export function useLoading() {
  return useContext(LoadingContext);
}

export function showLoader() {

  if (loadingSetter) {
    loadingSetter(true);
  }

}

export function hideLoader() {

  if (loadingSetter) {
    loadingSetter(false);
  }

}