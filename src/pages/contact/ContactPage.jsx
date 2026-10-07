import { motion } from "framer-motion";
import { useState } from "react";
import { api } from "../../api/client";
import StoreMap from "../../components/common/StoreMap";
import { INSTAGRAM_URL, PHONE_DISPLAY, STORE_HOURS, STORE_HOURS_NOTE, WHATSAPP_URL } from "../../constants/site";

const initial = { name: "", phone: "", email: "", subject: "", message: "" };

const cards = [
  { label: "WhatsApp", value: PHONE_DISPLAY, href: WHATSAPP_URL, icon: "chat" },
  { label: "Phone", value: PHONE_DISPLAY, href: "tel:+918639373403", icon: "call" },
  { label: "Instagram", value: "@shaaniclothing_kodad", href: INSTAGRAM_URL, icon: "photo_camera" },
];

export default function ContactPage() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const onChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setSent(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Enter your full name.";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, "").replace(/^\+91/, ""))) next.phone = "Enter a 10-digit Indian mobile number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.subject.trim()) next.subject = "Enter a subject.";
    if (form.message.trim().length < 10) next.message = "Enter a message of at least 10 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setPending(true);
    setSubmitError("");
    try {
      await api("/api/messages", { method: "POST", body: { ...form, phone: form.phone.replace(/\s/g, "").replace(/^\+91/, "") } });
      setSent(true);
      setForm(initial);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="bg-surface px-margin-mobile py-12 md:px-margin md:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="font-label-uppercase text-[11px] tracking-[0.18em] text-[#caa44e] uppercase">Contact Shaani</p>
          <h1 className="mt-3 font-headline-lg text-3xl text-primary sm:text-5xl">Let&apos;s Connect.</h1>
          <span className="mt-4 block h-px w-16 bg-[#c5a04a]" />
          <p className="mt-4 font-body-lg text-[16px] leading-7 text-on-surface-variant">
            Looking for a particular style? Need help with sizing? Want to know about availability or place an order? Our team is here to help.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <a
              key={card.label}
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="rounded-3xl border border-[#c5a04a]/30 bg-surface-container-lowest p-6 shadow-[0_10px_28px_rgba(75,15,27,0.06)] transition-transform hover:-translate-y-1"
            >
              <span className="material-symbols-outlined text-[#caa44e]">{card.icon}</span>
              <p className="mt-3 font-label-uppercase text-[11px] tracking-[0.14em] text-[#caa44e] uppercase">{card.label}</p>
              <p className="mt-2 font-headline-sm break-words text-primary">{card.value}</p>
            </a>
          ))}
        </div>

        <div className="mt-5 rounded-3xl border border-[#c5a04a]/30 bg-surface-container-lowest p-5 sm:p-6">
          <p className="font-label-uppercase text-[11px] tracking-[0.16em] text-[#caa44e] uppercase">Hours</p>
          <ul className="mt-4 divide-y divide-[#E9D8C5]">
            {STORE_HOURS.map(([day, time]) => (
              <li key={day} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                <span className="text-[#241B1D]">{day}</span>
                <span className="text-[#4B0F1B]">{time}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-[#241B1D]/70">{STORE_HOURS_NOTE}</p>
        </div>

        <div className="mt-5">
          <StoreMap />
        </div>

        <form onSubmit={onSubmit} noValidate className="mt-8 rounded-3xl border border-[#c5a04a]/30 bg-surface-container-lowest p-5 shadow-[0_10px_28px_rgba(75,15,27,0.06)] sm:p-6 md:p-8">
          <h2 className="font-headline-sm text-2xl text-primary">Send a message</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["name", "Full Name"],
              ["phone", "Phone Number"],
              ["email", "Email"],
              ["subject", "Subject"],
            ].map(([name, label]) => (
              <label key={name} className="font-body-md text-sm text-on-surface">
                {label}
                <input
                  name={name}
                  value={form[name]}
                  onChange={onChange}
                  className="mt-2 w-full rounded-full border border-[#c5a04a]/40 bg-white px-4 py-2.5 outline-none focus:border-[#781829]"
                />
                {errors[name] ? <span className="mt-1 block text-xs text-[#781829]">{errors[name]}</span> : null}
              </label>
            ))}
            <label className="font-body-md text-sm text-on-surface md:col-span-2">
              Message
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                rows={5}
                className="mt-2 w-full rounded-3xl border border-[#c5a04a]/40 bg-white px-4 py-3 outline-none focus:border-[#781829]"
              />
              {errors.message ? <span className="mt-1 block text-xs text-[#781829]">{errors.message}</span> : null}
            </label>
          </div>
          <button
            type="submit"
            disabled={pending}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#6d1a28] px-8 py-3.5 font-label-uppercase text-xs tracking-[0.14em] text-[#fff8f8] uppercase shadow-[0_8px_24px_rgba(75,15,27,0.22)] hover:bg-[#4B0F1B] disabled:opacity-40 sm:w-auto"
          >
            {pending ? "Sending" : "Send Message"}
          </button>
          {submitError ? <p className="mt-4 text-sm text-[#781829]">{submitError}</p> : null}
          {sent ? (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 font-body-md text-primary">
              Message sent. Shaani Clothing has it by email and in the admin panel.
            </motion.p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
