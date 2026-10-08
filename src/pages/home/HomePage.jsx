import { lazy, Suspense } from "react";
import { useCatalog } from "../../context/CatalogContext";
import { getNewArrivals } from "../../utils/productSelectors";
import HeroSection from "../../sections/homepage/HeroSection";

const CategoriesSection = lazy(() => import("../../sections/homepage/CategoriesSection"));
const NewArrivalsSection = lazy(() => import("../../sections/homepage/NewArrivalsSection"));
const WhyChooseSection = lazy(() => import("../../sections/homepage/WhyChooseSection"));
const VideoSection = lazy(() => import("../../sections/homepage/VideoSection"));
const ReviewsSection = lazy(() => import("../../sections/homepage/ReviewsSection"));
const InstagramSection = lazy(() => import("../../sections/homepage/InstagramSection"));
const WhatsAppSection = lazy(() => import("../../sections/homepage/WhatsAppSection"));

function SectionFallback() {
  return <div className="min-h-16" aria-hidden="true" />;
}

export default function HomePage() {
  const { products } = useCatalog();
  const newArrivals = getNewArrivals(products);

  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <Suspense fallback={<SectionFallback />}>
        <CategoriesSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <NewArrivalsSection products={newArrivals} />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <WhyChooseSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <VideoSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ReviewsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <InstagramSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <WhatsAppSection />
      </Suspense>
    </div>
  );
}
