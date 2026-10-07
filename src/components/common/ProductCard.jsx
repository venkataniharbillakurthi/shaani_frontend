import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { imageHover, staggerItem } from "../../animations/variants";
import PricePair from "./PricePair";

export default function ProductCard({ product, variants = staggerItem }) {
  const image = product.images?.[0] ?? product.image;
  const soldOut = product.stock === false;

  const media = (
    <div className="relative block aspect-[3/4] overflow-hidden bg-[#F8F3ED]">
      {product.badge ? (
        <span className="absolute top-3 left-3 z-10 bg-[#781829] px-2 py-1 font-label-uppercase text-[10px] tracking-[0.12em] text-[#FFFDFC] uppercase">
          {product.badge}
        </span>
      ) : null}
      <motion.img
        alt={product.alt || product.name}
        src={image}
        loading="lazy"
        className={`h-full w-full object-cover ${soldOut ? "brightness-90" : ""}`}
        whileHover={soldOut ? undefined : imageHover}
        transition={{ duration: 0.45 }}
      />
      {soldOut ? (
        <>
          <span className="absolute inset-0 bg-[#241B1D]/20" />
          <span className="absolute inset-0 z-10 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFFDFC] text-center text-[10px] font-semibold leading-tight text-[#241B1D]">
              SOLD
              <br />
              OUT
            </span>
          </span>
        </>
      ) : null}
    </div>
  );

  const details = (
    <div className="flex flex-1 flex-col p-3">
      <p className="font-label-uppercase text-[10px] tracking-[0.14em] text-[#C5A04A] uppercase">{product.category}</p>
      <p className="mt-1 text-sm leading-5 break-words text-[#241B1D]">{product.name}</p>
      <p className="mt-2">
        <PricePair price={product.price} originalPrice={product.originalPrice} />
      </p>
    </div>
  );

  return (
    <motion.article
      variants={variants}
      whileHover={soldOut ? undefined : { y: -8 }}
      aria-disabled={soldOut || undefined}
      className="flex h-full flex-col overflow-hidden border border-[#E9D8C5] bg-[#FFFDFC]"
    >
      {soldOut ? (
        <>
          {media}
          {details}
        </>
      ) : (
        <>
          <Link to={`/product/${product.slug}`}>{media}</Link>
          <Link to={`/product/${product.slug}`}>{details}</Link>
        </>
      )}
    </motion.article>
  );
}
