import { MAP_EMBED_URL, MAPS_URL } from "../../constants/site";

export default function StoreMap() {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#c5a04a]/30">
      <iframe
        title="Shaani Clothing on Google Maps"
        src={MAP_EMBED_URL}
        className="h-[280px] w-full border-0 sm:h-[380px]"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 bg-[#FFFDFC] px-4 py-3 text-sm text-[#4B0F1B]"
      >
        <span className="material-symbols-outlined text-[18px] text-[#C5A04A]">location_on</span>
        Open in Google Maps
      </a>
    </div>
  );
}
