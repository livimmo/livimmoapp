import { useState } from "react";
import { FavoritesFilters } from "@/components/favorites/FavoritesFilters";
import { FavoritesHeader } from "@/components/favorites/FavoritesHeader";
import { FavoritesContent } from "@/components/favorites/FavoritesContent";
import { type Property } from "@/types/property";
import { HomeMap } from "@/components/home/HomeMap";
import { useFavorites } from "@/hooks/use-favorites";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Favorites = () => {
  const { favorites, isLoading, error } = useFavorites();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterCity, setFilterCity] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[300px]" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Une erreur est survenue lors du chargement de vos favoris.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const properties = favorites.map(f => f.property) as Property[];

  const handleSort = () => {
    const sorted = [...properties].sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleFilter = (type: string) => {
    setFilterType(type);
  };

  const handleCityFilter = (city: string) => {
    setFilterCity(city);
  };

  const filteredFavorites = properties.filter((property) => {
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