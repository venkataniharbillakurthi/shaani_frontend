export default function PageIntro({ eyebrow, title, description }) {
  return (
    <section className="w-full bg-surface px-margin-mobile py-14 md:px-margin md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        {eyebrow ? (
          <span className="font-label-uppercase text-[11px] tracking-[0.2em] text-[#caa44e] uppercase">{eyebrow}</span>
        ) : null}
        <h1 className="mt-3 font-headline-lg text-3xl text-primary sm:text-5xl">{title}</h1>
        <span className="mx-auto mt-4 block h-px w-16 bg-[#c5a04a]" />
        {description ? <p className="mt-4 font-body-lg text-[16px] leading-7 text-on-surface-variant">{description}</p> : null}
      </div>
    </section>
  );
}
