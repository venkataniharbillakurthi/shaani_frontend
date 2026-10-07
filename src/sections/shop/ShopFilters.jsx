import { categories } from "../../data/categories";

const priceOptions = [
  ["", "All prices"],
  ["500", "Under ₹500"],
  ["1000", "Under ₹1,000"],
  ["2000", "Under ₹2,000"],
];

const sorts = [
  { id: "name", label: "A–Z" },
  { id: "name-desc", label: "Z–A" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "featured", label: "Featured" },
];

const selectClass =
  "h-11 w-full appearance-none rounded-full border border-[#E9D8C5] bg-[#F8F3ED] px-4 pr-9 text-sm text-[#241B1D] outline-none";

function selectedPrice(mode) {
  return priceOptions.find(([value]) => value === mode)?.[1] || "";
}

export default function ShopFilters({ values, onChange, sort, onSort, count, onClear }) {
  const category = categories.find((item) => item.slug === values.category);
  const categoryChosen = Boolean(category && category.slug !== "all");
  const priceLabel = selectedPrice(values.priceMode);
  const filtering = Boolean(values.query || values.priceMode || categoryChosen);

  return (
    <div className="rounded-3xl border border-[#E9D8C5] bg-[#FFFDFC] p-4 shadow-[0_10px_28px_rgba(75,15,27,0.05)]">
      <label className="relative block">
        <span className="material-symbols-outlined pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[20px] text-[#C5A04A]">search</span>
        <input
          value={values.query}
          onChange={(event) => onChange("query", event.target.value)}
          placeholder="Search styles"
          aria-label="Search styles"
          className="h-12 w-full rounded-full border border-[#E9D8C5] bg-[#F8F3ED] pr-4 pl-11 text-sm text-[#241B1D] outline-none placeholder:text-[#241B1D]/45 focus:border-[#781829]"
        />
      </label>

      <label className="relative mt-4 block text-[11px] tracking-[0.12em] text-[#781829] uppercase sm:hidden">
        Category
        <select value={values.category || "all"} onChange={(event) => onChange("category", event.target.value)} className={`${selectClass} mt-1.5`}>
          {categories.map((item) => (
            <option key={item.id} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
        <span className="material-symbols-outlined pointer-events-none absolute right-3 bottom-2.5 text-[18px] text-[#4B0F1B]">expand_more</span>
      </label>

      {categoryChosen || values.priceMode || values.query ? (
        <div className="mt-3 flex flex-wrap gap-2 sm:hidden">
          {categoryChosen ? (
            <button type="button" onClick={() => onChange("category", "all")} className="inline-flex items-center gap-1 rounded-full bg-[#4B0F1B] px-3 py-1.5 text-xs text-[#FFFDFC]">
              {category.name}
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          ) : null}
          {values.priceMode ? (
            <button type="button" onClick={() => onChange("priceMode", "")} className="inline-flex items-center gap-1 rounded-full bg-[#4B0F1B] px-3 py-1.5 text-xs text-[#FFFDFC]">
              {priceLabel}
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          ) : null}
          {values.query ? (
            <button type="button" onClick={() => onChange("query", "")} className="inline-flex max-w-full items-center gap-1 rounded-full bg-[#4B0F1B] px-3 py-1.5 text-xs text-[#FFFDFC]">
              <span className="truncate">{values.query}</span>
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          ) : null}
        </div>
      ) : null}

      <div className="mt-4 hidden gap-2 overflow-x-auto pb-1 sm:flex">
        {categories.map((item) => {
          const active = values.category === item.slug;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange("category", item.slug)}
              className={`shrink-0 rounded-full px-4 py-2.5 text-xs tracking-[0.04em] ${
                active ? "bg-[#4B0F1B] text-[#FFFDFC]" : "border border-[#E9D8C5] bg-[#F8F3ED] text-[#241B1D]"
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <label className="relative block text-[11px] tracking-[0.12em] text-[#781829] uppercase">
          Price
          <select value={values.priceMode} onChange={(event) => onChange("priceMode", event.target.value)} className={`${selectClass} mt-1.5`}>
            {priceOptions.map(([value, label]) => (
              <option key={value || "all"} value={value}>
                {label}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined pointer-events-none absolute right-3 bottom-2.5 text-[18px] text-[#4B0F1B]">expand_more</span>
        </label>
        <label className="relative block text-[11px] tracking-[0.12em] text-[#781829] uppercase">
          Sort
          <select value={sort} onChange={(event) => onSort(event.target.value)} className={`${selectClass} mt-1.5`}>
            {sorts.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined pointer-events-none absolute right-3 bottom-2.5 text-[18px] text-[#4B0F1B]">expand_more</span>
        </label>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-sm text-[#781829]">
          {count} {count === 1 ? "style" : "styles"}
        </p>
        {filtering ? (
          <button type="button" onClick={onClear} className="text-xs tracking-[0.12em] text-[#4B0F1B] uppercase">
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}
