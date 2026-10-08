import { Link } from "react-router-dom";
import StoreMap from "../../components/common/StoreMap";
import { HERO_IMAGE, STORE_ADDRESS, WHATSAPP_URL } from "../../constants/site";

const beliefs = [
  { title: "Elegance", text: "Timeless and beautiful designs for every occasion." },
  { title: "Comfort", text: "Fashion that feels as good as it looks." },
  { title: "Quality", text: "Thoughtfully selected pieces that you can feel confident wearing." },
  { title: "Variety", text: "Styles for everyday moments, celebrations, festive occasions, and everything in between." },
];

const reasons = [
  "Carefully curated women's fashion",
  "Premium 3-piece kurti sets",
  "Styles for different occasions",
  "Plus-size collections",
  "All India delivery",
  "Easy WhatsApp ordering",
  "Factory outlet, Roshamma street, Nayanagar, Kodad",
];

export default function AboutPage() {
  return (
    <article className="bg-[#F8F3ED] text-[#241B1D]">
      <header className="relative overflow-hidden bg-[#4B0F1B] text-[#FFFDFC]">
        <img src={HERO_IMAGE} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#4B0F1B] via-[#4B0F1B]/85 to-[#4B0F1B]/35" />
        <div className="relative mx-auto max-w-6xl px-margin-mobile py-16 md:px-margin md:py-24">
          <p className="font-label-uppercase text-[11px] tracking-[0.22em] text-[#C5A04A] uppercase">About Shaani Clothing</p>
          <h1 className="mt-4 max-w-3xl font-headline-lg text-4xl leading-[1.05] sm:text-6xl">Elegance in Every Thread.</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#F8F3ED]/90 sm:text-lg">
            At Shaani Clothing, we believe fashion is more than what you wear. It is a reflection of your personality, confidence, and individuality.
          </p>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-margin-mobile py-14 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:px-margin md:py-20">
        <h2 className="font-headline-lg text-3xl leading-tight text-[#4B0F1B] sm:text-4xl">What began as a simple idea.</h2>
        <div className="space-y-4 text-sm leading-7 text-[#241B1D]/80 sm:text-base">
          <p>It has grown into a clothing brand built around style, quality, comfort, and the love of our customers. Every collection at Shaani is thoughtfully selected for women who want to feel elegant, confident, and comfortable in what they wear.</p>
          <p>From beautifully coordinated 3-piece kurti sets and dress materials to everyday styles, festive looks, partywear, and more, we bring together fashion that fits different moments and different expressions of style.</p>
        </div>
      </section>

      <section className="bg-[#FFFDFC]">
        <div className="mx-auto grid max-w-6xl gap-8 px-margin-mobile py-14 md:grid-cols-2 md:px-margin md:py-20">
          <div>
            <p className="font-label-uppercase text-[11px] tracking-[0.18em] text-[#C5A04A] uppercase">Our journey</p>
            <h2 className="mt-3 font-headline-lg text-3xl leading-tight text-[#4B0F1B] sm:text-4xl">A small idea. A beautiful journey.</h2>
          </div>
          <div className="space-y-4 border-l border-[#C5A04A] pl-5 text-sm leading-7 text-[#241B1D]/80 sm:text-base">
            <p>Shaani Clothing&apos;s journey is built on a simple belief. When you create with passion and serve with honesty, customers become part of your story.</p>
            <p>With the continued love, trust, and support of our customers, Shaani has grown into a destination for women&apos;s fashion, bringing carefully curated styles closer to women across India.</p>
            <p>Every order, every message, and every returning customer is a reminder of why we started.</p>
            <p className="font-medium text-[#4B0F1B]">And this journey is still growing.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-margin-mobile py-14 md:px-margin md:py-20">
        <p className="font-label-uppercase text-[11px] tracking-[0.18em] text-[#C5A04A] uppercase">What we believe</p>
        <h2 className="mt-3 max-w-xl font-headline-lg text-3xl leading-tight text-[#4B0F1B] sm:text-4xl">Style should feel like you.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#241B1D]/80 sm:text-base">
          We believe great fashion should make you feel comfortable being yourself. That is why we look for styles that bring together:
        </p>
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {beliefs.map((item, index) => (
            <li key={item.title} className="border-t border-[#C5A04A] pt-4">
              <p className="font-label-uppercase text-[11px] tracking-[0.16em] text-[#C5A04A]">0{index + 1}</p>
              <h3 className="mt-3 font-headline-sm text-2xl text-[#4B0F1B]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#241B1D]/80">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[#4B0F1B] text-[#FFFDFC]">
        <div className="mx-auto grid max-w-6xl gap-10 px-margin-mobile py-14 md:grid-cols-[1fr_1fr] md:px-margin md:py-20">
          <div>
            <p className="font-label-uppercase text-[11px] tracking-[0.18em] text-[#C5A04A] uppercase">Made for every woman</p>
            <h2 className="mt-4 font-headline-lg text-3xl leading-tight sm:text-5xl">Because style has no single definition.</h2>
          </div>
          <div className="space-y-4 text-sm leading-7 text-[#F8F3ED]/85 sm:text-base">
            <p>At Shaani Clothing, we want every woman to find something that feels right for her.</p>
            <p>Whether you are looking for an effortless everyday outfit, a beautiful festive look, a statement party dress, or a comfortable set for your day-to-day style, our collections are curated to give you more ways to express yourself.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-margin-mobile py-14 md:px-margin md:py-20">
        <div className="flex flex-col gap-6 border-b border-[#E9D8C5] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-label-uppercase text-[11px] tracking-[0.18em] text-[#C5A04A] uppercase">Why Shaani</p>
            <h2 className="mt-3 font-headline-lg text-3xl text-[#4B0F1B] sm:text-4xl">More than just clothing</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[#241B1D]/80">
            With <span className="font-semibold text-[#4B0F1B]">2000+ happy customers</span>, Shaani Clothing continues to grow through the trust and support of its community.
          </p>
        </div>
        <ul className="mt-2 grid sm:grid-cols-2">
          {reasons.map((reason, index) => (
            <li key={reason} className="flex gap-4 border-b border-[#E9D8C5] py-4 text-sm leading-6">
              <span className="w-8 shrink-0 font-label-uppercase text-[11px] tracking-[0.12em] text-[#C5A04A]">0{index + 1}</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-[#FFFDFC]">
        <div className="mx-auto grid max-w-6xl items-start gap-8 px-margin-mobile py-14 md:grid-cols-[minmax(0,320px)_1fr] md:px-margin md:py-20">
          <div>
            <p className="font-label-uppercase text-[11px] tracking-[0.18em] text-[#C5A04A] uppercase">Visit</p>
            <h2 className="mt-3 font-headline-lg text-3xl text-[#4B0F1B]">Factory outlet</h2>
            <address className="mt-4 space-y-1 text-sm leading-7 text-[#241B1D]/80 not-italic">
              {STORE_ADDRESS.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </address>
          </div>
          <StoreMap />
        </div>
      </section>

      <section className="px-margin-mobile py-16 text-center md:px-margin md:py-24">
        <h2 className="font-headline-lg text-3xl text-[#4B0F1B] sm:text-5xl">Our promise</h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#241B1D]/80 sm:text-base">
          We want every Shaani experience to feel simple, personal, and special, from discovering a new collection to receiving your order.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#241B1D]/80 sm:text-base">
          We are committed to bringing you styles you will love, service you can rely on, and a shopping experience that keeps you coming back.
        </p>
        <p className="mt-8 font-headline-sm text-2xl text-[#4B0F1B]">Thank you for being a part of the Shaani story.</p>
        <p className="mt-2 font-label-uppercase text-[11px] tracking-[0.16em] text-[#C5A04A] uppercase">Shaani Clothing · Elegance in Every Thread.</p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link to="/shop" className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#781829] px-6 text-xs tracking-[0.14em] text-[#FFFDFC] uppercase sm:w-auto">
            Shop our collection
          </Link>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex h-12 w-full items-center justify-center rounded-full border border-[#4B0F1B] px-6 text-xs tracking-[0.14em] text-[#4B0F1B] uppercase sm:w-auto">
            Chat with Shaani
          </a>
        </div>
      </section>
    </article>
  );
}
