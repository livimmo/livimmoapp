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
  // Filter out properties with "en_cours" status
  const visibleProperties = properties.filter(
    property => property.status !== "en_cours"
  );

  return (
    <div className={cn(
      viewMode === "grid" 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        : "space-y-4",
      className
    )}>
      {visibleProperties.map((property) => (
        <PropertyCard 
          key={property.id} 
          {...property} 
          className={viewMode === "list" ? "!max-w-none" : undefined}
        />
      ))}
    </div>
  );
};