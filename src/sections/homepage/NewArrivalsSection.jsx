import { Link } from "react-router-dom";
import PricePair from "../../components/common/PricePair";

export default function NewArrivalsSection({ products = [] }) {
  if (!products.length) return null;

  return (
    <section className="w-full bg-[#F8F3ED] px-margin-mobile py-16 md:px-margin md:py-20" id="new-arrivals">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-headline-lg text-3xl text-[#4B0F1B] sm:text-4xl">New Arrivals</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-6 sm:mt-10 sm:gap-5 md:grid-cols-4">
          {products.map((product) => {
            const soldOut = product.stock === false;
            const body = (
              <>
                <span className="relative block aspect-[3/4] bg-[#f3f1ee] sm:aspect-square">
                  <img
                    src={product.images?.[0] ?? product.image}
                    alt={product.alt || product.name}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full object-cover ${soldOut ? "brightness-90" : ""}`}
                  />
                  {soldOut ? (
                    <>
                      <span className="absolute inset-0 bg-[#241B1D]/20" />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-center text-[10px] font-semibold leading-tight tracking-wide text-[#241B1D]">
                          SOLD
                          <br />
                          OUT
                        </span>
                      </span>
                    </>
                  ) : null}
                </span>
                <span className="mt-3 block text-sm leading-5 text-[#241B1D]">{product.name}</span>
                <span className="mt-1 block">
                  <PricePair price={product.price} originalPrice={product.originalPrice} />
                </span>
              </>
            );
            return soldOut ? (
              <div key={product.id} className="min-w-0" aria-disabled="true">
                {body}
              </div>
            ) : (
              <Link key={product.id} to={`/product/${product.slug}`} className="min-w-0">
                {body}
              </Link>
            );
          })}
        </div>
        <div className="mt-8 flex justify-center sm:mt-10">
          <Link to="/shop?tag=new-arrival" className="inline-flex w-full items-center justify-center rounded-md bg-[#4B0F1B] px-6 py-3 text-sm text-[#FFFDFC] sm:w-auto sm:py-2.5">
            Shop more
          </Link>
        </div>
      </div>
    </section>
  );
}
