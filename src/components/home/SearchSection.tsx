import { PropertyCard } from "@/components/PropertyCard";
import { type Property } from "@/types/property";

interface SearchSectionProps {
  properties: Property[];
}

export const SearchSection = ({ properties }: SearchSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};