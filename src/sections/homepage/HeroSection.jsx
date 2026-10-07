import { Link } from "react-router-dom";
import { HERO_IMAGE, HERO_IMAGE_MOBILE } from "../../constants/site";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden md:h-screen md:min-h-0">
      <div className="absolute inset-0 h-full w-full">
        <picture className="block h-full w-full">
          <source media="(min-width: 768px)" srcSet={HERO_IMAGE} />
          <img
            alt="Shaani Clothing ensemble in a heritage palace courtyard"
            className="h-full w-full origin-[center_36%] scale-[1.22] object-cover object-[center_32%] md:origin-center md:scale-100 md:object-center"
            src={HERO_IMAGE_MOBILE}
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1012]/92 via-[#1a1012]/35 to-[#1a1012]/15 md:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#2a1612]/82 via-[#3a241c]/45 to-[#2a1612]/15 md:block" />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-[#22191b]/55 via-transparent to-[#22191b]/20 md:block" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl items-end px-margin-mobile pt-28 pb-7 md:h-full md:min-h-0 md:px-margin md:pt-[124px] md:pb-8">
        <div className="w-full space-y-4 text-left md:space-y-6">
          <h1 className="max-w-2xl font-headline-lg text-[2.05rem] leading-[1.08] tracking-tight text-[#fffaf6] drop-shadow-[0_2px_16px_rgba(0,0,0,0.35)] sm:text-4xl lg:text-[2.75rem] xl:text-[3rem]">
            Elegance in Every Thread.
          </h1>

          <div className="max-w-3xl space-y-2.5 lg:max-w-4xl md:space-y-3">
            <p className="font-editorial-quote text-[1.2rem] leading-snug text-[#f0d48a] italic sm:text-[1.7rem]">
              “Your Style. Your Story. Your Shaani.”
            </p>
            <p className="max-w-xl font-body-lg text-[15px] leading-relaxed text-[#f7efe8]/95 sm:text-[17px]">
              Discover thoughtfully curated women's fashion designed to bring together comfort, elegance and
              effortless style. From intimate everyday moments to celebratory royalty.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5 sm:pt-2">
            <Link
              to="/shop"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#6d1a28] px-7 py-3.5 font-label-uppercase text-[12px] tracking-[0.14em] text-[#fff8f8] uppercase shadow-[0_8px_24px_rgba(75,15,27,0.35)] transition-all hover:bg-[#4B0F1B] sm:w-auto"
            >
              Explore Collections
            </Link>
            <Link
              to="/shop"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#f6efe4] px-7 py-3.5 font-label-uppercase text-[12px] tracking-[0.14em] text-[#6d1a28] uppercase transition-all hover:bg-white sm:w-auto"
            >
              View Bestsellers
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
