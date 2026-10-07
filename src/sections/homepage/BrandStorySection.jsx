import { Link } from "react-router-dom";

const STORY_IMAGE =
  "https://lh3.googleusercontent.com/aida/AEtjO1W8wlJ2DQ4L-H3ASJcYizOZbvMZovZZjqiEmgauiO8GAQQOyvoCf3OYtu7JuCwv4TYQ4VZdFMMgjRvyoEhnZE-3s0B-8--hgwbTapV3Z6g9eXO7q7r66S15pTiNXOVYpdQgkbfTijE9-UEZgX3fSk8b87FGGtuL4HqB8VRg-CkzMjRBdcK-321gTLhpFnS_6GBhMjQ3DJ3_9t9TuiOJ5FyF95WqbTKMUR0L9vk576F4DXjnBVmhYPfm1YA";

export default function BrandStorySection() {
  return (
    <section className="w-full bg-surface-container-low px-margin-mobile md:px-margin py-16 md:py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="font-label-uppercase text-label-uppercase text-on-tertiary-container tracking-[0.25em] uppercase">
            The Shaani Story
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary">A Small Idea. A Beautiful Journey.</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Shaani Clothing began with a simple idea - to bring beautiful, comfortable and stylish clothing closer to
            women who love expressing themselves through fashion. What started as a small dream gradually grew with the
            love, trust and support of our customers.
          </p>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Every order, every message and every returning customer has become part of the Shaani journey. Today, Shaani
            Clothing continues to grow with one simple belief - beautiful fashion should feel personal, accessible and
            effortless.
          </p>
          <div className="pt-2">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 font-label-uppercase text-label-uppercase text-primary hover:text-primary-container tracking-widest uppercase border-b-2 border-primary pb-1 font-semibold"
            >
              Discover Our Story →
            </Link>
          </div>
        </div>
        <div className="lg:col-span-6 relative mt-8 lg:mt-0">
          <div className="relative p-3 bg-surface-container-lowest rounded-2xl shadow-xl border border-[#c5a04a]/30">
            <img
              alt="Indian boutique founder examining rich fabrics with artisans at workshop table"
              className="w-full aspect-[4/3] object-cover rounded-xl"
              src={STORY_IMAGE}
            />
            <div className="absolute -bottom-4 -left-4 bg-surface-container-lowest p-space-sm rounded-lg shadow-lg border border-[#c5a04a]/40 flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary-fixed-dim">verified</span>
              <span className="text-xs font-semibold text-primary">Hand-selected Silk & Chiffon Artisans • Kodad</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
