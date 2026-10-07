import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { staggerContainer, staggerItem } from "../../animations/variants";
import ProductCard from "../../components/common/ProductCard";

export default function SpecialOffersSection({ products = [] }) {
  if (!products.length) return null;

  return (
    <section className="w-full bg-[#FFFDFC] px-margin-mobile py-16 md:px-margin md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="font-headline-lg text-3xl text-[#4B0F1B] sm:text-4xl">Special Offers</h2>
            <span className="mt-4 block h-px w-16 bg-[#C5A04A]" />
          </div>
          <Link to="/shop?tag=offer" className="font-label-uppercase text-[11px] tracking-[0.14em] text-[#781829] uppercase">
            View All Offers →
          </Link>
        </div>
        <motion.div className="grid grid-cols-2 gap-4 md:grid-cols-4" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          {products.map((product) => (
            <motion.div key={product.id} variants={staggerItem}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
