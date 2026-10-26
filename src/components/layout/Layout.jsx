import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import CartDrawer from "../cart/CartDrawer";
import WhatsAppButton from "../common/WhatsAppButton";
import SiteSeo from "../seo/SiteSeo";
import Footer from "./Footer";
import Header from "./Header";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function Layout() {
  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen">
      <ScrollToTop />
      <SiteSeo />
      <Header />
      <main className="min-h-screen w-full bg-background pt-[100px] md:pt-[124px]">
        <Suspense fallback={<div className="min-h-[50vh]" aria-hidden="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </div>
  );
}
