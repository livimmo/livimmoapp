import { type Property } from "@/types/property";
import { PropertyCard } from "@/components/PropertyCard";

interface FeaturedSectionProps {
  properties: Property[];
}

export const FeaturedSection = ({ properties }: FeaturedSectionProps) => {
  // Sort properties by number of viewers (descending)
  const sortedProperties = [...properties].sort((a, b) => {
    const viewersA = a.viewers || 0;
    const viewersB = b.viewers || 0;
    return viewersB - viewersA;
  });

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Lives populaires</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProperties.map((property) => (
          <PropertyCard 
            key={property.id} 
            {...property} 
            offers={!property.hasLive ? Math.floor(Math.random() * 20) : undefined}
          />
        ))}
      </div>
    </section>
  );
};