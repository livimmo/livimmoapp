import { PropertyList } from "@/components/properties/PropertyList";
import { type Property } from "@/types/property";
import { type ViewMode } from "@/types/search";
import { PropertyMapView } from "@/components/map/PropertyMapView";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchContentProps {
  filteredProperties: Property[];
  viewMode: ViewMode;
}

export const SearchContent = ({ filteredProperties, viewMode }: SearchContentProps) => {
  if (filteredProperties.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Aucun bien ne correspond à vos critères
      </div>
    );
  }

  if (viewMode === "map") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-200px)] min-h-[600px]">
        <div className="relative h-[400px] lg:h-full rounded-lg overflow-hidden">
          <PropertyMapView 
            properties={filteredProperties}
          />
        </div>
        <ScrollArea className="h-[400px] lg:h-full bg-white rounded-lg shadow-lg p-4">
          <div className="space-y-4">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="cursor-pointer transition-all hover:ring-2 hover:ring-primary rounded-lg"
              >
                <PropertyList properties={[property]} viewMode="list" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  }

  return <PropertyList properties={filteredProperties} viewMode={viewMode} />;
};