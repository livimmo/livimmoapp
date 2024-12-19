import { PropertyList } from "@/components/properties/PropertyList";
import { PropertyMap } from "@/components/search/PropertyMap";
import { Button } from "@/components/ui/button";
import { List, Map } from "lucide-react";
import { type Property } from "@/types/property";
import { useState } from "react";
import { MapView } from "./MapView";

interface SearchSectionProps {
  filteredProperties: Property[];
  defaultProperties: Property[];
}

export const SearchSection = ({ 
  filteredProperties, 
  defaultProperties 
}: SearchSectionProps) => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  
  const displayProperties = filteredProperties.length > 0 
    ? filteredProperties 
    : defaultProperties;

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {filteredProperties.length > 0 
            ? `${filteredProperties.length} biens trouvés`
            : "Tous nos biens"
          }
        </h2>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4 mr-2" />
            Liste
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("map")}
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
        <div className="rounded-lg overflow-hidden">
          <MapView properties={displayProperties} />
        </div>
      )}
    </section>
  );
};