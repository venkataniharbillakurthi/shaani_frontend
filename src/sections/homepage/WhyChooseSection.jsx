import { motion } from "framer-motion";
import { LOGO_SRC } from "../../constants/site";

const reasons = [
  ["2000+ Happy Customers", "Loved by women across India who come back for the fit and the finish."],
  ["Carefully Curated", "Each set is chosen for comfort, drape, and how it feels to wear."],
  ["For Every Woman", "Silhouettes and sizes from M to 7XL, cut to feel easy all day."],
  ["All India Delivery", "Order from anywhere in India and receive it at your door."],
  ["WhatsApp Ordering", "A question about size or fabric? Message us before you buy."],
];

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function WhyChooseSection() {
  return (
    <section className="relative w-full overflow-hidden bg-surface px-margin-mobile py-16 md:px-margin md:py-24">
      <img
        src={LOGO_SRC}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[min(42vw,220px)] w-[min(42vw,220px)] -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.12] select-none"
      />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-headline-lg text-3xl sm:text-4xl text-primary">Why Women Choose Shaani</h2>
          <span className="mx-auto mt-4 block h-px w-16 bg-[#c5a04a]" />
          <p className="font-body-lg text-[16px] leading-7 text-on-surface-variant mt-4">
            Trusted fit, careful edits, and a team you can reach on WhatsApp before you order.
          </p>
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {reasons.map(([title, copy]) => (
            <motion.article
              key={title}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="p-6 bg-surface-container-lowest rounded-3xl border border-[#c5a04a]/30 shadow-[0_10px_28px_rgba(75,15,27,0.06)] hover:border-[#c5a04a] flex flex-col"
            >
              <h3 className="font-headline-sm text-[18px] leading-snug text-primary">{title}</h3>
              <p className="text-[13px] leading-5 text-on-surface-variant mt-3">{copy}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
