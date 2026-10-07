import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { CartProvider } from "./context/CartContext";
import { CatalogProvider } from "./context/CatalogContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AdminAuthProvider>
        <CatalogProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CatalogProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  </StrictMode>,
);

const loader = document.getElementById("shaani-loader");
if (loader) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const removeLoader = () => loader.remove();
  if (reduceMotion) {
    removeLoader();
  } else {
    window.setTimeout(() => {
      loader.classList.add("is-leaving");
      window.setTimeout(removeLoader, 700);
    }, 1200);
  }
}
