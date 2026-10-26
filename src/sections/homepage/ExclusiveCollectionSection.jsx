import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { staggerContainer, staggerItem } from "../../animations/variants";
import ProductCard from "../../components/common/ProductCard";

export default function ExclusiveCollectionSection({ products = [] }) {
  if (!products.length) return null;

  const curated = products.filter((product) => product.tags?.includes("curated"));
  const collection = (curated.length ? curated : products).slice(0, 4);

  return (
    <section className="w-full bg-white px-margin-mobile py-14 md:px-margin md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-label-uppercase text-[10px] tracking-[0.18em] text-[#C5A04A] uppercase">Selected for you</p>
            <h2 className="mt-1 font-headline-lg text-3xl text-[#4B0F1B] sm:text-4xl">Exclusive Collection</h2>
            <span className="mt-3 block h-px w-16 bg-[#C5A04A]" />
          </div>
          <Link to="/shop" className="hidden text-sm font-semibold text-[#781829] transition-colors hover:text-[#4B0F1B] sm:inline-flex">
            Shop more <span aria-hidden="true" className="ml-1">→</span>
          </Link>
        </div>

        <motion.div
          className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 md:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {collection.map((product) => (
            <motion.div key={product.id} variants={staggerItem}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-6 flex justify-center sm:hidden">
          <Link to="/shop" className="inline-flex w-full items-center justify-center rounded-full bg-[#781829] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4B0F1B]">
            Shop more
          </Link>
        </div>
      </div>
    </section>
  );
}
