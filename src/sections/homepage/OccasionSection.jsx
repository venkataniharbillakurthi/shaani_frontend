import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { staggerContainer, staggerItem } from "../../animations/variants";
import { occasions } from "../../data/collections";

export default function OccasionSection() {
  return (
    <section className="w-full bg-[#FFFDFC] px-margin-mobile py-16 md:px-margin md:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-headline-lg text-3xl text-[#4B0F1B] sm:text-4xl">Shop by Occasion</h2>
        <span className="mt-4 block h-px w-16 bg-[#C5A04A]" />
        <motion.div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          {occasions.map((occasion) => (
            <motion.div key={occasion.id} variants={staggerItem}>
              <Link to={`/shop?category=${occasion.category}`} className="group block">
                <img src={occasion.image} alt={occasion.title} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <h3 className="mt-3 font-headline-sm text-lg text-[#241B1D]">{occasion.title}</h3>
                <p className="font-body-sm text-[#241B1D]/80">{occasion.description}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
