import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { staggerContainer, staggerItem } from "../../animations/variants";
import ProductCard from "../../components/common/ProductCard";

export default function PlusSizeSection({ products = [] }) {
  if (!products.length) return null;
  const [featured, ...rest] = products;

  return (
    <section className="w-full bg-[#F8F3ED] px-margin-mobile py-16 md:px-margin md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="font-headline-lg text-3xl text-[#4B0F1B] sm:text-4xl">Plus Size</h2>
            <p className="mt-3 max-w-lg font-body-lg text-[#241B1D]">Extended sizes from the same catalogue, selected by the plus-size tag.</p>
          </div>
          <Link to="/shop?tag=plus-size" className="font-label-uppercase text-[11px] tracking-[0.14em] text-[#781829] uppercase">
            Shop Plus Size →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <Link to={`/product/${featured.slug}`} className="block">
            <img src={featured.images?.[0] ?? featured.image} alt={featured.alt || featured.name} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover" />
            <p className="mt-3 font-headline-sm text-lg text-[#241B1D]">{featured.name}</p>
          </Link>
          <motion.div className="grid grid-cols-2 gap-4" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {rest.map((product) => (
              <motion.div key={product.id} variants={staggerItem}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
