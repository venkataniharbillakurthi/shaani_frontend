import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "shaani-cart";

export function CartProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const api = useMemo(() => {
    const addToCart = (product, size = product.sizes?.[0] ?? "M", qty = 1) => {
      const key = `${product.id}-${size}`;
      setItems((current) => {
        const existing = current.find((item) => item.key === key);
        if (existing) {
          return current.map((item) => (item.key === key ? { ...item, qty: item.qty + qty } : item));
        }
        return [
          ...current,
          {
            key,
            id: product.id,
            slug: product.slug ?? product.id,
            title: product.name ?? product.title,
            price: product.price,
            originalPrice: product.originalPrice ?? product.price,
            image: product.images?.[0] ?? product.image,
            size,
            qty,
          },
        ];
      });
      setOpen(true);
    };

    const changeSize = (key, size) => {
      setItems((current) => {
        const item = current.find((entry) => entry.key === key);
        if (!item || item.size === size) return current;
        const nextKey = `${item.id}-${size}`;
        const without = current.filter((entry) => entry.key !== key);
        const existing = without.find((entry) => entry.key === nextKey);
        if (existing) {
          return without.map((entry) => (entry.key === nextKey ? { ...entry, qty: entry.qty + item.qty } : entry));
        }
        return [...without, { ...item, key: nextKey, size }];
      });
    };

    const updateQty = (key, qty) => {
      setItems((current) =>
        qty < 1 ? current.filter((item) => item.key !== key) : current.map((item) => (item.key === key ? { ...item, qty } : item)),
      );
    };

    const removeItem = (key) => setItems((current) => current.filter((item) => item.key !== key));
    const clearCart = () => setItems([]);
    const count = items.reduce((total, item) => total + item.qty, 0);
    const subtotal = items.reduce((total, item) => total + item.price * item.qty, 0);
    const originalSubtotal = items.reduce((total, item) => total + (item.originalPrice || item.price) * item.qty, 0);

    return {
      items,
      addToCart,
      updateQty,
      removeItem,
      changeSize,
      clearCart,
      count,
      subtotal,
      originalSubtotal,
      open,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
    };
  }, [items, open]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used within CartProvider");
  return value;
}
