import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { INSTAGRAM_URL } from "../../constants/site";

const MotionButton = motion.create("button");

const videos = [
  {
    title: "True customer review",
    video: "https://shaaniclothing.sgp1.cdn.digitaloceanspaces.com/customer_review_shaani_video.mp4",
    image: "https://shaaniclothing.sgp1.cdn.digitaloceanspaces.com/customer_review_shaani_image.jpg",
  },
  {
    title: "Dasara shopping at Shaani Clothing",
    video: "https://shaaniclothing.sgp1.cdn.digitaloceanspaces.com/shaani_shop_video.mp4",
    image: "https://shaaniclothing.sgp1.cdn.digitaloceanspaces.com/shaani_shop_image.jpg",
  },
  {
    title: "Best of Shaani Clothing",
    video: "https://shaaniclothing.sgp1.cdn.digitaloceanspaces.com/best_of_shaani_video.mp4",
    image: "https://shaaniclothing.sgp1.cdn.digitaloceanspaces.com/best_of_shaani_image.jpg",
  },
];

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function InstagramSection() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setActive(null);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section className="w-full bg-surface-container-low px-margin-mobile md:px-margin py-16 md:py-24">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center max-w-2xl mb-12">
          <h2 className="font-headline-lg text-3xl sm:text-4xl text-primary">Follow the Shaani Story</h2>
          <span className="mx-auto mt-4 block h-px w-16 bg-[#c5a04a]" />
          <p className="font-body-lg text-[16px] leading-7 text-on-surface-variant mt-4">
            New arrivals, styling ideas, and offers - see them first on Instagram.
          </p>
        </div>
        <motion.div
          className="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {videos.map((item) => (
            <MotionButton
              key={item.video}
              type="button"
              variants={cardVariants}
              whileHover={{ y: -6 }}
              onClick={() => setActive(item)}
              aria-label={`Play ${item.title}`}
              className="group relative aspect-[9/16] overflow-hidden rounded-2xl border border-[#c5a04a]/25 text-left shadow-[0_8px_24px_rgba(75,15,27,0.08)]"
            >
              <img
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={item.image}
              />
              <span className="absolute inset-0 bg-[#241B1D]/25 transition-colors group-hover:bg-[#241B1D]/40" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFFDFC]/95 text-[#4B0F1B] shadow-[0_8px_24px_rgba(36,27,29,0.35)]">
                  <span className="material-symbols-outlined text-[32px]">play_arrow</span>
                </span>
              </span>
            </MotionButton>
          ))}
        </motion.div>
        <a
          className="mt-8 inline-flex items-center gap-2 px-7 py-3 rounded-full border border-[#c5a04a] text-primary font-label-uppercase text-[11px] tracking-[0.14em] uppercase hover:bg-[#6d1a28] hover:text-[#fff8f8] transition-colors"
          href={INSTAGRAM_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          @shaaniclothing_kodad
        </a>
      </div>
      {active
        ? createPortal(
            <div
              className="fixed inset-0 z-[90] flex items-center justify-center bg-[#241B1D]"
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              onClick={() => setActive(null)}
            >
              <button
                type="button"
                aria-label="Close video"
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#FFFDFC] text-[#241B1D]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <video
                key={active.video}
                src={active.video}
                poster={active.image}
                controls
                autoPlay
                playsInline
                className="h-full max-h-[100dvh] w-full object-contain"
                onClick={(event) => event.stopPropagation()}
              />
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}
