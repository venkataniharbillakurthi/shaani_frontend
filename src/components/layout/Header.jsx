import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LOGO_SRC, NAV_LINKS, WHATSAPP_URL } from "../../constants/site";
import { useCart } from "../../context/CartContext";

const iconButtonClass =
  "relative flex size-10 items-center justify-center text-[#241B1D] transition-colors hover:text-primary";

function NavItem({ to, label, onClick, className }) {
  return (
    <NavLink to={to} end={to === "/"} onClick={onClick} className={className}>
      {label}
    </NavLink>
  );
}

const desktopLinkClass = ({ isActive }) =>
  `px-2 py-3 text-[15px] font-medium transition-colors hover:text-primary ${
    isActive ? "text-primary" : "text-[#241B1D]"
  }`;

export default function Header() {
  const { pathname } = useLocation();
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const hideTimer = useRef(null);
  const menuOpenRef = useRef(false);
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
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex h-9 items-center overflow-hidden whitespace-nowrap border-b border-[#e9c168]/20 bg-[#4B0F1B] text-[#ffdf9c]">
          <div className="animate-marquee flex items-center font-label-uppercase text-[10px] tracking-[0.18em] sm:text-[11px] sm:tracking-[0.22em]">
            {Array.from({ length: 4 }).map((_, index) => (
              <span key={index} className="mx-6 flex shrink-0 items-center">
                NEW COLLECTIONS • ALL INDIA DELIVERY • ORDER ON WHATSAPP • SPECIAL OFFERS • HANDCRAFTED WEAR
              </span>
            ))}
          </div>
        </div>
        <div className="relative mx-auto flex h-16 w-full items-center justify-between px-4 md:h-[88px] md:px-8 lg:px-10">
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            className={`${iconButtonClass} md:hidden`}
            onClick={() => setMenuOpen(true)}
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          <nav className="hidden items-center gap-6 md:flex lg:gap-8">
            {NAV_LINKS.map((link) => (
              <NavItem key={link.to} to={link.to} label={link.label} className={desktopLinkClass} />
            ))}
          </nav>

          <NavLink
            to="/"
            aria-label="Shaani Clothing home"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <img
              alt="Shaani Clothing"
              decoding="async"
              className="size-11 object-contain md:size-16"
              src={LOGO_SRC}
            />
          </NavLink>

          <div className="ml-auto flex items-center gap-2 md:gap-4">
            <Link
              to="/shop"
              aria-label="Search products"
              className={`${iconButtonClass} hidden md:flex`}
            >
              <span className="material-symbols-outlined text-[25px]">search</span>
            </Link>
            <a
              href={WHATSAPP_URL}
              rel="noopener noreferrer"
              target="_blank"
              className="hidden items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4B0F1B] md:inline-flex"
            >
              <span className="material-symbols-outlined text-[19px] text-[#C5A04A]">chat</span>
              WhatsApp Order
            </a>
            <Link
              to="/shop"
              aria-label="Browse products"
              className={`${iconButtonClass} md:hidden`}
            >
              <span className="material-symbols-outlined text-[23px]">search</span>
            </Link>
            <button
              type="button"
              aria-label={`Open shopping cart, ${count} items`}
              className={iconButtonClass}
              onClick={openCart}
            >
              <span className="material-symbols-outlined text-[23px]">shopping_bag</span>
              {count > 0 ? (
                <span className="absolute right-0 top-0 flex min-w-4 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full bg-primary px-1 text-[10px] leading-4 text-white">
                  {count}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-50 bg-black/35 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.nav
              aria-label="Mobile navigation"
              className="flex h-full w-[min(84vw,320px)] flex-col bg-white px-5 pb-6 pt-5"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">Menu</span>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  className="flex size-10 items-center justify-center text-[#241B1D]"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="material-symbols-outlined text-[22px]">close</span>
                </button>
              </div>
              <div className="mt-6 flex flex-col">
                {NAV_LINKS.map((link) => (
                  <NavItem
                    key={link.to}
                    to={link.to}
                    label={link.label}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `border-b border-[#f0dee1] py-4 text-sm transition-colors ${
                        isActive ? "font-semibold text-primary" : "text-[#241B1D]"
                      }`
                    }
                  />
                ))}
              </div>
              <a
                href={WHATSAPP_URL}
                rel="noopener noreferrer"
                target="_blank"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-white"
              >
                <span className="material-symbols-outlined text-[18px] text-[#C5A04A]">chat</span>
                WhatsApp Order
              </a>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
