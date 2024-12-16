import { PropertyList } from "@/components/properties/PropertyList";
import { type Property } from "@/types/property";

interface SearchContentProps {
  filteredProperties: Property[];
  viewMode: "grid" | "map";
}

export const SearchContent = ({ filteredProperties, viewMode }: SearchContentProps) => {
  if (filteredProperties.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Aucun bien ne correspond à vos critères
      </div>
    );
  }

  return <PropertyList properties={filteredProperties} viewMode={viewMode} />;
};