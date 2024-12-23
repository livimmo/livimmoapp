import { useState } from "react";
import { PropertyList } from "@/components/properties/PropertyList";
import { type Property } from "@/types/property";
import { useIsMobile } from "@/hooks/use-mobile";
import { PropertyViewToggle } from "@/components/properties/PropertyViewToggle";
import { PropertyMapView } from "@/components/map/PropertyMapView";

interface SearchSectionProps {
  filteredProperties: Property[];
  defaultProperties: Property[];
}

export const SearchSection = ({ 
  filteredProperties, 
  defaultProperties 
}: SearchSectionProps) => {
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  
  const displayProperties = filteredProperties.length > 0 
    ? filteredProperties 
    : defaultProperties;

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-lg font-semibold">
          {filteredProperties.length > 0 
            ? `${filteredProperties.length} biens trouvés`
            : "Tous nos biens"
          }
        </h2>
        <PropertyViewToggle view={viewMode} onViewChange={setViewMode} />
      </div>
      
      {viewMode === "list" ? (
        <PropertyList properties={displayProperties} />
      ) : (
        <div className="h-[600px] rounded-lg overflow-hidden">
          <PropertyMapView properties={displayProperties} />
        </div>
      )}
    </section>
  );
};