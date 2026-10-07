import { Link } from "react-router-dom";
import { PHONE_DISPLAY, WHATSAPP_URL } from "../../constants/site";

const sections = [
  {
    title: "Who we are",
    body: "Shaani Clothing is a women’s ethnic boutique at Factory Outlet, Kodad, Telangana. This policy explains what we collect when you browse the site, save a bag, or send an order on WhatsApp.",
  },
  {
    title: "Information we collect",
    body: "If you place an order, we receive the name, mobile number, email, pincode, house and street, locality, landmark, city, state, and optional note you type, plus the products, sizes, quantities, and prices in that order. The contact form collects name, phone, email, subject, and message. We do not ask for card numbers on this website.",
  },
  {
    title: "How we use it",
    body: "We use these details to reply to you, check availability, and follow the order from pending to processing, delivered, or cancelled. We do not sell your details.",
  },
  {
    title: "Your bag on this device",
    body: "The bag is saved in local storage on your phone or computer so the items stay if you refresh the page. Clearing the site data on your device removes that bag. We do not use analytics cookies.",
  },
  {
    title: "WhatsApp and other services",
    body: `Sending an order opens WhatsApp to ${PHONE_DISPLAY}. Messages there are handled in WhatsApp. Product and brand images may load from the image hosts already used on the site. The Instagram link leaves this website.`,
  },
  {
    title: "How long we keep orders",
    body: "Order details stay in the boutique records so we can fulfil and answer questions about that order. You can message us on WhatsApp if you want a correction to the contact details you sent.",
  },
  {
    title: "Contact",
    body: "The outlet is open Monday to Saturday, 10:00 AM to 10:00 PM, and Sunday, 10:00 AM to 9:00 PM. Hours might differ. For a privacy question, message us on WhatsApp.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <article className="bg-surface px-margin-mobile py-12 md:px-margin md:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="font-label-uppercase text-[11px] tracking-[0.18em] text-[#caa44e] uppercase">Shaani Clothing</p>
        <h1 className="mt-3 font-headline-lg text-3xl text-primary sm:text-5xl">Privacy Policy</h1>
        <span className="mt-4 block h-px w-16 bg-[#c5a04a]" />
        <p className="mt-4 font-body-lg text-[16px] leading-7 text-on-surface-variant">
          This page describes the details Shaani Clothing receives from this website and from WhatsApp orders.
        </p>

        <div className="mt-8 space-y-4">
          {sections.map((section) => (
            <section key={section.title} className="rounded-3xl border border-[#c5a04a]/30 bg-surface-container-lowest p-5 shadow-[0_10px_28px_rgba(75,15,27,0.06)] sm:p-6">
              <h2 className="font-headline-sm text-2xl text-primary">{section.title}</h2>
              <p className="mt-2 text-sm leading-7 text-[#241B1D]/80">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center rounded-full bg-[#781829] px-5 text-xs tracking-[0.14em] text-[#FFFDFC] uppercase">
            Message on WhatsApp
          </a>
          <Link to="/terms-conditions" className="inline-flex h-12 items-center justify-center rounded-full border border-[#E9D8C5] px-5 text-xs tracking-[0.14em] text-[#4B0F1B] uppercase">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </article>
  );
}
