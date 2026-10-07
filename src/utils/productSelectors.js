import { categories } from "../data/categories";

const withTag = (products, tag, limit) => {
  const matched = products.filter((product) => product.tags?.includes(tag));
  return typeof limit === "number" ? matched.slice(0, limit) : matched;
};

export const getNewArrivals = (products) => withTag(products, "new-arrival", 4);
export const getPremiumThreePiece = (products) => withTag(products, "premium-3-piece", 1);
export const getOfferProducts = (products) => withTag(products, "offer", 4);
export const getPlusSizeProducts = (products) => withTag(products, "plus-size", 4);
export const getFeaturedProducts = (products) => withTag(products, "featured");

export function getProductBySlug(products, slug) {
  return products.find((product) => product.slug === slug);
}

export function getRecommendedProducts(products, product, limit = 4) {
  if (!product) return [];
  const others = products.filter((item) => item.id !== product.id);
  const sameCategory = others.filter((item) => item.category === product.category);
  const rest = others.filter((item) => item.category !== product.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export function filterProducts(products, { category = "all", tag = "", query = "", sort = "featured", minPrice = "", maxPrice = "", stock = "" } = {}) {
  const needle = query.trim().toLowerCase();
  const min = minPrice === "" ? null : Number(minPrice);
  const max = maxPrice === "" ? null : Number(maxPrice);
  let list = products.filter((product) => {
    const selected = categories.find((entry) => entry.slug === category);
    const categoryMatch =
      !category ||
      category === "all" ||
      (selected
        ? (selected.categorySlug && product.categorySlug === selected.categorySlug) ||
          (selected.tag && product.tags?.includes(selected.tag))
        : product.categorySlug === category || product.tags?.includes(category));
    const tagMatch = !tag || product.tags?.includes(tag);
    const searchMatch =
      !needle ||
      product.name.toLowerCase().includes(needle) ||
      product.category.toLowerCase().includes(needle) ||
      product.tags?.some((item) => item.includes(needle));
    const priceMatch = (min === null || product.price >= min) && (max === null || product.price <= max);
    const stockMatch = stock === "out" ? product.stock === false : stock === "in" ? product.stock !== false : true;
    return categoryMatch && tagMatch && searchMatch && priceMatch && stockMatch;
  });

  if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  else if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === "name-desc") list = [...list].sort((a, b) => b.name.localeCompare(a.name));
  else if (sort === "newest") list = [...list].reverse();
  else list = [...list].sort((a, b) => Number(b.tags?.includes("featured")) - Number(a.tags?.includes("featured")));

  return list;
}

export function discountPercent(product) {
  if (!product?.originalPrice || product.originalPrice <= product.price) return 0;
  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
}
