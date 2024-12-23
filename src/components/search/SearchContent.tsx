import { PropertyList } from "@/components/properties/PropertyList";
import { MapView } from "./MapView";
import { type Property } from "@/types/property";
import { type ViewMode } from "@/types/search";

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
    return <MapView properties={filteredProperties} />;
  }

  return <PropertyList properties={filteredProperties} viewMode={viewMode} />;
};