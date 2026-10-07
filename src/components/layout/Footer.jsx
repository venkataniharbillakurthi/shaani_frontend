import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { INSTAGRAM_URL, LOGO_SRC, PHONE_DISPLAY, WHATSAPP_URL } from "../../constants/site";
import { customerLinks, quickLinks, shopLinks } from "../../data/navigation";

const columnVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function Footer() {
  return (
    <footer className="w-full bg-[#4B0F1B] text-[#F8F3ED] border-t border-[#C5A04A]/25">
      <div className="w-full px-margin-mobile md:px-margin py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.08 }}
        >
          <motion.div variants={columnVariants} className="flex flex-col gap-4">
            <img
              alt="Shaani Clothing"
              className="h-16 w-16 rounded-full object-cover ring-2 ring-[#c5a04a]"
              src={LOGO_SRC}
            />
            <p className="font-headline-sm text-[18px] text-[#C5A04A] leading-relaxed">Elegance in Every Thread.</p>
            <p className="text-[13px] leading-6 text-[#f0dee1]/80">
              3-piece sets chosen for comfort and celebration, delivered across India.
            </p>
          </motion.div>

          <motion.div variants={columnVariants} className="flex flex-col gap-2">
            <p className="font-label-uppercase text-[11px] tracking-[0.18em] text-[#e9c168] uppercase mb-2">Shop</p>
            {shopLinks.map((link) => (
              <Link key={link.to} to={link.to} className="text-[14px] text-[#F8F3ED]/80 hover:text-[#FFFDFC] transition-colors">
                {link.label}
              </Link>
            ))}
          </motion.div>

          <motion.div variants={columnVariants} className="flex flex-col gap-2">
            <p className="font-label-uppercase text-[11px] tracking-[0.18em] text-[#C5A04A] uppercase mb-2">Quick Links</p>
            {quickLinks.map((link) => (
              <Link key={link.to} to={link.to} className="text-[14px] text-[#F8F3ED]/80 hover:text-[#FFFDFC] transition-colors">
                {link.label}
              </Link>
            ))}
            <p className="font-label-uppercase text-[11px] tracking-[0.18em] text-[#C5A04A] uppercase mt-4 mb-2">Customer</p>
            {customerLinks.map((link) => (
              <Link key={link.to} to={link.to} className="text-[14px] text-[#F8F3ED]/80 hover:text-[#FFFDFC] transition-colors">
                {link.label}
              </Link>
            ))}
          </motion.div>

          <motion.div variants={columnVariants} className="flex flex-col gap-3">
            <p className="font-label-uppercase text-[11px] tracking-[0.18em] text-[#e9c168] uppercase">Connect</p>
            <a
              className="flex min-w-0 items-center gap-2 break-words text-[14px] text-[#f0dee1]/80 transition-colors hover:text-[#fffaf6]"
              href={INSTAGRAM_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px] text-[#e9c168]">photo_camera</span>
              @shaaniclothing_kodad
            </a>
            <a
              className="flex items-center gap-2 text-[14px] text-[#f0dee1]/80 hover:text-[#fffaf6] transition-colors"
              href={WHATSAPP_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px] text-[#e9c168]">call</span>
              {PHONE_DISPLAY}
            </a>
            <p className="mt-2 rounded-2xl border border-[#c5a04a]/30 bg-white/5 px-4 py-3 text-[13px] leading-5 text-[#e9c168]">
              Monday - Saturday 10:00 AM - 10:00 PM. Sunday 10:00 AM - 9:00 PM.
            </p>
          </motion.div>
        </motion.div>

        <div className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left border-t border-white/10">
          <p className="text-[14px] text-[#f0dee1]/90">Premium styles. Thoughtfully curated. Delivered across India.</p>
          <p className="text-[12px] text-[#f0dee1]/70">© 2026 Shaani Clothing. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
