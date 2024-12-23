import { useState } from "react";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { PropertyList } from "@/components/properties/PropertyList";
import { mockProperties } from "@/data/mockProperties";
import { ViewType } from "@/types/search";

const Lives = () => {
  const [viewType, setViewType] = useState<ViewType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [surfaceRange, setSurfaceRange] = useState([0, 100000]);
  const [transactionType, setTransactionType] = useState<string[]>(["Vente"]);

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
      <PropertyList properties={filteredProperties} />
    </div>
  );
};

export default Lives;
