import { HeroBanner } from "@/components/home/HeroBanner";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { LiveSection } from "@/components/home/LiveSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroBanner />
      <FeaturedSection />
      <LiveSection />
    </div>
  );
};

export default Home;