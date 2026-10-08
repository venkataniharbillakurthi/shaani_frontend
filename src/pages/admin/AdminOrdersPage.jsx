import { useEffect, useState } from "react";
import { api } from "../../api/client";
import { formatPrice } from "../../data/products";

const STATUS = {
  pending: { label: "Pending", className: "bg-[#F4E4B3] text-[#4B0F1B]" },
  processing: { label: "Processing", className: "bg-[#781829] text-[#FFFDFC]" },
  delivered: { label: "Delivered", className: "bg-[#1F7A4D] text-[#FFFDFC]" },
  cancelled: { label: "Cancelled", className: "bg-[#E7D7D7] text-[#781829]" },
};

const STATUS_OPTIONS = [
  { status: "pending", label: "Pending" },
  { status: "processing", label: "Processing" },
  { status: "delivered", label: "Delivered" },
  { status: "cancelled", label: "Cancelled" },
];

const GROUPS = ["pending", "processing", "delivered", "cancelled"];

function canChoose(from) {
  return from !== "cancelled";
}

function todayValue() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function formatWhen(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [date, setDate] = useState(todayValue());
  const [revenue, setRevenue] = useState({ total: 0, orders: 0, label: "" });
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [cancelFor, setCancelFor] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  const loadOrders = async () => {
    const data = await api("/api/admin/orders", { auth: true });
    setOrders(data);
  };

  const loadRevenue = async (nextDate = date) => {
    const data = await api(`/api/admin/revenue?range=day&date=${nextDate}`, { auth: true });
    setRevenue(data);
  };

  useEffect(() => {
    Promise.all([loadOrders(), loadRevenue()]).catch((err) => setError(err.message));
  }, []);

  const changeDate = (value) => {
    setDate(value);
    loadRevenue(value).catch((err) => setError(err.message));
  };

  const changeStatus = async (order, status, reason = "") => {
    setBusyId(order.id);
    setError("");
    try {
      await api(`/api/admin/orders/${order.id}/status`, { method: "PUT", auth: true, body: { status, reason } });
      setCancelFor(null);
      setCancelReason("");
      setMenuId(null);
      await Promise.all([loadOrders(), loadRevenue()]);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const pickStatus = (order, status) => {
    setMenuId(null);
    if (status === order.status) return;
    if (status === "cancelled") {
      setCancelFor(order.id);
      setCancelReason("");
      setOpenId(order.id);
      return;
    }
    setCancelFor(null);
    changeStatus(order, status);
  };

  const confirmCancel = (order) => {
    const reason = cancelReason.trim();
    if (!reason) {
      setError("A cancellation reason is required.");
      return;
    }
    changeStatus(order, "cancelled", reason);
  };

  const removeOrder = async (order) => {
    const revenueNote = order.countsTowardRevenue ? " This amount will come out of revenue." : "";
    if (!window.confirm(`Delete order ${order.id}? This cannot be undone.${revenueNote}`)) return;
    setBusyId(order.id);
    setError("");
    try {
      await api(`/api/admin/orders/${order.id}`, { method: "DELETE", auth: true });
      if (openId === order.id) setOpenId(null);
      if (cancelFor === order.id) setCancelFor(null);
      await Promise.all([loadOrders(), loadRevenue()]);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <h1 className="font-headline-sm text-3xl text-[#4B0F1B]">Orders</h1>
      <p className="mt-1 text-sm text-[#241B1D]/70">Pending, processing, and delivered can be changed either way. Mark processing or delivered to count the amount. Cancelling asks for a reason and removes it from revenue.</p>

      <section className="mt-5 rounded-3xl border border-[#E9D8C5] bg-[#4B0F1B] p-4 text-[#FFFDFC] sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] tracking-[0.16em] text-[#C5A04A] uppercase">Revenue</p>
            <p className="mt-2 font-headline-sm text-4xl">{formatPrice(revenue.total)}</p>
            <p className="mt-1 text-sm text-[#E9D8C5]">{revenue.orders} counted {revenue.orders === 1 ? "order" : "orders"} · {revenue.label}</p>
          </div>
          <input
            type="date"
            value={date}
            onChange={(event) => changeDate(event.target.value)}
            className="h-12 w-full cursor-pointer rounded-full border border-[#E9D8C5]/40 bg-transparent px-4 text-base outline-none sm:w-auto"
            style={{ colorScheme: "dark" }}
          />
        </div>
      </section>

      <div className="sticky top-[68px] z-10 -mx-4 mt-4 flex gap-2 overflow-x-auto bg-[#F4EBE3]/95 px-4 py-2 backdrop-blur sm:top-[80px]">
        {GROUPS.map((status) => (
          <a key={status} href={`#orders-${status}`} className={`shrink-0 rounded-full px-3 py-2 text-[11px] tracking-[0.12em] uppercase ${STATUS[status].className}`}>
            {STATUS[status].label}
          </a>
        ))}
      </div>

      {error ? <p className="mt-4 text-sm text-[#781829]">{error}</p> : null}

      <div className="mt-6 space-y-8">
        {GROUPS.map((groupStatus) => {
          const groupTone = STATUS[groupStatus];
          const groupOrders = orders.filter((order) => order.status === groupStatus);
          return (
            <section key={groupStatus} id={`orders-${groupStatus}`} className="scroll-mt-28">
              <h2 className="flex items-center gap-2 font-headline-sm text-xl text-[#4B0F1B] sm:text-2xl">
                {groupTone.label}
                <span className={`rounded-full px-2.5 py-1 text-[10px] tracking-[0.12em] ${groupTone.className}`}>{groupOrders.length}</span>
              </h2>
              <div className="mt-3 grid gap-3">
                {groupOrders.length === 0 ? <p className="rounded-3xl border border-[#E9D8C5] bg-[#FFFDFC] px-4 py-6 text-sm text-[#241B1D]/70">No {groupTone.label.toLowerCase()} orders.</p> : null}
                {groupOrders.map((order) => {
          const tone = STATUS[order.status] ?? STATUS.pending;
          const open = openId === order.id;
          return (
            <article key={order.id} className="rounded-3xl border border-[#E9D8C5] bg-[#FFFDFC] p-3.5 sm:p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <button type="button" onClick={() => setOpenId(open ? null : order.id)} className="cursor-pointer font-headline-sm text-lg text-[#4B0F1B]">
                      Order {order.id}
                    </button>
                    <div className="relative">
                      <button
                        type="button"
                        disabled={busyId === order.id}
                        onClick={() => setMenuId(menuId === order.id ? null : order.id)}
                        className={`inline-flex h-8 cursor-pointer items-center gap-0.5 rounded-full px-2.5 text-[10px] tracking-[0.12em] uppercase disabled:opacity-50 ${tone.className}`}
                      >
                        {tone.label}
                        <span className="material-symbols-outlined text-[16px]">expand_more</span>
                      </button>
                      {menuId === order.id ? (
                        <>
                          <button type="button" aria-label="Close status menu" className="fixed inset-0 z-40 cursor-default" onClick={() => setMenuId(null)} />
                          <ul className="absolute left-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-[#E9D8C5] bg-[#FFFDFC] py-1 shadow-[0_12px_30px_rgba(36,27,29,0.12)]">
                            {STATUS_OPTIONS.map((option) => {
                              const allowed = canChoose(order.status);
                              return (
                                <li key={option.status}>
                                  <button
                                    type="button"
                                    disabled={!allowed || option.status === order.status}
                                    onClick={() => pickStatus(order, option.status)}
                                    className="flex h-11 w-full cursor-pointer items-center px-4 text-left text-sm text-[#241B1D] hover:bg-[#F8F3ED] disabled:cursor-default disabled:text-[#241B1D]/35 disabled:hover:bg-transparent"
                                  >
                                    {option.label}
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </>
                      ) : null}
                    </div>
                    {order.countsTowardRevenue ? <span className="text-[10px] tracking-[0.12em] text-[#1F7A4D] uppercase">In revenue</span> : null}
                  </div>
                  <button type="button" onClick={() => setOpenId(open ? null : order.id)} className="mt-1 cursor-pointer text-left">
                    <p className="text-sm break-words">{order.name} · {order.phone}</p>
                    <p className="text-xs text-[#241B1D]/60">{formatWhen(order.createdAt)} · {order.city}</p>
                    {order.cancelReason ? <p className="mt-1 text-xs break-words text-[#781829]">Cancelled: {order.cancelReason}</p> : null}
                  </button>
                </div>
                <p className="shrink-0 text-lg font-semibold text-[#781829]">{formatPrice(order.subtotal)}</p>
              </div>
              <div className={`mt-3 grid grid-cols-1 gap-2 ${order.status === "pending" ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                {order.status !== "cancelled" && order.status !== "processing" ? (
                  <button
                    type="button"
                    disabled={busyId === order.id}
                    onClick={() => pickStatus(order, "processing")}
                    className="h-12 cursor-pointer rounded-full bg-[#781829] px-4 text-xs tracking-[0.12em] text-[#FFFDFC] uppercase disabled:opacity-40"
                  >
                    Mark processing
                  </button>
                ) : null}
                {order.status !== "cancelled" && order.status !== "delivered" ? (
                  <button
                    type="button"
                    disabled={busyId === order.id}
                    onClick={() => pickStatus(order, "delivered")}
                    className="h-12 cursor-pointer rounded-full bg-[#781829] px-4 text-xs tracking-[0.12em] text-[#FFFDFC] uppercase disabled:opacity-40"
                  >
                    Mark delivered
                  </button>
                ) : null}
                <button
                  type="button"
                  disabled={busyId === order.id}
                  onClick={() => removeOrder(order)}
                  className={`inline-flex h-12 cursor-pointer items-center justify-center gap-1 rounded-full border border-[#781829] px-3 text-xs tracking-[0.12em] text-[#781829] uppercase disabled:opacity-40 ${order.status === "cancelled" ? "col-span-2 sm:col-span-1" : ""}`}
                >
                  <span className="material-symbols-outlined text-[18px]">ads_click</span>
                  Delete
                </button>
              </div>
              {cancelFor === order.id ? (
                <div className="mt-4 rounded-2xl border border-[#E9D8C5] bg-[#F8F3ED] p-4">
                  <label htmlFor={`cancel-${order.id}`} className="text-[11px] tracking-[0.14em] text-[#4B0F1B] uppercase">Cancellation reason</label>
                  <textarea
                    id={`cancel-${order.id}`}
                    required
                    value={cancelReason}
                    onChange={(event) => setCancelReason(event.target.value)}
                    placeholder="Why is this order being cancelled?"
                    className="mt-2 h-20 w-full resize-none rounded-2xl border border-[#E9D8C5] bg-[#FFFDFC] px-3 py-2 text-sm outline-none"
                  />
                  <p className="mt-2 text-xs text-[#241B1D]/70">Required. If this order is in revenue, cancelling removes that amount.</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      disabled={busyId === order.id || !cancelReason.trim()}
                      onClick={() => confirmCancel(order)}
                      className="h-12 cursor-pointer rounded-full bg-[#781829] px-4 text-xs tracking-[0.12em] text-[#FFFDFC] uppercase disabled:opacity-40"
                    >
                      Confirm cancellation
                    </button>
                    <button
                      type="button"
                      onClick={() => { setCancelFor(null); setCancelReason(""); }}
                      className="h-12 cursor-pointer rounded-full border border-[#E9D8C5] px-4 text-xs tracking-[0.12em] uppercase"
                    >
                      Keep order
                    </button>
                  </div>
                </div>
              ) : null}

              {open ? (
                <div className="mt-4 border-t border-[#E9D8C5] pt-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="text-sm leading-6 break-words">
                      <p className="text-[11px] tracking-[0.14em] text-[#C5A04A] uppercase">Customer</p>
                      <p className="mt-1">{order.name}</p>
                      <p>{order.phone}</p>
                      <p className="break-all">{order.email}</p>
                      <p className="mt-2 whitespace-pre-line">{order.address}</p>
                      <p>{order.locality}{order.landmark ? `, ${order.landmark}` : ""}</p>
                      <p>{order.city}, {order.state} {order.pincode}</p>
                      {order.note ? <p className="mt-2 text-[#241B1D]/70">Note: {order.note}</p> : null}
                      {order.cancelReason ? <p className="mt-2 text-[#781829]">Reason: {order.cancelReason}</p> : null}
                      {order.cancelledAt ? <p className="text-xs text-[#241B1D]/60">Cancelled {formatWhen(order.cancelledAt)}</p> : null}
                    </div>
                    <div>
                      <p className="text-[11px] tracking-[0.14em] text-[#C5A04A] uppercase">Products</p>
                      <ul className="mt-2 space-y-2">
                        {order.items.map((item) => (
                          <li key={`${item.productId}-${item.size}-${item.title}`} className="flex gap-3 text-sm">
                            {item.image ? <img src={item.image} alt="" loading="lazy" decoding="async" className="h-14 w-12 rounded-lg object-cover" /> : null}
                            <span className="min-w-0 break-words">
                              {item.title}
                              <span className="block text-xs text-[#241B1D]/60">Size {item.size} · Qty {item.qty} · {formatPrice(item.lineTotal)}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}
            </article>
          );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
