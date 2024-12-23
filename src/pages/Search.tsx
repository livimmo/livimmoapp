import { useState } from "react";
import { SearchFilters } from "@/components/search/SearchFilters";
import { SearchContent } from "@/components/search/SearchContent";
import { SearchHeader } from "@/components/search/SearchHeader";
import { type ViewMode } from "@/types/search";
import { useSearchFilters } from "@/hooks/useSearchFilters";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PropertyMapView } from "@/components/map/PropertyMapView";
import { PropertyList } from "@/components/properties/PropertyList";
import { useProperties } from "@/hooks/use-properties";

const Search = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [hoveredProperty, setHoveredProperty] = useState<Property | null>(null);
  const { properties, isLoading, error } = useProperties();
  
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
    setCity,
    setNeighborhood,
  } = useSearchFilters();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading properties</div>;
  }

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.location.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      property.title.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesType = filters.propertyType === "all" || property.type === filters.propertyType;
    const matchesPrice =
      property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1];
    const matchesSurface =
      property.surface >= filters.surfaceRange[0] && property.surface <= filters.surfaceRange[1];
    const matchesLive = !filters.showLiveOnly || property.has_live;
    const matchesTransactionType = 
      (filters.transactionType === "buy" && property.transaction_type === "Vente") ||
      (filters.transactionType === "rent" && property.transaction_type === "Location");

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
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Header />
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
            setCity,
            setNeighborhood,
          }}
          setShowFilters={setShowFilters}
        />

        <div className="pt-[60px] px-3">
          <SearchHeader 
            viewMode={viewMode} 
            setViewMode={setViewMode}
            resultsCount={filteredProperties.length}
          />
          {viewMode === "map" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-200px)] min-h-[600px]">
              <div className="relative h-[400px] lg:h-full rounded-lg overflow-hidden">
                <PropertyMapView 
                  properties={filteredProperties}
                  hoveredProperty={hoveredProperty}
                />
              </div>
              <ScrollArea className="h-[400px] lg:h-full bg-white rounded-lg shadow-lg p-4">
                <div className="space-y-4">
                  {filteredProperties.map((property) => (
                    <div
                      key={property.id}
                      className="cursor-pointer transition-all hover:ring-2 hover:ring-primary rounded-lg"
                      onMouseEnter={() => setHoveredProperty(property)}
                      onMouseLeave={() => setHoveredProperty(null)}
                    >
                      <PropertyList properties={[property]} viewMode="list" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          ) : (
            <SearchContent
              filteredProperties={filteredProperties}
              viewMode={viewMode}
            />
          )}
        </div>
      </div>
    </AuthProvider>
  );
};

export default Search;