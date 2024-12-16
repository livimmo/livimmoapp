import { PropertyCard } from "@/components/PropertyCard";
import { PropertyMap } from "@/components/search/PropertyMap";
import { type Property } from "@/types/property";

interface PropertyListProps {
  properties: Property[];
  viewMode?: "grid" | "list" | "map" | "carousel";
}

export const PropertyList = ({ 
  properties, 
  viewMode = "grid" 
}: PropertyListProps) => {
  if (viewMode === "map") {
    return <PropertyMap properties={properties} />;
  }

  return (
    <div
      className={`grid gap-4 ${
        viewMode === "grid"
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : viewMode === "carousel"
          ? "grid-cols-1"
          : "grid-cols-1"
      }`}
    >
      {properties.map((property) => (
        <PropertyCard key={property.id} {...property} />
      ))}
    </div>
  );
};