import { type Property } from "@/types/property";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyViewToggle } from "@/components/properties/PropertyViewToggle";
import { GoogleMapContainer } from "./map/GoogleMapContainer";
import { useState } from "react";

interface FeaturedSectionProps {
  properties: Property[];
}

export const FeaturedSection = ({ properties }: FeaturedSectionProps) => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const sortedProperties = [...properties].sort((a, b) => {
    const viewersA = a.viewers || 0;
    const viewersB = b.viewers || 0;
    return viewersB - viewersA;
  });

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <PropertyViewToggle view={viewMode} onViewChange={setViewMode} />
      </div>

      {viewMode === "list" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedProperties.map((property) => (
            <PropertyCard 
              key={property.id} 
              {...property} 
              offers={!property.hasLive ? Math.floor(Math.random() * 20) : undefined}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg overflow-hidden h-[600px] border border-gray-200">
          <GoogleMapContainer properties={sortedProperties} />
        </div>
      )}
    </section>
  );
};