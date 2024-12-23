import { PropertyList } from "@/components/properties/PropertyList";
import { type Property } from "@/types/property";
import { type ViewMode } from "@/types/search";
import { PropertyMapView } from "@/components/map/PropertyMapView";

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
      <div className="h-[calc(100vh-200px)] min-h-[600px] rounded-lg overflow-hidden">
        <PropertyMapView 
          properties={filteredProperties}
        />
      </div>
    );
  }

  return <PropertyList properties={filteredProperties} viewMode={viewMode} />;
};