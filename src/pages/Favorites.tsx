import { useState } from "react";
import { FavoritesFilters } from "@/components/favorites/FavoritesFilters";
import { FavoritesHeader } from "@/components/favorites/FavoritesHeader";
import { FavoritesContent } from "@/components/favorites/FavoritesContent";
import { type Property } from "@/types/property";
import { addCoordinatesToProperties } from "@/data/mockProperties";
import { mockFavoritesData } from "@/data/mockFavorites";
import { HomeMap } from "@/components/home/HomeMap";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Property[]>(
    mockFavoritesData.map(property => ({
      ...property,
      id: property.id.toString(),
      has_live: property.hasLive || false,
      is_replay: false,
      has_scheduled_live: false,
      live_date: null,
      is_live_now: false,
      remaining_seats: null,
      viewers: 0,
      transaction_type: "Vente",
      virtual_tour: null,
      private_notes: null,
      agent_id: null,
      status: "available",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tags: []
    }))
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterCity, setFilterCity] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

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

  const handleCityFilter = (city: string) => {
    setFilterCity(city);
  };

  const filteredFavorites = favorites.filter((property) => {
    const matchesType = filterType === "all" || property.type === filterType;
    const matchesCity = filterCity === "all" || property.location.includes(filterCity);
    return matchesType && matchesCity;
  });

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <FavoritesHeader viewMode={viewMode} onViewModeChange={setViewMode} />

      <HomeMap properties={filteredFavorites} />

      <FavoritesFilters
        filterType={filterType}
        filterCity={filterCity}
        onFilterChange={handleFilter}
        onCityChange={handleCityFilter}
        onSortChange={handleSort}
        sortOrder={sortOrder}
      />

      <FavoritesContent viewMode={viewMode} properties={filteredFavorites} />
    </div>
  );
};

export default Favorites;