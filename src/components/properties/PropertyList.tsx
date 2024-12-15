import { PropertyCard } from "@/components/PropertyCard";
import { PropertyMap } from "@/components/search/PropertyMap";
import { Property } from "@/types/property";

interface PropertyListProps {
  properties: Property[];
  viewMode: "grid" | "list" | "map";
}

export const PropertyList = ({ properties, viewMode }: PropertyListProps) => {
  if (viewMode === "map") {
    return <PropertyMap properties={properties} />;
  }

  return (
    <div
      className={`grid gap-4 ${
        viewMode === "grid"
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1"
      }`}
    >
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          {...property}
          image={property.images[0]}
        />
      ))}
    </div>
  );
};