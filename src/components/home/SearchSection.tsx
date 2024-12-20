import { PropertyList } from "@/components/properties/PropertyList";
import { Button } from "@/components/ui/button";
import { List, Map } from "lucide-react";
import { type Property } from "@/types/property";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SearchSectionProps {
  filteredProperties: Property[];
  defaultProperties: Property[];
}

export const SearchSection = ({ 
  filteredProperties, 
  defaultProperties 
}: SearchSectionProps) => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
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
            variant={viewMode === "grid" ? "default" : "outline"}
            size={isMobile ? "sm" : "default"}
            onClick={() => setViewMode("grid")}
            className="px-3"
          >
            <Map className="h-4 w-4 mr-2" />
            Grille
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size={isMobile ? "sm" : "default"}
            onClick={() => setViewMode("list")}
            className="px-3"
          >
            <List className="h-4 w-4 mr-2" />
            Liste
          </Button>
        </div>
      </div>
      
      <div className="w-full">
        <PropertyList 
          properties={displayProperties}
          viewMode={viewMode}
          className={
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-6"
          }
        />
      </div>
    </section>
  );
};