import { useState } from "react";
import { PropertyList } from "@/components/properties/PropertyList";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { mockProperties } from "@/data/mockProperties";
import { HotDealsBanner } from "@/components/hot-deals/HotDealsBanner";

const HotDeals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [surfaceRange, setSurfaceRange] = useState([0, 1000]);
  const [transactionType, setTransactionType] = useState<string[]>(["Vente"]);

  // Filtrer les propriétés pour n'avoir que les Hot Deals (propriétés avec tags "Coup de fusil")
  const hotDeals = mockProperties.filter(property => 
    property.tags?.includes("Coup de fusil")
  );

  // Appliquer les filtres supplémentaires
  const filteredHotDeals = hotDeals.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = propertyType === "all" || property.type.toLowerCase() === propertyType.toLowerCase();
    const matchesPriceRange = property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesSurfaceRange = property.surface >= surfaceRange[0] && property.surface <= surfaceRange[1];
    const matchesTransactionType = transactionType.includes(property.transactionType);

    return matchesSearch && matchesType && matchesPriceRange && matchesSurfaceRange && matchesTransactionType;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <HotDealsBanner />
      
      <div className="mb-8">
        <PropertyFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          propertyType={propertyType}
          setPropertyType={setPropertyType}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          surfaceRange={surfaceRange}
          setSurfaceRange={setSurfaceRange}
          transactionType={transactionType}
          setTransactionType={setTransactionType}
        />
      </div>

      <PropertyList 
        properties={filteredHotDeals}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      />
    </div>
  );
};

export default HotDeals;