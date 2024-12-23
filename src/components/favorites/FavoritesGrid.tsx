import { PropertyCard } from "@/components/PropertyCard";
import { Property } from "@/types/property";

interface FavoritesGridProps {
  properties: Property[];
}

export const FavoritesGrid = ({ properties }: FavoritesGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};