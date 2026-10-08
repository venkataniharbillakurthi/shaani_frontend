import { Link } from "react-router-dom";
import { useCatalog } from "../../context/CatalogContext";
import { categories } from "../../data/categories";

const collections = categories.filter((category) => category.slug !== "all");

function imageFor(products, categorySlug) {
  const inCategory = products.filter((product) => product.categorySlug === categorySlug);
  const featured = inCategory.find((product) => product.tags?.includes("curated"));
  return (featured || inCategory[0])?.image || "";
}

export default function CategoriesSection() {
  const { products } = useCatalog();

  return (
    <section className="w-full bg-[#F8F3ED] px-margin-mobile py-16 md:px-margin md:py-20" id="collections">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-headline-lg text-3xl text-[#4B0F1B] sm:text-4xl">Curated Collections</h2>
        <div className="mt-8 grid grid-cols-3 gap-x-3 gap-y-6 sm:mt-10 sm:grid-cols-4 sm:gap-6 lg:grid-cols-6">
          {collections.map((item) => {
            const image = imageFor(products, item.categorySlug);
            return (
              <Link key={item.slug} to={`/shop?category=${item.slug}`} className="group flex min-w-0 flex-col items-center gap-2 sm:gap-3">
                <span className="w-full max-w-[132px] rounded-full border-2 border-[#4B0F1B] p-1">
                  {image ? (
                    <img src={image} alt={item.name} loading="lazy" decoding="async" className="aspect-square w-full rounded-full object-cover" />
                  ) : (
                    <span className="flex aspect-square w-full items-center justify-center rounded-full bg-[#4B0F1B] px-2 text-center text-[10px] leading-tight text-[#F8F3ED] sm:text-[11px] sm:leading-4">
                      {item.name}
                    </span>
                  )}
                </span>
                <span className="text-center text-xs leading-4 text-[#241B1D] sm:text-sm">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
