
import { HERO_IMAGE } from "../../constants/site";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F8F3ED]">
      <img
        src={HERO_IMAGE}
        alt="Shaani Clothing — Every Friday New Offers"
        fetchPriority="high"
        decoding="async"
        className="
          block h-auto w-full
          object-contain object-center
        "
      />
    </section>
  );
}
