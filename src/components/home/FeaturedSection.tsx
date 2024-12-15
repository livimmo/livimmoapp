import { HeroBanner } from "@/components/home/HeroBanner";
import { type Property } from "@/types/property";

interface FeaturedSectionProps {
  properties: Property[];
}

export const FeaturedSection = ({ properties }: FeaturedSectionProps) => {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Notre sélection de la semaine</h2>
      <HeroBanner properties={properties} />
    </section>
  );
};