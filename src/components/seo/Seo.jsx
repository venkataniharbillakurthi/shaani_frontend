import { useEffect } from "react";
import { SITE_KEYWORDS, SITE_URL } from "../../constants/site";

function upsertMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

export default function Seo({ title, description, keywords = SITE_KEYWORDS, path = "/", image, noIndex = false, jsonLd }) {
  useEffect(() => {
    const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "keywords", keywords);
    upsertMeta("name", "geo.region", "IN-TG");
    upsertMeta("name", "geo.placename", "Kodad, Telangana");
    upsertMeta("name", "geo.position", "16.995249;79.964787");
    upsertMeta("name", "ICBM", "16.995249, 79.964787");
    upsertMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");
    upsertLink("canonical", url);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", "Shaani Clothing");
    upsertMeta("property", "og:locale", "en_IN");
    if (image) upsertMeta("property", "og:image", image);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    if (image) upsertMeta("name", "twitter:image", image);

    const existing = document.getElementById("shaani-jsonld");
    if (!jsonLd) {
      existing?.remove();
      return;
    }
    const script = existing || document.createElement("script");
    script.id = "shaani-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    if (!existing) document.head.appendChild(script);
  }, [title, description, keywords, path, image, noIndex, jsonLd]);

  return null;
}
