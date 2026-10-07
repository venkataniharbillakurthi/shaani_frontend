import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../api/client";

const CatalogContext = createContext(null);

export function CatalogProvider({ children }) {
  const location = useLocation();
  const [products, setProducts] = useState([]);

  const reload = useCallback(async () => {
    try {
      const data = await api("/api/products");
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      setProducts([]);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload, location.pathname]);

  const value = useMemo(() => ({ products, reload }), [products, reload]);
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const value = useContext(CatalogContext);
  if (!value) throw new Error("useCatalog must be used within CatalogProvider");
  return value;
}
