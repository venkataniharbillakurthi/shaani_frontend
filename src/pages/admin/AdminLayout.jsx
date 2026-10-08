import { Suspense } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Seo from "../../components/seo/Seo";
import { LOGO_SRC } from "../../constants/site";
import { useAdminAuth } from "../../context/AdminAuthContext";

const linkClass = ({ isActive }) =>
  `flex h-10 cursor-pointer items-center justify-center rounded-full px-4 text-[11px] tracking-[0.14em] uppercase ${isActive ? "bg-[#781829] text-[#FFFDFC]" : "bg-[#F8F3ED] text-[#4B0F1B]"}`;

const tabClass = ({ isActive }) =>
  `flex min-h-16 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-2xl px-1 text-[10px] leading-tight tracking-[0.04em] uppercase ${isActive ? "bg-[#781829] text-[#FFFDFC]" : "text-[#4B0F1B]"}`;

export default function AdminLayout() {
  const { username, logout } = useAdminAuth();
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-[#F4EBE3] text-[#241B1D]">
      <Seo title="Admin | Shaani Clothing" description="Shaani Clothing admin." path={pathname} noIndex />
      <header className="sticky top-0 z-20 border-b border-[#E9D8C5] bg-[#FFFDFC]/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:max-w-5xl">
          <div className="flex min-w-0 items-center gap-3">
            <img src={LOGO_SRC} alt="Shaani Clothing" decoding="async" className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-[#C5A04A] shadow-[0_6px_18px_rgba(75,15,27,0.18)] sm:h-14 sm:w-14" />
            <div className="min-w-0">
              <p className="text-[10px] tracking-[0.2em] text-[#C5A04A] uppercase">Shaani Clothing</p>
              <p className="truncate font-headline-sm text-xl text-[#4B0F1B]">Admin</p>
            </div>
          </div>
          <nav className="hidden items-center gap-2 sm:flex">
            <NavLink to="/admin" end className={linkClass}>
              Products
            </NavLink>
            <NavLink to="/admin/orders" className={linkClass}>
              Orders
            </NavLink>
            <NavLink to="/admin/messages" className={linkClass}>
              Messages
            </NavLink>
            <NavLink to="/admin/password" className={linkClass}>
              Password
            </NavLink>
            <button type="button" onClick={logout} className="inline-flex h-10 cursor-pointer items-center rounded-full border border-[#E9D8C5] px-4 text-[11px] tracking-[0.12em] uppercase">
              Sign out {username}
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-5 pb-28 sm:max-w-6xl sm:py-8 sm:pb-8">
        <Suspense fallback={<div className="min-h-[40vh]" aria-hidden="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-[#E9D8C5] bg-[#FFFDFC]/95 px-2 pt-2 backdrop-blur sm:hidden" style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}>
        <div className="grid grid-cols-5 gap-1">
          <NavLink to="/admin" end className={tabClass}>
            <span className="material-symbols-outlined text-[22px]">inventory_2</span>
            Products
          </NavLink>
          <NavLink to="/admin/orders" className={tabClass}>
            <span className="material-symbols-outlined text-[22px]">receipt_long</span>
            Orders
          </NavLink>
          <NavLink to="/admin/messages" className={tabClass}>
            <span className="material-symbols-outlined text-[22px]">mail</span>
            Messages
          </NavLink>
          <NavLink to="/admin/password" className={tabClass}>
            <span className="material-symbols-outlined text-[22px]">key</span>
            Password
          </NavLink>
          <button type="button" onClick={logout} className="flex min-h-16 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-2xl px-1 text-[10px] leading-tight tracking-[0.04em] text-[#4B0F1B] uppercase">
            <span className="material-symbols-outlined text-[22px]">logout</span>
            Sign out
          </button>
        </div>
      </nav>
    </div>
  );
}
