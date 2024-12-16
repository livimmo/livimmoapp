import { HeroBanner } from "@/components/home/HeroBanner";
import { HomeFilters } from "@/components/home/HomeFilters";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { LiveSection } from "@/components/home/LiveSection";
import { CTASection } from "@/components/home/CTASection";

const Home = () => {
  return (
    <div className="space-y-8 pb-20">
      <HeroBanner />
      <HomeFilters />
      <FeaturedSection />
      <LiveSection />
      <CTASection />
    </div>
  );
};

export default Home;