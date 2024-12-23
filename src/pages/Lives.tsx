import { useState } from "react";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { PropertyList } from "@/components/properties/PropertyList";
import { mockProperties } from "@/data/mockProperties";
import { ViewType, Property } from "@/types/search";
import { PropertyViewToggle } from "@/components/properties/PropertyViewToggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PropertyMapView } from "@/components/map/PropertyMapView";

const Lives = () => {
  const [viewType, setViewType] = useState<ViewType>("all");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [surfaceRange, setSurfaceRange] = useState([0, 100000]);
  const [transactionType, setTransactionType] = useState<string[]>(["Vente"]);
  const [hoveredProperty, setHoveredProperty] = useState<Property | null>(null);

  const filteredProperties = mockProperties.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !propertyType || property.type === propertyType;
    const matchesPriceRange = property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesSurfaceRange = property.surface >= surfaceRange[0] && property.surface <= surfaceRange[1];
    const matchesTransactionType = transactionType.includes(property.transactionType);
    const matchesViewType = viewType === "all" ? true :
      viewType === "live" ? property.hasLive :
      viewType === "replay" ? property.isReplay :
      viewType === "scheduled" ? property.hasScheduledLive :
      property.virtualTour?.enabled;

    return matchesSearch && matchesType && matchesPriceRange && 
           matchesSurfaceRange && matchesTransactionType && matchesViewType;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <PropertyFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          propertyType={propertyType}
          setPropertyType={setPropertyType}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          surfaceRange={surfaceRange}
          setSurfaceRange={setSurfaceRange}
          viewType={viewType}
          setViewType={setViewType}
          transactionType={transactionType}
          setTransactionType={setTransactionType}
        />
        <PropertyViewToggle view={viewMode} onViewChange={setViewMode} />
      </div>

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
        <PropertyList properties={filteredProperties} />
      )}
    </div>
  );
};

export default Lives;