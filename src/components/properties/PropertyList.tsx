import { PropertyCard } from "@/components/PropertyCard";
import { type Property } from "@/types/property";

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
  const visibleProperties = properties.filter(
    property => property.status !== "en_cours"
  );

  return (
    <div className={`
      ${viewMode === "grid" 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        : "space-y-4"}
      ${className || ""}
    `}>
      {visibleProperties.map((property) => (
        <PropertyCard 
          key={property.id} 
          property={property}
        />
      ))}
    </div>
  );
};