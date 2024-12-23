import { type Property } from "@/types/property";
import { SearchMap } from "./SearchMap";

interface SearchContentProps {
  filteredProperties: Property[];
  viewMode: "grid" | "list" | "map";
}

export const SearchContent = ({ filteredProperties, viewMode }: SearchContentProps) => {
  if (filteredProperties.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Aucun bien ne correspond à vos critères
      </div>
    );
  }

  return (
    <div className="w-full">
      <SearchMap properties={filteredProperties} />
    </div>
  );
};