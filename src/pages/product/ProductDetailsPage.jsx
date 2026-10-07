import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fadeUp, staggerContainer } from "../../animations/variants";
import ProductCard from "../../components/common/ProductCard";
import ProductImageZoom from "../../components/common/ProductImageZoom";
import { useCart } from "../../context/CartContext";
import { useCatalog } from "../../context/CatalogContext";
import PricePair from "../../components/common/PricePair";
import { discountPercent, getProductBySlug, getRecommendedProducts } from "../../utils/productSelectors";
import { productOrderUrl } from "../../utils/whatsapp";

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const { products } = useCatalog();
  const product = useMemo(() => getProductBySlug(products, slug), [products, slug]);
  const { addToCart } = useCart();
  const [size, setSize] = useState(product?.sizes?.[0] ?? "");
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [added, setAdded] = useState(false);
  const recommended = useMemo(() => getRecommendedProducts(products, product), [products, product]);

  useEffect(() => {
    setSize(product?.sizes?.[0] ?? "");
    setQty(1);
    setActive(0);
    setAdded(false);
  }, [product]);

  if (!product) {
    return (
      <section className="bg-[#F8F3ED] px-margin-mobile py-16 md:px-margin">
        <h1 className="font-headline-lg text-3xl text-[#4B0F1B]">Product unavailable</h1>
        <Link to="/shop" className="mt-4 inline-block text-sm text-[#781829]">
          Back to shop
        </Link>
      </section>
    );
  }

  const images = product.images?.length ? product.images : [product.image];
  const discount = discountPercent(product);
  const soldOut = product.stock === false;

  const onAdd = () => {
    if (soldOut) return;
    addToCart(product, size, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <section className="bg-[#F8F3ED] px-margin-mobile py-8 md:px-margin md:py-12">
      <div className="mx-auto grid max-w-6xl items-start gap-8 md:grid-cols-[minmax(0,420px)_1fr] md:items-stretch md:gap-14">
        <div className="mx-auto w-full max-w-[420px]">
          <div className="relative overflow-hidden rounded-2xl border border-[#E9D8C5]">
            {soldOut ? (
              <>
                <img src={images[active]} alt={product.alt || product.name} className="aspect-[4/5] w-full object-cover brightness-90" />
                <span className="absolute inset-0 bg-[#241B1D]/20" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FFFDFC] text-center text-xs font-semibold leading-tight text-[#241B1D]">
                    SOLD
                    <br />
                    OUT
                  </span>
                </span>
              </>
            ) : (
              <ProductImageZoom src={images[active]} alt={product.alt || product.name} />
            )}
          </div>
          {images.length > 1 ? (
            <div className="mt-3 flex gap-2">
              {images.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`View image ${index + 1}`}
                  className={`overflow-hidden rounded-xl border-2 ${active === index ? "border-[#781829]" : "border-[#E9D8C5]"}`}
                >
                  <img src={src} alt="" className="h-20 w-16 object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" className="flex flex-col md:h-full">
          <div className="flex h-full flex-col">
            <p className="font-label-uppercase text-[10px] tracking-[0.16em] text-[#C5A04A] uppercase">{product.category}</p>
            <h1 className="mt-1 font-headline-sm text-2xl leading-snug text-[#241B1D] md:text-3xl">{product.name}</h1>
            <div className="mt-4 flex flex-wrap items-end gap-3">
              <PricePair price={product.price} originalPrice={product.originalPrice} qty={qty} large />
              {discount ? <p className="pb-0.5 text-xs font-semibold text-[#4B0F1B]">{discount}% off</p> : null}
            </div>
            <p className="mt-4 text-sm leading-6 text-[#241B1D]">{product.description}</p>
            <p className="mt-6 font-label-uppercase text-[10px] tracking-[0.16em] text-[#4B0F1B] uppercase">Size</p>
            <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Size">
              {product.sizes.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={size === option}
                  onClick={() => setSize(option)}
                  className={`h-9 min-w-9 rounded-full border px-3 text-xs font-semibold ${size === option ? "border-[#4B0F1B] bg-[#4B0F1B] text-[#FFFDFC]" : "border-[#E9D8C5] bg-[#FFFDFC] text-[#241B1D] hover:border-[#C5A04A]"}`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <div className="inline-flex w-fit items-center rounded-full border border-[#E9D8C5] bg-[#FFFDFC]">
                <button type="button" aria-label="Decrease quantity" className="flex h-11 w-11 items-center justify-center rounded-full text-lg text-[#4B0F1B]" onClick={() => setQty((value) => Math.max(1, value - 1))}>−</button>
                <span className="min-w-8 text-center text-sm font-semibold">{qty}</span>
                <button type="button" aria-label="Increase quantity" className="flex h-11 w-11 items-center justify-center rounded-full text-lg text-[#4B0F1B]" onClick={() => setQty((value) => value + 1)}>+</button>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  disabled={soldOut}
                  onClick={onAdd}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[#781829] px-5 font-label-uppercase text-[11px] tracking-[0.14em] text-[#FFFDFC] uppercase shadow-[0_8px_24px_rgba(75,15,27,0.22)] hover:bg-[#4B0F1B] disabled:opacity-40"
                >
                  {soldOut ? "Sold out" : added ? "Added" : "Add to Cart"}
                </button>
                {soldOut ? (
                  <span className="inline-flex h-11 items-center justify-center rounded-full border border-[#E9D8C5] bg-[#F8F3ED] px-5 font-label-uppercase text-[11px] tracking-[0.14em] text-[#241B1D]/45 uppercase">
                    Order on WhatsApp
                  </span>
                ) : (
                  <a
                    href={productOrderUrl(product, size, qty)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center rounded-full border border-[#C5A04A] bg-[#FFFDFC] px-5 font-label-uppercase text-[11px] tracking-[0.14em] text-[#4B0F1B] uppercase transition-colors hover:border-[#25D366] hover:bg-[#25D366] hover:text-[#FFFDFC]"
                  >
                    Order on WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {recommended.length ? (
        <div className="mx-auto mt-14 max-w-6xl border-t border-[#E9D8C5] pt-10">
          <h2 className="font-headline-lg text-2xl text-[#4B0F1B] sm:text-3xl">Recommended</h2>
          <motion.div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4" variants={staggerContainer} initial="hidden" animate="show">
            {recommended.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </motion.div>
        </div>
      ) : null}
    </section>
  );
}
