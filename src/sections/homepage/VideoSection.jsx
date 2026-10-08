const BACKDROP =
  "https://lh3.googleusercontent.com/aida/AEtjO1W8wlJ2DQ4L-H3ASJcYizOZbvMZovZZjqiEmgauiO8GAQQOyvoCf3OYtu7JuCwv4TYQ4VZdFMMgjRvyoEhnZE-3s0B-8--hgwbTapV3Z6g9eXO7q7r66S15pTiNXOVYpdQgkbfTijE9-UEZgX3fSk8b87FGGtuL4HqB8VRg-CkzMjRBdcK-321gTLhpFnS_6GBhMjQ3DJ3_9t9TuiOJ5FyF95WqbTKMUR0L9vk576F4DXjnBVmhYPfm1YA";

export default function VideoSection() {
  return (
    <section className="w-full bg-surface-container-high/40 px-margin-mobile py-8 md:px-margin md:py-10">
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-[#c5a04a]/30 bg-primary text-on-primary shadow-lg">
        <div className="relative flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden p-6 text-center sm:aspect-[16/9] sm:p-8 md:aspect-[21/9]">
          <img
            alt="Cinematic backdrop of Indian boutique workshop"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            src={BACKDROP}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40" />
          <div className="relative z-10 max-w-2xl flex flex-col items-center">
            <button
              type="button"
              aria-label="Watch Story Video"
              className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#c5a04a] bg-[#ffdf9c] text-primary shadow-md transition-transform hover:scale-105"
            >
              <span className="material-symbols-outlined ml-0.5 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                play_arrow
              </span>
            </button>
            <h2 className="max-w-xl font-headline-sm text-lg leading-snug text-surface-container-lowest md:text-xl">
              This isn&apos;t just a clothing store. It&apos;s a story built with dreams, courage and your support.
            </h2>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] font-label-uppercase uppercase tracking-wider text-tertiary-fixed-dim">
              <span>Duration: 02:45 min</span>
              <span>•</span>
              <span>Atelier Kodad</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
