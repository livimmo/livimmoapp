import { type Property } from "@/types/property";
import { PropertyList } from "@/components/search/PropertyList";

interface FeaturedSectionProps {
  properties: Property[];
}

export const FeaturedSection = ({ properties }: FeaturedSectionProps) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Biens en vedette</h2>
      <PropertyList properties={properties} viewMode="carousel" />
    </section>
  );
};