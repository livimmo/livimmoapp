import { useState } from "react";
import { FavoritesFilters } from "@/components/favorites/FavoritesFilters";
import { FavoritesHeader } from "@/components/favorites/FavoritesHeader";
import { FavoritesContent } from "@/components/favorites/FavoritesContent";
import { type Property } from "@/types/property";
import { addCoordinatesToProperties } from "@/data/mockProperties";
import { mockFavoritesData } from "@/data/mockFavorites";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Property[]>(
    addCoordinatesToProperties(mockFavoritesData)
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterType, setFilterType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "carousel" | "map">("grid");

  const handleSort = () => {
    const sorted = [...favorites].sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });
    setFavorites(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleFilter = (type: string) => {
    setFilterType(type);
  };

  const filteredFavorites =
    filterType === "all"
      ? favorites
      : favorites.filter((property) => property.type === filterType);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <FavoritesHeader viewMode={viewMode} onViewModeChange={setViewMode} />

      <FavoritesFilters
        filterType={filterType}
        onFilterChange={handleFilter}
        onSortChange={handleSort}
        sortOrder={sortOrder}
      />

      <FavoritesContent viewMode={viewMode} properties={filteredFavorites} />
    </div>
  );
};

export default Favorites;