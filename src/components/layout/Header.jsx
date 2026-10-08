import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LOGO_SRC, NAV_LINKS, WHATSAPP_URL } from "../../constants/site";
import { useCart } from "../../context/CartContext";

const iconButtonClass =
  "w-11 h-11 rounded-full border border-[#c5a04a]/45 bg-white/90 shadow-sm flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-[#fbeaec] hover:border-[#c5a04a] transition-all";

const linkClass =
  (onHero) =>
  ({ isActive }) =>
    isActive
      ? "rounded-full px-4 py-2 bg-[#781829] text-[#fff8f8] font-label-uppercase text-[12px] tracking-[0.16em] uppercase shadow-sm"
      : onHero
        ? "rounded-full px-4 py-2 font-label-uppercase text-[12px] tracking-[0.16em] uppercase text-white/95 hover:text-[#ffdf9c] hover:bg-white/10 transition-colors"
        : "rounded-full px-4 py-2 font-label-uppercase text-[12px] tracking-[0.16em] uppercase text-on-surface-variant hover:text-primary hover:bg-[#fbeaec] transition-colors";

function NavItem({ to, label, onClick, className }) {
  return (
    <NavLink to={to} end={to === "/"} onClick={onClick} className={className}>
      {label}
    </NavLink>
  );
}

const menuVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
};

export default function Header() {
  const { pathname } = useLocation();
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const hideTimer = useRef(null);
  const menuOpenRef = useRef(false);
  const onHero = pathname === "/" && !scrolled && !hidden;
  menuOpenRef.current = menuOpen;

  useEffect(() => {
    setHidden(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const armHide = () => {
      window.clearTimeout(hideTimer.current);
      if (window.scrollY <= 40 || menuOpenRef.current) return;
      hideTimer.current = window.setTimeout(() => {
        if (!menuOpenRef.current) setHidden(true);
      }, 2000);
    };

    const onScroll = () => {
      const away = window.scrollY > 40;
      setScrolled(away);
      setHidden(false);
      armHide();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(hideTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    setHidden(false);
    window.clearTimeout(hideTimer.current);
    return undefined;
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${onHero ? "shadow-none" : "shadow-[0_4px_24px_rgba(75,15,27,0.06)]"}`}
    >
      <div className="bg-[#4B0F1B] text-[#ffdf9c] overflow-hidden whitespace-nowrap h-9 flex items-center select-none border-b border-[#e9c168]/20">
        <div className="animate-marquee flex items-center font-label-uppercase text-[11px] tracking-[0.22em]">
          {Array.from({ length: 4 }).map((_, index) => (
            <span key={index} className="flex items-center mx-8">
              NEW COLLECTIONS • ALL INDIA DELIVERY • ORDER ON WHATSAPP • SPECIAL OFFERS • HANDCRAFTED WEAR
            </span>
          ))}
        </div>
      </div>

      <div
        className={`transition-colors ${
          onHero ? "bg-transparent border-b border-transparent" : "bg-[#fff8f8]/95 backdrop-blur-md border-b border-[#c5a04a]/30"
        }`}
      >
        <div className="h-[88px] w-full px-margin-mobile md:px-margin flex items-center justify-between gap-gutter">
          <div className="flex items-center shrink-0">
            <NavLink
              to="/"
              aria-label="Shaani Clothing home"
              className="flex items-center rounded-full transition-transform hover:scale-[1.03]"
            >
              <img
                alt="Shaani Clothing"
                decoding="async"
                className="h-16 w-16 rounded-full object-cover ring-2 ring-[#c5a04a] shadow-[0_6px_18px_rgba(75,15,27,0.18)]"
                src={LOGO_SRC}
              />
            </NavLink>
          </div>

          <nav className="hidden md:flex items-center justify-center gap-8 flex-1 px-space-md">
            {NAV_LINKS.map((link) => (
              <NavItem key={link.to} to={link.to} label={link.label} className={linkClass(onHero)} />
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-2.5 shrink-0">
            
            <button type="button" aria-label="Open shopping cart" className={`${iconButtonClass} relative`} onClick={openCart}>
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 rounded-full bg-[#781829] text-white font-body-sm text-[10px] leading-none font-bold flex items-center justify-center shadow-sm border border-[#C5A04A]">
                {count}
              </span>
            </button>
            <a
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#781829] text-[#fff8f8] border border-[#c5a04a] rounded-full font-label-uppercase text-[11px] tracking-wider hover:bg-[#4B0F1B] transition-all shadow-[0_4px_16px_rgba(120,24,41,0.25)]"
              href={WHATSAPP_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[17px] text-[#e9c168]">chat</span>
              WhatsApp Order
            </a>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={`${iconButtonClass} md:hidden text-primary`}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="material-symbols-outlined text-[24px]">{menuOpen ? "close" : "menu"}</span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.nav
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-[#c5a04a]/25 bg-[#fff8f8] md:hidden"
            >
              <motion.div className="flex flex-col gap-2 px-margin-mobile py-4" variants={menuVariants} initial="hidden" animate="show">
                {NAV_LINKS.map((link) => (
                  <motion.div key={link.to} variants={itemVariants}>
                    <NavItem
                      to={link.to}
                      label={link.label}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-2xl px-4 py-3 font-label-uppercase text-[13px] tracking-[0.16em] text-primary uppercase hover:bg-[#fbeaec]"
                    />
                  </motion.div>
                ))}
                <motion.a
                  variants={itemVariants}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#c5a04a] bg-[#781829] px-5 py-3 font-label-uppercase text-[11px] tracking-wider text-[#fff8f8]"
                  href={WHATSAPP_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[17px] text-[#e9c168]">chat</span>
                  WhatsApp Order
                </motion.a>
              </motion.div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
