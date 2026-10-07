import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PricePair from "../../components/common/PricePair";

const pieces = [
  ["01", "Tailored Kurti", "A shaped neckline and easy sleeves, finished with a soft drape."],
  ["02", "Comfort Bottoms", "A pant or palazzo with an elastic waist, cut to move with you."],
  ["03", "Graceful Dupatta", "A full-length organza or chanderi stole with a matching border."],
];

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function SignatureSection({ product }) {
  if (!product) return null;
  const image = product.images?.[0] ?? product.image;

  return (
    <section className="w-full bg-surface-container-low px-margin-mobile md:px-margin py-16 md:py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <motion.div
          className="lg:col-span-6"
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative p-3 sm:p-4 bg-surface-container-lowest rounded-3xl shadow-[0_18px_40px_rgba(75,15,27,0.12)] border border-[#c5a04a]/40"
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/5] relative">
              <img alt={product.alt || product.name} className="w-full h-full object-cover object-top" src={image} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a1016]/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-[#fff8f8]/92 backdrop-blur-md px-4 py-3 rounded-full border border-[#c5a04a]/30 flex items-center justify-between gap-3">
                <PricePair price={product.price} originalPrice={product.originalPrice} />
                <span className="text-[11px] font-label-uppercase tracking-[0.12em] uppercase text-[#caa44e]">Ready to wear</span>
              </div>
            </div>
            <span className="absolute top-7 right-7 rounded-full bg-[#6d1a28] text-[#ffdf9c] px-4 py-1.5 text-[10px] font-label-uppercase tracking-[0.16em] uppercase">
              Shaani Signature
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="lg:col-span-6 flex flex-col items-start"
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-label-uppercase text-[11px] tracking-[0.18em] text-[#caa44e] uppercase">Shaani Signature</p>
          <h2 className="mt-3 font-headline-lg text-3xl sm:text-4xl text-primary">Premium 3-Piece Kurti Sets</h2>
          <span className="mt-4 block h-px w-16 bg-[#c5a04a]" />
          <p className="mt-4 font-headline-sm text-lg text-on-surface">{product.name}</p>
          <p className="font-body-lg text-[16px] leading-7 text-on-surface-variant mt-3 max-w-xl">{product.description}</p>

          <motion.div className="grid grid-cols-1 gap-3 w-full mt-6" variants={listVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            {pieces.map(([number, title, copy]) => (
              <motion.div
                key={number}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="p-4 bg-surface-container-lowest rounded-2xl border border-[#c5a04a]/30 shadow-[0_8px_24px_rgba(75,15,27,0.05)] flex items-start gap-3.5"
              >
                <div className="w-9 h-9 rounded-full bg-[#fbeaec] text-primary flex items-center justify-center font-semibold text-xs shrink-0 border border-[#c5a04a]/40">
                  {number}
                </div>
                <div>
                  <span className="font-semibold text-on-surface text-sm">{title}</span>
                  <p className="text-[13px] text-on-surface-variant mt-0.5 leading-relaxed">{copy}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to={`/product/${product.slug}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#6d1a28] text-[#fff8f8] rounded-full font-label-uppercase text-xs tracking-[0.14em] uppercase hover:bg-[#4B0F1B] transition-colors shadow-[0_8px_24px_rgba(75,15,27,0.22)]"
            >
              View Product
            </Link>
            <Link
              to="/shop?category=3-piece-sets"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#c5a04a] text-primary font-label-uppercase text-xs tracking-[0.14em] uppercase hover:bg-[#6d1a28] hover:text-[#fff8f8] transition-colors"
            >
              Shop 3-Piece Sets
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
