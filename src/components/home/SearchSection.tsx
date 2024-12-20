import { PropertyList } from "@/components/properties/PropertyList";
import { Button } from "@/components/ui/button";
import { List, Map } from "lucide-react";
import { type Property } from "@/types/property";
import { useState } from "react";
import { MapView } from "./MapView";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

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
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayProperties.map(property => (
              <div key={property.id} className="relative">
                <PropertyList properties={[property]} viewMode="grid" />
                <Badge 
                  variant="secondary" 
                  className="absolute top-2 left-2 z-20 bg-white/90 backdrop-blur-sm flex items-center gap-1"
                >
                  <MapPin className="h-3 w-3" />
                  {property.location}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-8'} h-[600px]`}>
          <div className="rounded-lg overflow-hidden border border-gray-200 h-full">
            <MapView properties={displayProperties} />
          </div>
          <ScrollArea className="h-full bg-white rounded-lg shadow p-4">
            <PropertyList 
              properties={displayProperties}
              viewMode="list"
            />
          </ScrollArea>
        </div>
      )}
    </section>
  );
};