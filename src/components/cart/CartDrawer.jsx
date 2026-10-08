import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { drawer } from "../../animations/variants";
import { useCart } from "../../context/CartContext";
import { useCatalog } from "../../context/CatalogContext";
import CartItemControls from "./CartItemControls";
import PricePair from "../common/PricePair";
import { formatPrice } from "../../data/products";

export default function CartDrawer() {
  const { items, open, closeCart, updateQty, removeItem, changeSize, subtotal } = useCart();
  const { products } = useCatalog();
  const actualTotal = items.reduce((total, item) => {
    const product = products.find((entry) => entry.id === item.id);
    const original = item.originalPrice ?? product?.originalPrice ?? item.price;
    return total + original * item.qty;
  }, 0);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeCart]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            className="fixed inset-0 z-[70] bg-[#241B1D]/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            role="dialog"
            aria-label="Shopping cart"
            className="fixed top-0 right-0 z-[80] flex h-full w-full max-w-full flex-col overflow-hidden bg-[#FFFDFC] shadow-2xl sm:w-[420px]"
            variants={drawer}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <div className="flex items-center justify-between border-b border-[#E9D8C5] px-5 py-4">
              <h2 className="font-headline-sm text-lg text-[#241B1D]">Shopping Cart</h2>
              <button type="button" aria-label="Close cart drawer" className="rounded-full p-2 text-[#241B1D]" onClick={closeCart}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-5 py-4">
              {items.length === 0 ? (
                <p className="py-10 text-center font-body-md text-[#241B1D]">Your cart is currently empty.</p>
              ) : (
                <ul className="flex min-w-0 flex-col">
                  {items.map((item) => {
                    const product = products.find((entry) => entry.id === item.id);
                    const sizes = product?.sizes ?? [item.size];
                    return (
                      <li key={item.key} className="flex min-w-0 gap-3 border-b border-[#E9D8C5] py-4">
                        <img src={item.image} alt="" loading="lazy" decoding="async" className="h-[88px] w-[72px] shrink-0 object-cover" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <Link to={`/product/${item.slug}`} onClick={closeCart} className="font-headline-sm text-sm leading-5 text-[#241B1D]">
                              {item.title}
                            </Link>
                            <button type="button" aria-label={`Remove ${item.title}`} className="shrink-0 text-[#241B1D]/70" onClick={() => removeItem(item.key)}>
                              <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                          </div>
                          <PricePair price={item.price} originalPrice={item.originalPrice ?? product?.originalPrice} qty={item.qty} />
                          <CartItemControls item={item} sizes={sizes} onSize={changeSize} onQty={updateQty} />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="border-t border-[#E9D8C5] px-5 py-4">
              <div className="mb-4 space-y-1 text-sm text-[#241B1D]">
                {actualTotal > subtotal ? (
                  <div className="flex justify-between text-[#241B1D]/45">
                    <span>Price</span>
                    <span className="line-through">{formatPrice(actualTotal)}</span>
                  </div>
                ) : null}
                <div className="flex justify-between">
                  <span>Discount price</span>
                  <span className="font-semibold text-[#781829]">{formatPrice(subtotal)}</span>
                </div>
              </div>
              <Link
                to="/cart"
                onClick={closeCart}
                aria-disabled={!items.length}
                className={`flex w-full items-center justify-center rounded-full bg-[#781829] px-4 py-3 text-sm font-semibold text-[#FFFDFC] ${items.length ? "" : "pointer-events-none opacity-40"}`}
              >
                Checkout
              </Link>
              <button type="button" onClick={closeCart} className="mt-2 w-full border border-[#241B1D] py-3 text-sm text-[#241B1D]">
                Continue shopping
              </button>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
