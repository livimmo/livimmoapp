import { HeroBanner } from "@/components/home/HeroBanner";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { LiveSection } from "@/components/home/LiveSection";
import { mockProperties } from "@/data/mockProperties";

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroBanner properties={mockProperties} />
      <FeaturedSection properties={mockProperties} />
      <LiveSection />
    </div>
  );
};

export default Home;