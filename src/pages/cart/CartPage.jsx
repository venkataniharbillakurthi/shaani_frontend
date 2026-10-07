import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CartItemControls from "../../components/cart/CartItemControls";
import PricePair from "../../components/common/PricePair";
import { formatPrice } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { useCatalog } from "../../context/CatalogContext";
import { api } from "../../api/client";
import { whatsappOrderUrl } from "../../utils/whatsapp";

const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const emptyDetails = {
  name: "",
  phone: "",
  email: "",
  pincode: "",
  address: "",
  locality: "",
  landmark: "",
  city: "",
  state: "Telangana",
  note: "",
};

const fieldClass = "mt-1 w-full rounded-lg border border-[#E9D8C5] bg-[#FFFDFC] px-3 py-2.5 text-sm text-[#241B1D] outline-none focus:border-[#781829]";

function Field({ label, required, error, children }) {
  return (
    <label className="block text-sm text-[#241B1D]">
      <span>
        {label}
        {required ? <span className="text-[#781829]"> *</span> : null}
      </span>
      {children}
      {error ? <span className="mt-1 block text-xs text-[#781829]">{error}</span> : null}
    </label>
  );
}

export default function CartPage() {
  const { items, updateQty, removeItem, changeSize, clearCart, subtotal } = useCart();
  const { products } = useCatalog();
  const actualTotal = items.reduce((total, item) => {
    const product = products.find((entry) => entry.id === item.id);
    const original = item.originalPrice ?? product?.originalPrice ?? item.price;
    return total + original * item.qty;
  }, 0);
  const [details, setDetails] = useState(emptyDetails);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const setField = (key, value) => {
    setDetails((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const next = {
      name: details.name.trim(),
      phone: details.phone.replace(/\s+/g, "").replace(/^\+91/, ""),
      email: details.email.trim(),
      pincode: details.pincode.trim(),
      address: details.address.trim(),
      locality: details.locality.trim(),
      landmark: details.landmark.trim(),
      city: details.city.trim(),
      state: details.state.trim(),
      note: details.note.trim(),
    };
    const nextErrors = {};
    if (!next.name) nextErrors.name = "Enter your full name.";
    if (!/^[6-9]\d{9}$/.test(next.phone)) nextErrors.phone = "Enter a 10-digit mobile number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email)) nextErrors.email = "Enter a valid email address.";
    if (!/^\d{6}$/.test(next.pincode)) nextErrors.pincode = "Enter a 6-digit pincode.";
    if (!next.address) nextErrors.address = "Enter house number, building, and street.";
    if (!next.locality) nextErrors.locality = "Enter the area or locality.";
    if (!next.city) nextErrors.city = "Enter the city.";
    if (!next.state) nextErrors.state = "Select a state.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setSending(true);
    try {
      await api("/api/orders", {
        method: "POST",
        body: {
          customer: next,
          items: items.map((item) => ({
            productId: item.id,
            title: item.title,
            size: item.size,
            qty: item.qty,
            price: item.price,
            originalPrice: item.originalPrice ?? item.price,
            image: item.image,
          })),
        },
      });
      window.open(whatsappOrderUrl(items, subtotal, next), "_blank", "noopener,noreferrer");
      clearCart();
    } catch (err) {
      setErrors({ form: err.message || "Could not save the order. Try again." });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="bg-[#F8F3ED] px-margin-mobile py-8 md:px-margin md:py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-headline-lg text-3xl text-[#4B0F1B] sm:text-4xl">Your cart</h1>
        <span className="mt-4 block h-px w-16 bg-[#C5A04A]" />

        {items.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-[#E9D8C5] bg-[#FFFDFC] px-6 py-16 text-center">
            <p className="text-[#241B1D]/70">Your bag is empty.</p>
            <Link to="/shop" className="mt-6 inline-flex rounded-full bg-[#781829] px-7 py-3 text-xs tracking-[0.14em] text-[#FFFDFC] uppercase">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="space-y-4">
              {items.map((item) => {
                const product = products.find((entry) => entry.id === item.id);
                const sizes = product?.sizes ?? [item.size];
                return (
                  <motion.article key={item.key} layout className="rounded-2xl border border-[#E9D8C5] bg-[#FFFDFC] p-4">
                    <div className="flex gap-4">
                      <img alt="" src={item.image} className="h-24 w-20 rounded-xl object-cover sm:h-28 sm:w-24" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h2 className="min-w-0 break-words text-[#4B0F1B]">{item.title}</h2>
                          <button type="button" className="cursor-pointer text-xs tracking-wider text-[#781829] uppercase" onClick={() => removeItem(item.key)}>
                            Remove
                          </button>
                        </div>
                        <div className="mt-2">
                          <PricePair price={item.price} originalPrice={item.originalPrice ?? product?.originalPrice} qty={item.qty} />
                        </div>
                        <CartItemControls item={item} sizes={sizes} onSize={changeSize} onQty={updateQty} />
                      </div>
                    </div>
                  </motion.article>
                );
              })}

              <form id="delivery-form" onSubmit={onSubmit} noValidate className="rounded-2xl border border-[#E9D8C5] bg-[#FFFDFC] p-4 sm:p-6">
                <h2 className="font-headline-sm text-2xl text-[#4B0F1B]">Delivery details</h2>
                <p className="mt-1 text-sm text-[#241B1D]/70">Fields marked * are required. The order is saved as pending, then sent on WhatsApp.</p>
                {errors.form ? <p className="mt-3 text-sm text-[#781829]">{errors.form}</p> : null}
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" required error={errors.name}>
                    <input value={details.name} onChange={(event) => setField("name", event.target.value)} autoComplete="name" className={fieldClass} />
                  </Field>
                  <Field label="Mobile number" required error={errors.phone}>
                    <input value={details.phone} onChange={(event) => setField("phone", event.target.value)} autoComplete="tel" inputMode="tel" placeholder="10-digit mobile number" className={fieldClass} />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Email" required error={errors.email}>
                      <input type="email" value={details.email} onChange={(event) => setField("email", event.target.value)} autoComplete="email" className={fieldClass} />
                    </Field>
                  </div>
                  <Field label="Pincode" required error={errors.pincode}>
                    <input value={details.pincode} onChange={(event) => setField("pincode", event.target.value)} inputMode="numeric" autoComplete="postal-code" maxLength={6} placeholder="6-digit pincode" className={fieldClass} />
                  </Field>
                  <Field label="City" required error={errors.city}>
                    <input value={details.city} onChange={(event) => setField("city", event.target.value)} autoComplete="address-level2" className={fieldClass} />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Flat, house no., building, street" required error={errors.address}>
                      <textarea value={details.address} onChange={(event) => setField("address", event.target.value)} autoComplete="street-address" rows={2} className={fieldClass} />
                    </Field>
                  </div>
                  <Field label="Area, locality" required error={errors.locality}>
                    <input value={details.locality} onChange={(event) => setField("locality", event.target.value)} className={fieldClass} />
                  </Field>
                  <Field label="Landmark" error={errors.landmark}>
                    <input value={details.landmark} onChange={(event) => setField("landmark", event.target.value)} className={fieldClass} />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="State" required error={errors.state}>
                      <select value={details.state} onChange={(event) => setField("state", event.target.value)} autoComplete="address-level1" className={fieldClass}>
                        {STATES.map((state) => (
                          <option key={state}>{state}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Note">
                      <textarea value={details.note} onChange={(event) => setField("note", event.target.value)} rows={2} className={fieldClass} />
                    </Field>
                  </div>
                </div>
              </form>
            </div>

            <aside className="h-fit rounded-2xl border border-[#E9D8C5] bg-[#FFFDFC] p-5 lg:sticky lg:top-28">
              <h2 className="font-headline-sm text-xl text-[#4B0F1B]">Price details</h2>
              <div className="mt-4 space-y-2 border-t border-[#E9D8C5] pt-4 text-sm">
                {actualTotal > subtotal ? (
                  <div className="flex items-center justify-between text-[#241B1D]/45">
                    <span>Price</span>
                    <span className="line-through">{formatPrice(actualTotal)}</span>
                  </div>
                ) : null}
                <div className="flex items-center justify-between">
                  <span className="text-[#241B1D]/70">Discount price</span>
                  <span className="text-xl font-semibold text-[#781829]">{formatPrice(subtotal)}</span>
                </div>
              </div>
              <button type="submit" form="delivery-form" disabled={sending} className="mt-5 inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-full bg-[#25D366] px-5 text-xs tracking-[0.14em] text-[#FFFDFC] uppercase disabled:opacity-40">
                {sending ? "Saving order" : "Send on WhatsApp"}
              </button>
              <p className="mt-3 text-center text-xs text-[#241B1D]/60">Shaani Clothing confirms the order on WhatsApp.</p>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
