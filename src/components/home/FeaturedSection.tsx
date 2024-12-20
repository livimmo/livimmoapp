import { Property } from "@/types/property";
import { PropertyCard } from "../PropertyCard";

interface FeaturedSectionProps {
  properties: Property[];
  onPropertyHover?: (property: Property | null) => void;
}

export const FeaturedSection = ({ properties, onPropertyHover }: FeaturedSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Biens en vedette</h2>
      <div className="grid grid-cols-1 gap-4">
        {properties.map((property) => (
          <div 
            key={property.id}
            onMouseEnter={() => onPropertyHover?.(property)}
            onMouseLeave={() => onPropertyHover?.(null)}
          >
            <PropertyCard {...property} />
          </div>
        ))}
      </div>
    </div>
  );
};