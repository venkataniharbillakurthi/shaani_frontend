import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCatalog } from "../../context/CatalogContext";
import { categories } from "../../data/categories";

const collections = categories.filter((category) => category.slug !== "all");

function imageFor(products, categorySlug) {
  const inCategory = products.filter((product) => product.categorySlug === categorySlug);
  const featured = inCategory.find((product) => product.tags?.includes("curated"));
  return (featured || inCategory[0])?.image || "";
}

export default function CategoriesSection() {
  const { products } = useCatalog();
  const scrollRef = useRef(null);
  const interactionTimer = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return undefined;

    let frameId;
    let lastTime = 0;
    let pausedUntil = 0;
    const pause = (duration = 0) => {
      pausedUntil = Date.now() + duration;
    };
    const animate = (time) => {
      if (lastTime && Date.now() >= pausedUntil) {
        container.scrollLeft += Math.min(time - lastTime, 32) * 0.018;
        const loopWidth = container.scrollWidth / 2;
        if (loopWidth > 0 && container.scrollLeft >= loopWidth) {
          container.scrollLeft -= loopWidth;
        }
      }
      lastTime = time;
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);
    const handleTouchStart = () => {
      pause(Number.POSITIVE_INFINITY);
      window.clearTimeout(interactionTimer.current);
    };
    const handleTouchEnd = () => {
      interactionTimer.current = window.setTimeout(() => pause(), 1800);
    };
    const handleWheel = () => {
      pause();
      window.clearTimeout(interactionTimer.current);
      interactionTimer.current = window.setTimeout(() => pause(), 1800);
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    container.addEventListener("wheel", handleWheel, { passive: true });
    container.addEventListener("pointerenter", handleTouchStart);
    container.addEventListener("pointerleave", handleTouchEnd);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(interactionTimer.current);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("pointerenter", handleTouchStart);
      container.removeEventListener("pointerleave", handleTouchEnd);
    };
  }, []);

  const featuredCollection = collections[0];
  const movingCollections = collections.slice(1);

  const renderCollection = (item, duplicate = false) => {
    const image = imageFor(products, item.categorySlug);
    return (
      <motion.div
        key={`${duplicate ? "duplicate-" : ""}${item.slug}`}
        initial={{ opacity: 0, y: 8, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={{ y: -2, scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-[76px] shrink-0 sm:w-[88px]"
        aria-hidden={duplicate || undefined}
      >
        <Link
          to={`/shop?category=${item.slug}`}
          tabIndex={duplicate ? -1 : undefined}
          className="group flex flex-col items-center gap-1.5"
        >
          <span className="w-full rounded-full bg-gradient-to-br from-[#C5A04A] via-[#fff8f8] to-[#781829] p-[2px]">
            {image ? (
              <img src={image} alt={duplicate ? "" : item.name} loading="lazy" decoding="async" className="aspect-square w-full rounded-full border-2 border-white object-cover" />
            ) : (
              <span className="flex aspect-square w-full items-center justify-center rounded-full border-2 border-white bg-[#f8f3ed] px-1 text-center text-[9px] font-semibold leading-tight text-[#4B0F1B] sm:text-[10px]">
                {item.name}
              </span>
            )}
          </span>
          <span className="line-clamp-2 min-h-7 w-full text-center text-[10px] font-semibold leading-3.5 text-[#241B1D] sm:text-[11px]">
            {item.name}
          </span>
        </Link>
      </motion.div>
    );
  };

  return (
    <section className="relative z-10 w-full border-b border-[#c5a04a]/30 bg-white py-3 sm:py-4" id="collections">
      <div className="flex items-center gap-3 px-3 sm:gap-4 sm:px-5">
        {featuredCollection ? (
          <div className="w-[76px] shrink-0 pr-3 sm:w-[88px] sm:pr-4">
            {renderCollection(featuredCollection)}
          </div>
        ) : null}
        <div ref={scrollRef} className="min-w-0 flex-1 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-3 pr-3 sm:gap-4 sm:pr-5">
            {movingCollections.map((item) => renderCollection(item))}
            {movingCollections.map((item) => renderCollection(item, true))}
          </div>
        </div>
      </div>
    </section>
  );
}
