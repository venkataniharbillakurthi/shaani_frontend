export default function CartItemControls({ item, sizes, onSize, onQty }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <label className="inline-flex h-10 items-center gap-2 rounded-full border border-[#E9D8C5] bg-[#F8F3ED] px-3 text-xs text-[#241B1D]">
        <span className="text-[#241B1D]/55">Size</span>
        <select
          aria-label={`Size for ${item.title}`}
          value={item.size}
          onChange={(event) => onSize(item.key, event.target.value)}
          className="cursor-pointer bg-transparent text-sm font-semibold text-[#4B0F1B] outline-none"
        >
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>
      <div className="inline-flex h-10 items-center rounded-full border border-[#E9D8C5] bg-[#FFFDFC]">
        <button type="button" aria-label="Decrease quantity" className="flex h-10 w-9 cursor-pointer items-center justify-center rounded-full text-lg text-[#4B0F1B]" onClick={() => onQty(item.key, item.qty - 1)}>
          −
        </button>
        <span className="min-w-6 text-center text-sm font-semibold">{item.qty}</span>
        <button type="button" aria-label="Increase quantity" className="flex h-10 w-9 cursor-pointer items-center justify-center rounded-full text-lg text-[#4B0F1B]" onClick={() => onQty(item.key, item.qty + 1)}>
          +
        </button>
      </div>
    </div>
  );
}
