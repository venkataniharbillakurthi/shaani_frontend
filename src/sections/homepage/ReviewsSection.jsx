import { reviews } from "../../data/reviews";

function Stars({ rating }) {
  return (
    <div className="flex text-[#C5A04A]" aria-label={`${rating} star rating`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className="material-symbols-outlined text-[18px]"
          style={{ fontVariationSettings: index < rating ? "'FILL' 1" : "'FILL' 0" }}
        >
          star
        </span>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="w-full bg-[#F8F3ED] px-margin-mobile py-16 md:px-margin md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-headline-lg text-3xl text-[#4B0F1B] sm:text-4xl">Testimonials</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-6 text-[#241B1D]/70">
          What customers say after shopping at Shaani Clothing in Kodad.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6">
          {reviews.map((review) => (
            <article key={review.id} className="flex h-full flex-col bg-[#FFFDFC] p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#781829]">{review.name}</p>
                  <p className="mt-1 text-xs text-[#241B1D]/70">{review.meta}</p>
                </div>
                <Stars rating={review.rating} />
              </div>
              <p className="mt-4 text-sm leading-6 text-[#241B1D]">“{review.text}”</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
