import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { useAdminAuth } from "./context/AdminAuthContext";

const AboutPage = lazy(() => import("./pages/about/AboutPage"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminMessagesPage = lazy(() => import("./pages/admin/AdminMessagesPage"));
const AdminOrdersPage = lazy(() => import("./pages/admin/AdminOrdersPage"));
const AdminPasswordPage = lazy(() => import("./pages/admin/AdminPasswordPage"));
const AdminProductsPage = lazy(() => import("./pages/admin/AdminProductsPage"));
const CartPage = lazy(() => import("./pages/cart/CartPage"));
const ContactPage = lazy(() => import("./pages/contact/ContactPage"));
const HomePage = lazy(() => import("./pages/home/HomePage"));
const PrivacyPolicyPage = lazy(() => import("./pages/privacy-policy/PrivacyPolicyPage"));
const ProductDetailsPage = lazy(() => import("./pages/product/ProductDetailsPage"));
const ShopPage = lazy(() => import("./pages/shop/ShopPage"));
const TermsConditionsPage = lazy(() => import("./pages/terms-conditions/TermsConditionsPage"));

function PageFallback() {
  return <div className="min-h-[50vh] bg-[#F8F3ED]" aria-hidden="true" />;
}

function AdminGuard() {
  const { ready, username } = useAdminAuth();
  if (!ready) return null;
  if (!username) return <Navigate to="/admin/login" replace />;
  return (
    <Suspense fallback={<PageFallback />}>
      <AdminLayout />
    </Suspense>
  );
}

export default function App() {
  return (
    <Routes>
        <Route path="admin/login" element={<Suspense fallback={<PageFallback />}><AdminLoginPage /></Suspense>} />
        <Route path="admin" element={<AdminGuard />}>
          <Route index element={<AdminProductsPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="messages" element={<AdminMessagesPage />} />
          <Route path="password" element={<AdminPasswordPage />} />
        </Route>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="product/:slug" element={<ProductDetailsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms-conditions" element={<TermsConditionsPage />} />
        </Route>
    </Routes>
  );
}
