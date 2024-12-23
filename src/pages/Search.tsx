import { useState } from "react";
import { SearchFilters } from "@/components/search/SearchFilters";
import { SearchContent } from "@/components/search/SearchContent";
import { SearchHeader } from "@/components/search/SearchHeader";
import { type Property } from "@/types/property";
import { type ViewMode } from "@/types/search";
import { useSearchFilters } from "@/hooks/useSearchFilters";
import { mockProperties } from "@/data/mockProperties";

const Search = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const {
    filters,
    showFilters,
    setSearchTerm,
    setPropertyType,
    setPriceRange,
    setSurfaceRange,
    setShowLiveOnly,
    setShowFilters,
    setTransactionType,
  } = useSearchFilters();

  const filteredProperties = mockProperties.filter((property) => {
    const matchesSearch =
      property.location.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      property.title.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesType = filters.propertyType === "all" || property.type === filters.propertyType;
    const matchesPrice =
      property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1];
    const matchesSurface =
      property.surface >= filters.surfaceRange[0] && property.surface <= filters.surfaceRange[1];
    const matchesLive = !filters.showLiveOnly || property.hasLive;
    const matchesTransactionType = 
      (filters.transactionType === "buy" && property.transactionType === "Vente") ||
      (filters.transactionType === "rent" && property.transactionType === "Location");

    return (
      matchesSearch &&
      matchesType &&
      matchesPrice &&
      matchesSurface &&
      matchesLive &&
      matchesTransactionType
    );
  });

  return (
    <div className="min-h-screen bg-background">
      <SearchFilters
        filters={filters}
        showFilters={showFilters}
        onFiltersChange={{
          setSearchTerm,
          setPropertyType,
          setPriceRange,
          setSurfaceRange,
          setShowLiveOnly,
          setTransactionType,
        }}
        setShowFilters={setShowFilters}
      />

      <div className="pt-[60px] px-3">
        <SearchHeader 
          viewMode={viewMode} 
          setViewMode={setViewMode}
          resultsCount={filteredProperties.length}
        />
        <SearchContent
          filteredProperties={filteredProperties}
          viewMode={viewMode}
        />
      </div>
    </div>
  );
};

export default Search;