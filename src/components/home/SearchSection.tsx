import { PropertyList } from "@/components/properties/PropertyList";
import { Button } from "@/components/ui/button";
import { List, Map } from "lucide-react";
import { type Property } from "@/types/property";
import { useState } from "react";
import { MapView } from "./MapView";
import { useIsMobile } from "@/hooks/use-mobile";

interface SearchSectionProps {
  filteredProperties: Property[];
  defaultProperties: Property[];
}

export const SearchSection = ({ 
  filteredProperties, 
  defaultProperties 
}: SearchSectionProps) => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const isMobile = useIsMobile();
  
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
        <div className="flex gap-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size={isMobile ? "sm" : "default"}
            onClick={() => setViewMode("list")}
            className="px-3"
          >
            <List className="h-4 w-4 mr-2" />
            Liste
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            size={isMobile ? "sm" : "default"}
            onClick={() => setViewMode("map")}
            className="px-3"
          >
            <Map className="h-4 w-4 mr-2" />
            Carte
          </Button>
        </div>
      </div>
      
      {viewMode === "list" ? (
        <PropertyList 
          properties={displayProperties}
          viewMode="grid"
        />
      ) : (
        <div className="rounded-lg overflow-hidden h-[50vh] md:h-[600px] border border-gray-200">
          <MapView properties={displayProperties} />
        </div>
      )}
    </section>
  );
};