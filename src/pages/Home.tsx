import { useState } from "react";
import { HeroBanner } from "@/components/home/HeroBanner";
import { HomeFilters } from "@/components/home/HomeFilters";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { LiveSection } from "@/components/home/LiveSection";
import { CTASection } from "@/components/home/CTASection";
import { mockProperties } from "@/data/mockProperties";
import { type Property } from "@/types/property";

const Home = () => {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);

  const handleFiltersChange = (newFilteredProperties: Property[]) => {
    setFilteredProperties(newFilteredProperties);
  };

  return (
    <div className="space-y-8 pb-20">
      <HeroBanner properties={mockProperties} />
      <HomeFilters 
        properties={mockProperties}
        onFiltersChange={handleFiltersChange}
      />
      <FeaturedSection properties={filteredProperties} />
      <LiveSection />
      <CTASection />
    </div>
  );
};

export default Home;