import { PropertyCard } from "@/components/PropertyCard";
import { type Property } from "@/types/property";
import { cn } from "@/lib/utils";

interface PropertyListProps {
  properties: Property[];
  viewMode?: "grid" | "list";
  className?: string;
}

export const PropertyList = ({ 
  properties, 
  viewMode = "grid",
  className
}: PropertyListProps) => {
  return (
    <div className={cn(className)}>
      {properties.map((property) => (
        <PropertyCard 
          key={property.id} 
          {...property}
        />
      ))}
    </div>
  );
};