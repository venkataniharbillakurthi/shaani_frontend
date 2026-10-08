import { motion } from "framer-motion";
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { staggerContainer } from "../../animations/variants";
import ProductCard from "../../components/common/ProductCard";
import ShopFilters from "../../sections/shop/ShopFilters";
import { useCatalog } from "../../context/CatalogContext";
import { categories } from "../../data/categories";
import { filterProducts } from "../../utils/productSelectors";

function priceModeFromParams(params) {
  const max = params.get("max");
  if (max === "500" || max === "1000" || max === "2000") return max;
  return "";
}

function readDraft(params) {
  const tag = params.get("tag");
  const fromTag = categories.find((item) => item.tag === tag)?.slug;
  return {
    category: params.get("category") || fromTag || "all",
    priceMode: priceModeFromParams(params),
    query: params.get("q") || "",
  };
}

export default function ShopPage() {
  const { products } = useCatalog();
  const [params, setParams] = useSearchParams();
  const bannerImages = useMemo(() => products.slice(0, 6).map((product) => product.images?.[0] ?? product.image), [products]);
  const values = readDraft(params);
  const category = values.category;
  const tag = params.get("tag") || "";
  const query = values.query;
  const sort = params.get("sort") || "name";
  const maxPrice = params.get("max") || "";

  const visible = useMemo(
    () => filterProducts(products, { category, tag, query, sort, maxPrice }),
    [products, category, tag, query, sort, maxPrice],
  );

  const onChange = (key, value) => {
    const nextValues = { ...values, [key]: value };
    const next = new URLSearchParams();
    if (nextValues.category && nextValues.category !== "all") next.set("category", nextValues.category);
    if (nextValues.query) next.set("q", nextValues.query);
    if (nextValues.priceMode === "500" || nextValues.priceMode === "1000" || nextValues.priceMode === "2000") {
      next.set("max", nextValues.priceMode);
    }
    if (sort !== "name") next.set("sort", sort);
    setParams(next);
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-[#4B0F1B] px-6 py-8 text-center text-[#FFFDFC]">
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#C5A04A]" />
        <div className="pointer-events-none absolute inset-y-0 left-4 hidden items-center gap-3 lg:flex">
          {bannerImages.slice(0, 3).map((src, index) => (
            <img key={`left-${index}`} src={src} alt="" loading="lazy" decoding="async" className={`h-16 w-12 object-cover ring-1 ring-[#C5A04A]/70 ${index === 1 ? "-rotate-3" : "rotate-3"}`} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-4 hidden items-center gap-3 lg:flex">
          {bannerImages.slice(3, 6).map((src, index) => (
            <img key={`right-${index}`} src={src} alt="" loading="lazy" decoding="async" className={`h-16 w-12 object-cover ring-1 ring-[#C5A04A]/70 ${index === 1 ? "rotate-3" : "-rotate-3"}`} />
          ))}
        </div>
        <p className="font-label-uppercase text-[11px] tracking-[0.22em] text-[#C5A04A] uppercase">Atelier Kodad</p>
        <h1 className="mt-2 font-headline-lg text-3xl tracking-[0.08em] sm:text-4xl">Shop</h1>
        <p className="mt-2 text-sm text-[#E9D8C5]">
          <Link to="/" className="hover:text-[#FFFDFC]">
            Home
          </Link>
          <span className="mx-2">/</span>
          The collection
        </p>
      </section>

      <section className="px-margin-mobile py-6 md:px-margin md:py-10">
        <div className="mx-auto max-w-6xl">
          <ShopFilters
            values={values}
            onChange={onChange}
            sort={sort}
            count={visible.length}
            onClear={() => setParams(new URLSearchParams())}
            onSort={(value) => {
              const next = new URLSearchParams(params);
              if (value === "name") next.delete("sort");
              else next.set("sort", value);
              setParams(next);
            }}
          />

          <div className="mt-5">
            {visible.length === 0 ? (
              <p className="py-16 text-center text-sm text-[#241B1D]">No styles match these filters.</p>
            ) : (
              <motion.div
                key={`${query}-${category}-${tag}-${sort}-${maxPrice}`}
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {visible.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
