import { Property } from "@/types/property";
import { PropertyCard } from "@/components/PropertyCard";

interface PropertyListViewProps {
  properties: Property[];
  onPropertyClick?: (property: Property) => void;
}

export const PropertyListView = ({ properties, onPropertyClick }: PropertyListViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((property) => (
        <div 
          key={property.id} 
          onClick={() => onPropertyClick?.(property)}
          className="cursor-pointer"
        >
          <PropertyCard {...property} />
        </div>
      ))}
    </div>
  );
};