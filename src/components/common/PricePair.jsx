import { formatPrice } from "../../data/products";

export default function PricePair({ price, originalPrice, qty = 1, large = false }) {
  const discount = price * qty;
  const actual = Number(originalPrice) || 0;
  const onSale = actual > price;

  return (
    <span className={`inline-flex flex-wrap items-baseline gap-x-2 gap-y-0.5 ${large ? "text-2xl" : "text-sm"}`}>
      <span className="font-semibold text-[#781829]">{formatPrice(discount)}</span>
      {onSale ? <span className={`font-normal text-[#241B1D]/45 line-through ${large ? "text-sm" : "text-xs"}`}>{formatPrice(actual * qty)}</span> : null}
    </span>
  );
}
