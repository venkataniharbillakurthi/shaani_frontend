import { motion } from "framer-motion";
import { PHONE_DISPLAY, WHATSAPP_URL } from "../../constants/site";

export default function WhatsAppSection() {
  return (
    <section className="w-full bg-[#6d1a28] text-on-primary px-margin-mobile md:px-margin py-16 md:py-20">
      <motion.div
        className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-xl">
          <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#fffaf6] leading-tight">Found Something You Love?</h2>
          <span className="mt-4 block h-px w-16 bg-[#e9c168] mx-auto md:mx-0" />
          <p className="font-body-lg text-[16px] leading-7 text-[#f7efe8]/90 mt-4">
            Ask us about size, fabric, or what is in stock. The boutique team replies on WhatsApp.
          </p>
          <p className="text-[#ffdf9c] font-semibold text-lg pt-3">{PHONE_DISPLAY}</p>
        </div>
        <a
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ffdf9c] px-7 py-3.5 font-label-uppercase text-xs tracking-[0.14em] text-[#6d1a28] uppercase shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#fff8f8] sm:w-auto sm:shrink-0"
          href={WHATSAPP_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="material-symbols-outlined text-xl">chat</span>
          Chat on WhatsApp
        </a>
      </motion.div>
    </section>
  );
}
