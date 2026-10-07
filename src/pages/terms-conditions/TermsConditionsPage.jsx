import { Link } from "react-router-dom";
import { PHONE_DISPLAY, WHATSAPP_URL } from "../../constants/site";

const sections = [
  {
    title: "Using this website",
    body: "Shaani Clothing is a women’s ethnic boutique at Factory Outlet, Kodad, Telangana. Browsing the site lets you view styles and send an order request. A request is an order only after the boutique confirms it.",
  },
  {
    title: "Products",
    body: "Photographs show the style. Colour and detail can vary slightly from the screen. Size options are listed on each product. If a piece is marked out of stock, it cannot be ordered until it is available again.",
  },
  {
    title: "Prices",
    body: "Prices are in Indian rupees. Where a discount price is shown, that is the selling price, and the higher figure is the actual price. Prices can change when the catalogue is updated. The amount in your bag is the amount sent with the WhatsApp message.",
  },
  {
    title: "Orders",
    body: "Add the pieces to your bag, fill in the delivery details, and send the message on WhatsApp. The boutique then marks the order pending, and later processing, delivered, or cancelled. Availability is confirmed in that conversation.",
  },
  {
    title: "Payment",
    body: "This website does not take payment. Do not send card numbers in the site form. How you pay is arranged with Shaani Clothing on WhatsApp after the order is confirmed.",
  },
  {
    title: "Delivery",
    body: "Delivery is arranged from the Kodad boutique when the order is confirmed. Coverage and charges are shared on WhatsApp with that order. They are not added automatically on this website.",
  },
  {
    title: "Changes and cancellations",
    body: "Message us on WhatsApp if you need to change or cancel an order. A cancelled order is removed from the boutique’s counted revenue. Ask us on WhatsApp before expecting a return or exchange. A return window is not set on this page.",
  },
  {
    title: "The Shaani name and pictures",
    body: "The Shaani Clothing name, logo, and photographs on this site belong to their owners. Please do not copy them for another store.",
  },
  {
    title: "The website",
    body: "Pages and products may be updated, and the site may be briefly unavailable while those updates are published.",
  },
];

export default function TermsConditionsPage() {
  return (
    <article className="bg-surface px-margin-mobile py-12 md:px-margin md:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="font-label-uppercase text-[11px] tracking-[0.18em] text-[#caa44e] uppercase">Shaani Clothing</p>
        <h1 className="mt-3 font-headline-lg text-3xl text-primary sm:text-5xl">Terms & Conditions</h1>
        <span className="mt-4 block h-px w-16 bg-[#c5a04a]" />
        <p className="mt-4 font-body-lg text-[16px] leading-7 text-on-surface-variant">
          These terms cover browsing, bag orders, and WhatsApp confirmation with {PHONE_DISPLAY}.
        </p>

        <div className="mt-8 space-y-4">
          {sections.map((section) => (
            <section key={section.title} className="rounded-3xl border border-[#c5a04a]/30 bg-surface-container-lowest p-5 shadow-[0_10px_28px_rgba(75,15,27,0.06)] sm:p-6">
              <h2 className="font-headline-sm text-2xl text-primary">{section.title}</h2>
              <p className="mt-2 text-sm leading-7 text-[#241B1D]/80">{section.body}</p>
            </section>
          ))}
        </div>

        <p className="mt-6 text-sm leading-6 text-[#241B1D]/70">
          The outlet is open Monday to Saturday, 10:00 AM to 10:00 PM, and Sunday, 10:00 AM to 9:00 PM. Hours might differ.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center rounded-full bg-[#781829] px-5 text-xs tracking-[0.14em] text-[#FFFDFC] uppercase">
            Message on WhatsApp
          </a>
          <Link to="/privacy-policy" className="inline-flex h-12 items-center justify-center rounded-full border border-[#E9D8C5] px-5 text-xs tracking-[0.14em] text-[#4B0F1B] uppercase">
            Privacy Policy
          </Link>
        </div>
      </div>
    </article>
  );
}
