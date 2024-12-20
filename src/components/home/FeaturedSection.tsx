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

  // Sort properties by number of viewers (descending)
  const sortedProperties = [...properties].sort((a, b) => {
    const viewersA = a.viewers || 0;
    const viewersB = b.viewers || 0;
    return viewersB - viewersA;
  });

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Lives populaires</h2>
        <PropertyViewToggle view={viewMode} onViewChange={setViewMode} />
      </div>

      {viewMode === "list" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedProperties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  {...property} 
                  offers={!property.hasLive ? Math.floor(Math.random() * 20) : undefined}
                />
              ))}
            </div>
          </div>
          <div className="hidden lg:block h-[calc(100vh-200px)] sticky top-24">
            <div className="rounded-lg overflow-hidden h-full border border-gray-200">
              <GoogleMapContainer properties={sortedProperties} />
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg overflow-hidden h-[600px] border border-gray-200">
          <GoogleMapContainer properties={sortedProperties} />
        </div>
      )}
    </section>
  );
};