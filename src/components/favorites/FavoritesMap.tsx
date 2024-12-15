import { PropertyMap } from "@/components/search/PropertyMap";
import { type Property } from "@/types/property";

interface FavoritesMapProps {
  properties: Property[];
}

export const FavoritesMap = ({ properties }: FavoritesMapProps) => {
  return <PropertyMap properties={properties} />;
};