import { Property } from "@/types/property";
import { FavoritesGrid } from "./FavoritesGrid";
import { FavoritesMap } from "./FavoritesMap";

interface FavoritesContentProps {
  viewMode: "grid" | "map";
  properties: Property[];
}

export const FavoritesContent = ({ viewMode, properties }: FavoritesContentProps) => {
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Aucun bien favori trouvé</p>
      </div>
    );
  }

  switch (viewMode) {
    case "map":
      return <FavoritesMap properties={properties} />;
    default:
      return <FavoritesGrid properties={properties} />;
  }
};