export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

export const staggerItem = fadeUp;

export const imageHover = { scale: 1.03 };

export const buttonHover = { scale: 1.02 };

export const drawer = {
  hidden: { x: "100%" },
  show: { x: 0, transition: { type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { x: "100%", transition: { duration: 0.28 } },
};

export const mobileMenu = {
  hidden: { opacity: 0, height: 0 },
  show: { opacity: 1, height: "auto", transition: { duration: 0.25 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
};
