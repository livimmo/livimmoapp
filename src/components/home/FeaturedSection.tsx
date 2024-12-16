import { type Property } from "@/types/property";
import { PropertyCard } from "@/components/PropertyCard";

interface FeaturedSectionProps {
  properties: Property[];
}

export const FeaturedSection = ({ properties }: FeaturedSectionProps) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Biens populaires</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </section>
  );
};