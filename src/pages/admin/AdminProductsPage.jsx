import { useEffect, useMemo, useState } from "react";
import { api, uploadFile } from "../../api/client";
import { formatPrice } from "../../data/products";
import { PRODUCT_CATEGORIES, PRODUCT_SIZES } from "../../data/productTags";

const emptyForm = {
  name: "",
  slug: "",
  originalPrice: "",
  price: "",
  category: PRODUCT_CATEGORIES[0],
  sizes: ["M"],
  image: "",
  alt: "",
  isNew: false,
  curated: false,
  outOfStock: false,
  description: "",
};

const fieldClass = "mt-1.5 w-full rounded-2xl border border-[#E9D8C5] bg-[#FFFDFC] px-3.5 py-3 text-base outline-none focus:border-[#781829]";

function ProductForm({ form, setField, toggleSize, newArrivalCount, error, pending, editing, onSubmit, onCancel }) {
  const blocked = !form.isNew && newArrivalCount >= 4;
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const onImageFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const data = await uploadFile("/api/admin/uploads", file);
      setField("image", data.url);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-3 rounded-3xl border border-[#C5A04A]/50 bg-[#FFFDFC] p-4 shadow-[0_10px_30px_rgba(75,15,27,0.06)] sm:p-5">
      <h2 className="font-headline-sm text-xl text-[#4B0F1B]">{editing ? "Edit product" : "New product"}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm sm:col-span-2">
          Name
          <input required value={form.name} onChange={(event) => setField("name", event.target.value)} className={fieldClass} />
        </label>
        <label className="text-sm sm:col-span-2">
          Slug
          <input value={form.slug} onChange={(event) => setField("slug", event.target.value)} placeholder="Filled from the name if left blank" className={fieldClass} />
        </label>
        <div className="text-sm sm:col-span-2">
          <p>Product photo</p>
          <label className="mt-1.5 flex h-12 cursor-pointer items-center justify-center rounded-full border border-[#781829] px-4 text-xs tracking-[0.12em] text-[#781829] uppercase">
            {uploading ? "Uploading" : "Upload from phone or computer"}
            <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="sr-only" disabled={uploading} onChange={onImageFile} />
          </label>
          <label className="mt-3 block">
            Image URL
            <input required type="url" value={form.image} onChange={(event) => setField("image", event.target.value)} placeholder="https://" className={fieldClass} />
          </label>
          {uploadError ? <p className="mt-2 text-sm text-[#781829]">{uploadError}</p> : null}
          {form.image ? <img src={form.image} alt="" className="mt-3 h-28 w-24 rounded-2xl object-cover" /> : null}
        </div>
        <label className="text-sm">
          Actual price
          <input required type="number" min="1" value={form.originalPrice} onChange={(event) => setField("originalPrice", event.target.value)} className={fieldClass} />
        </label>
        <label className="text-sm">
          Discount price
          <input required type="number" min="1" value={form.price} onChange={(event) => setField("price", event.target.value)} className={fieldClass} />
        </label>
        <label className="text-sm sm:col-span-2">
          Category
          <select value={form.category} onChange={(event) => setField("category", event.target.value)} className={fieldClass}>
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
        <label className="text-sm sm:col-span-2">
          Image description
          <input value={form.alt} onChange={(event) => setField("alt", event.target.value)} className={fieldClass} />
        </label>
      </div>

      <p className="mt-5 text-xs tracking-[0.14em] text-[#C5A04A] uppercase">Sizes</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {PRODUCT_SIZES.map((size) => (
          <button key={size} type="button" onClick={() => toggleSize(size)} className={`h-11 min-w-11 cursor-pointer rounded-full border px-3 text-sm ${form.sizes.includes(size) ? "border-[#4B0F1B] bg-[#4B0F1B] text-[#FFFDFC]" : "border-[#E9D8C5] bg-[#FFFDFC]"}`}>
            {size}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <label className={`flex items-start gap-3 rounded-2xl border px-3 py-3 text-sm ${blocked ? "border-[#E9D8C5] opacity-50" : "border-[#E9D8C5] bg-[#F8F3ED]"}`}>
          <input
            type="checkbox"
            className="mt-0.5 size-5 shrink-0"
            checked={form.isNew}
            disabled={blocked}
            onChange={(event) => setField("isNew", event.target.checked)}
          />
          <span>
            New arrival
            <span className="mt-0.5 block text-xs text-[#241B1D]/60">Shows the New Arrival badge. {newArrivalCount + (form.isNew ? 1 : 0)} of 4 on the home page.</span>
          </span>
        </label>
        <label className="flex items-start gap-3 rounded-2xl border border-[#E9D8C5] bg-[#F8F3ED] px-3 py-3 text-sm">
          <input type="checkbox" className="mt-0.5 size-5 shrink-0" checked={form.curated} onChange={(event) => setField("curated", event.target.checked)} />
          <span>
            Curated Collections
            <span className="mt-0.5 block text-xs text-[#241B1D]/60">Uses this product photo for its category circle on the home page.</span>
          </span>
        </label>
        <label className="flex items-start gap-3 rounded-2xl border border-[#E9D8C5] bg-[#F8F3ED] px-3 py-3 text-sm">
          <input type="checkbox" className="mt-0.5 size-5 shrink-0" checked={form.outOfStock} onChange={(event) => setField("outOfStock", event.target.checked)} />
          <span>
            Out of stock
            <span className="mt-0.5 block text-xs text-[#241B1D]/60">Hides purchase until stock returns.</span>
          </span>
        </label>
      </div>

      <label className="mt-4 block text-sm">
        Description
        <textarea required value={form.description} onChange={(event) => setField("description", event.target.value)} rows={3} className={fieldClass} />
      </label>
      {error ? <p className="mt-3 text-sm text-[#781829]">{error}</p> : null}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="submit" disabled={pending} className="h-12 cursor-pointer rounded-full bg-[#781829] text-xs tracking-[0.14em] text-[#FFFDFC] uppercase disabled:opacity-40">
          {pending ? "Saving" : editing ? "Update" : "Create"}
        </button>
        <button type="button" onClick={onCancel} className="h-12 cursor-pointer rounded-full border border-[#E9D8C5] text-xs tracking-[0.14em] uppercase">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [query, setQuery] = useState("");

  const load = async () => {
    const data = await api("/api/admin/products", { auth: true });
    setProducts(data);
  };

  useEffect(() => {
    load().catch((err) => setError(err.message));
  }, []);

  const newArrivalCount = useMemo(
    () => products.filter((product) => product.id !== editingId && product.tags?.includes("new-arrival")).length,
    [products, editingId],
  );

  const setField = (key, value) => {
    if (key === "isNew" && value && newArrivalCount >= 4) {
      setError("New arrivals can include only 4 products. Remove the tag from another product first.");
      return;
    }
    setError("");
    setForm((current) => ({ ...current, [key]: value }));
  };

  const toggleSize = (size) => {
    setForm((current) => ({
      ...current,
      sizes: current.sizes.includes(size) ? current.sizes.filter((item) => item !== size) : [...current.sizes, size],
    }));
  };

  const startCreate = () => {
    setEditingId("");
    setForm(emptyForm);
    setError("");
    setCreating(true);
  };

  const startEdit = (product) => {
    if (editingId === product.id) {
      setEditingId("");
      setError("");
      return;
    }
    setCreating(false);
    setEditingId(product.id);
    setForm({
      name: product.name,
      slug: product.slug,
      originalPrice: String(product.originalPrice),
      price: String(product.price),
      category: PRODUCT_CATEGORIES.includes(product.category) ? product.category : PRODUCT_CATEGORIES[0],
      sizes: product.sizes || [],
      image: product.image || "",
      alt: product.alt || "",
      isNew: product.tags?.includes("new-arrival") || false,
      curated: product.tags?.includes("curated") || false,
      outOfStock: product.stock === false,
      description: product.description || "",
    });
    setError("");
  };

  const closeForm = () => {
    setCreating(false);
    setEditingId("");
    setError("");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setPending(true);
    setError("");
    const body = {
      name: form.name,
      slug: form.slug,
      price: Number(form.price),
      originalPrice: Number(form.originalPrice),
      category: form.category,
      sizes: form.sizes,
      image: form.image,
      alt: form.alt,
      tags: [form.isNew ? "new-arrival" : "", form.curated ? "curated" : ""].filter(Boolean),
      stock: !form.outOfStock,
      description: form.description,
    };
    try {
      if (editingId) await api(`/api/admin/products/${editingId}`, { method: "PUT", auth: true, body });
      else await api("/api/admin/products", { method: "POST", auth: true, body });
      closeForm();
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  };

  const onDelete = async (product) => {
    if (!window.confirm(`Delete ${product.name}?`)) return;
    setError("");
    try {
      await api(`/api/admin/products/${product.id}`, { method: "DELETE", auth: true });
      if (editingId === product.id) closeForm();
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const formProps = { form, setField, toggleSize, newArrivalCount, error, pending, onSubmit, onCancel: closeForm };
  const needle = query.trim().toLowerCase();
  const visible = products.filter((product) => {
    if (!needle) return true;
    return product.name.toLowerCase().includes(needle) || product.category.toLowerCase().includes(needle);
  });

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-headline-sm text-3xl text-[#4B0F1B]">Products</h1>
          <p className="mt-1 text-sm text-[#241B1D]/70">New arrivals {products.filter((product) => product.tags?.includes("new-arrival")).length} of 4</p>
        </div>
        <button type="button" onClick={startCreate} className="h-12 w-full cursor-pointer rounded-full bg-[#781829] px-5 text-xs tracking-[0.14em] text-[#FFFDFC] uppercase sm:w-auto">
          Add product
        </button>
      </div>
      <label className="mt-4 block">
        <span className="sr-only">Search products</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name or category"
          className="h-12 w-full rounded-full border border-[#E9D8C5] bg-[#FFFDFC] px-4 text-base outline-none focus:border-[#781829]"
        />
      </label>
      {error && !creating && !editingId ? <p className="mt-4 text-sm text-[#781829]">{error}</p> : null}
      {creating ? <ProductForm {...formProps} editing={false} /> : null}

      <div className="mt-5 grid gap-3">
        {visible.map((product) => (
          <article key={product.id} className="rounded-3xl border border-[#E9D8C5] bg-[#FFFDFC] p-3 sm:p-4">
            <div className="flex gap-3">
              <img src={product.image} alt="" className="h-24 w-20 shrink-0 rounded-2xl object-cover sm:h-28 sm:w-24" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {product.tags?.includes("new-arrival") ? <span className="rounded-full bg-[#4B0F1B] px-2 py-0.5 text-[10px] tracking-[0.12em] text-[#FFFDFC] uppercase">New Arrival</span> : null}
                  {product.tags?.includes("curated") ? <span className="rounded-full bg-[#C5A04A] px-2 py-0.5 text-[10px] tracking-[0.12em] text-[#4B0F1B] uppercase">Curated</span> : null}
                  {product.stock === false ? <span className="rounded-full border border-[#781829] px-2 py-0.5 text-[10px] tracking-[0.12em] text-[#781829] uppercase">Out of stock</span> : null}
                </div>
                <h2 className="mt-1 line-clamp-2 font-headline-sm text-lg leading-6 text-[#241B1D]">{product.name}</h2>
                <p className="text-xs text-[#241B1D]/60">{product.category}</p>
                <p className="mt-2 text-sm">
                  <span className="font-semibold text-[#781829]">{formatPrice(product.price)}</span>
                  <span className="ml-2 text-[#241B1D]/45 line-through">{formatPrice(product.originalPrice)}</span>
                </p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => startEdit(product)} className="inline-flex h-12 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-[#4B0F1B] text-xs tracking-[0.12em] text-[#4B0F1B] uppercase">
                <span className="material-symbols-outlined text-[18px]">ads_click</span>
                {editingId === product.id ? "Close" : "Edit"}
              </button>
              <button type="button" onClick={() => onDelete(product)} className="inline-flex h-12 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-[#E9D8C5] text-xs tracking-[0.12em] text-[#781829] uppercase">
                <span className="material-symbols-outlined text-[18px]">ads_click</span>
                Delete
              </button>
            </div>
            {editingId === product.id ? <ProductForm {...formProps} editing /> : null}
          </article>
        ))}
        {visible.length === 0 ? <p className="rounded-3xl border border-[#E9D8C5] bg-[#FFFDFC] px-4 py-8 text-center text-sm text-[#241B1D]/70">No products match that search.</p> : null}
      </div>
    </div>
  );
}
