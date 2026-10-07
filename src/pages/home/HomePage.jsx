import { useCatalog } from "../../context/CatalogContext";
import { getNewArrivals } from "../../utils/productSelectors";
import CategoriesSection from "../../sections/homepage/CategoriesSection";
import HeroSection from "../../sections/homepage/HeroSection";
import InstagramSection from "../../sections/homepage/InstagramSection";
import NewArrivalsSection from "../../sections/homepage/NewArrivalsSection";
import ReviewsSection from "../../sections/homepage/ReviewsSection";
import VideoSection from "../../sections/homepage/VideoSection";
import WhatsAppSection from "../../sections/homepage/WhatsAppSection";
import WhyChooseSection from "../../sections/homepage/WhyChooseSection";

export default function HomePage() {
  const { products } = useCatalog();
  const newArrivals = getNewArrivals(products);

  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <CategoriesSection />
      <NewArrivalsSection products={newArrivals} />
      <WhyChooseSection />
      <VideoSection />
      <ReviewsSection />
      <InstagramSection />
      <WhatsAppSection />
    </div>
  );
}
