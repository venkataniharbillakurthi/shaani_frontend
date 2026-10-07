import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { HERO_IMAGE, INSTAGRAM_URL, LOGO_SRC, MAPS_URL, SITE_KEYWORDS, SITE_URL, WHATSAPP_URL } from "../../constants/site";
import { useCatalog } from "../../context/CatalogContext";
import { categories } from "../../data/categories";
import { getProductBySlug } from "../../utils/productSelectors";
import Seo from "./Seo";

const BUSINESS = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "Shaani Clothing",
  url: SITE_URL,
  image: LOGO_SRC,
  telephone: "+918639373403",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Factory outlet, Roshamma street, Nayanagar",
    addressLocality: "Kodad",
    addressRegion: "Telangana",
    postalCode: "508206",
    addressCountry: "IN",
  },
  hasMap: MAPS_URL,
  geo: {
    "@type": "GeoCoordinates",
    latitude: 16.995249,
    longitude: 79.964787,
  },
  openingHours: ["Mo-Sa 10:00-22:00", "Su 10:00-21:00"],
  sameAs: [INSTAGRAM_URL, WHATSAPP_URL],
  slogan: "Elegance in Every Thread.",
};

const PAGES = {
  "/": {
    title: "Shaani Clothing | Women's Ethnic Wear in Kodad",
    description: "Shaani Clothing is a women's ethnic boutique at Factory Outlet, Kodad, Telangana. Shop 3-piece sets, dress materials, palazzo pants, plus size and partywear. Order on WhatsApp.",
    image: HERO_IMAGE,
  },
  "/shop": {
    title: "Shop Women's Ethnic Wear | Shaani Clothing",
    description: "Browse Shaani Clothing collections: new arrivals, 3-piece sets, dress materials, palazzo pants, plus size, tops, nighties, cord sets, frocks and partywear.",
    keywords: `shop women's ethnic wear Kodad, buy ethnic wear Kodad, ${SITE_KEYWORDS}`,
  },
  "/about": {
    title: "About Shaani Clothing | Elegance in Every Thread",
    description: "Shaani Clothing curates women's ethnic wear from the factory outlet on Roshamma street, Nayanagar, Kodad, Telangana 508206.",
    keywords: `about Shaani Clothing Kodad, ethnic boutique Nayanagar, ${SITE_KEYWORDS}`,
  },
  "/contact": {
    title: "Contact Shaani Clothing | Kodad",
    description: "Visit Shaani Clothing at Factory outlet, Roshamma street, Nayanagar, Kodad, Telangana 508206. Call 086393 73403. Open Monday to Saturday 10:00 AM to 10:00 PM, Sunday 10:00 AM to 9:00 PM.",
    keywords: `Shaani Clothing address, visit Shaani Clothing Kodad, Roshamma street Nayanagar, ${SITE_KEYWORDS}`,
  },
  "/privacy-policy": {
    title: "Privacy Policy | Shaani Clothing",
    description: "How Shaani Clothing uses the details you share on shaaniclothing.com and in WhatsApp orders.",
  },
  "/terms-conditions": {
    title: "Terms & Conditions | Shaani Clothing",
    description: "Terms for browsing shaaniclothing.com and sending a Shaani Clothing order on WhatsApp.",
  },
  "/cart": {
    title: "Your Bag | Shaani Clothing",
    description: "Review your Shaani Clothing bag and send the order on WhatsApp.",
    noIndex: true,
  },
};

function keywordsFor(...extra) {
  const lead = extra.filter(Boolean).join(", ");
  return lead ? `${lead}, ${SITE_KEYWORDS}` : SITE_KEYWORDS;
}

function clip(value) {
  const text = (value || "").replace(/\s+/g, " ").trim();
  return text.length > 155 ? `${text.slice(0, 152)}...` : text;
}

export default function SiteSeo() {
  const { pathname, search } = useLocation();
  const { products } = useCatalog();
  const params = new URLSearchParams(search);

  const seo = useMemo(() => {
    if (pathname.startsWith("/product/")) {
      const slug = decodeURIComponent(pathname.slice("/product/".length));
      const product = getProductBySlug(products, slug);
      if (!product) {
        return {
          title: "Product unavailable | Shaani Clothing",
          description: "This Shaani Clothing style is not in the catalogue.",
          path: pathname,
          image: LOGO_SRC,
          keywords: keywordsFor("Shaani Clothing Kodad"),
          noIndex: true,
          jsonLd: BUSINESS,
        };
      }
      const description = clip(product.description) || `${product.name} from Shaani Clothing, Kodad. Order on WhatsApp.`;
      return {
        title: `${product.name} | Shaani Clothing`,
        description,
        keywords: keywordsFor(product.name, product.category, "women's ethnic wear Kodad"),
        path: `/product/${product.slug}`,
        image: product.image || LOGO_SRC,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          image: product.image,
          description,
          sku: product.slug,
          brand: { "@type": "Brand", name: "Shaani Clothing" },
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: product.price,
            availability: product.stock === false ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
            url: `${SITE_URL}/product/${product.slug}`,
          },
        },
      };
    }

    if (pathname === "/shop") {
      const category = categories.find((item) => item.slug === params.get("category"));
      if (params.get("tag") === "new-arrival") {
        return {
          title: "New Arrivals | Shaani Clothing",
          description: "New arrival styles at Shaani Clothing, Kodad. Shop the latest women's ethnic wear and order on WhatsApp.",
          keywords: keywordsFor("new arrivals Kodad", "latest ethnic wear Kodad"),
          path: "/shop?tag=new-arrival",
          image: HERO_IMAGE,
          jsonLd: BUSINESS,
        };
      }
      if (category && category.slug !== "all") {
        return {
          title: `${category.name} | Shaani Clothing`,
          description: clip(`${category.description} Shop ${category.name} at Shaani Clothing, Factory Outlet, Kodad.`),
          keywords: keywordsFor(`${category.name} Kodad`, `${category.name} Shaani Clothing`),
          path: `/shop?category=${category.slug}`,
          image: HERO_IMAGE,
          jsonLd: BUSINESS,
        };
      }
    }

    const page = PAGES[pathname] || {
      title: "Shaani Clothing",
      description: PAGES["/"].description,
    };
    return {
      ...page,
      keywords: page.keywords || SITE_KEYWORDS,
      path: page.noIndex ? pathname : pathname,
      image: page.image || LOGO_SRC,
      jsonLd: BUSINESS,
    };
  }, [pathname, products, search]);

  return <Seo {...seo} />;
}
