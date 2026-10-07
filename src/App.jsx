import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { useAdminAuth } from "./context/AdminAuthContext";
import AboutPage from "./pages/about/AboutPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminMessagesPage from "./pages/admin/AdminMessagesPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminPasswordPage from "./pages/admin/AdminPasswordPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import CartPage from "./pages/cart/CartPage";
import ContactPage from "./pages/contact/ContactPage";
import HomePage from "./pages/home/HomePage";
import PrivacyPolicyPage from "./pages/privacy-policy/PrivacyPolicyPage";
import ProductDetailsPage from "./pages/product/ProductDetailsPage";
import ShopPage from "./pages/shop/ShopPage";
import TermsConditionsPage from "./pages/terms-conditions/TermsConditionsPage";

function AdminGuard() {
  const { ready, username } = useAdminAuth();
  if (!ready) return null;
  if (!username) return <Navigate to="/admin/login" replace />;
  return <AdminLayout />;
}

export default function App() {
  return (
    <Routes>
      <Route path="admin/login" element={<AdminLoginPage />} />
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
