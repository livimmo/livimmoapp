import { useState, useEffect } from "react";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { type Property } from "@/types/property";

interface HomeFiltersProps {
  properties: Property[];
  onFiltersChange: (filteredProperties: Property[]) => void;
}

export const HomeFilters = ({ properties, onFiltersChange }: HomeFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [surfaceRange, setSurfaceRange] = useState([0, 100000]);
  const [showLiveOnly, setShowLiveOnly] = useState(false);
  const [transactionType, setTransactionType] = useState("all");

  const suggestions = [
    "Casablanca",
    "Rabat",
    "Marrakech",
    "Tanger",
    "Agadir",
    "Fès",
    "Villa",
    "Appartement",
    "Bureau",
    "Riad",
  ];

  const applyFilters = () => {
    let filtered = [...properties];

    // Filter by search term (location)
    if (searchTerm) {
      filtered = filtered.filter((property) =>
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by property type
    if (propertyType !== "all") {
      filtered = filtered.filter((property) => property.type === propertyType);
    }

    // Filter by transaction type
    if (transactionType !== "all") {
      filtered = filtered.filter((property) => property.transactionType === transactionType);
    }

    // Filter by price range
    filtered = filtered.filter(
      (property) =>
        property.price >= priceRange[0] && property.price <= priceRange[1]
    );

    // Filter by surface range
    filtered = filtered.filter(
      (property) =>
        property.surface >= surfaceRange[0] && property.surface <= surfaceRange[1]
    );

    // Filter by live availability
    if (showLiveOnly) {
      filtered = filtered.filter((property) => property.hasLive);
    }

    onFiltersChange(filtered);
  };

  // Apply filters whenever any filter value changes
  useEffect(() => {
    applyFilters();
  }, [searchTerm, propertyType, priceRange, surfaceRange, showLiveOnly, transactionType]);

  return (
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
        showLiveOnly={showLiveOnly}
        setShowLiveOnly={setShowLiveOnly}
        suggestions={suggestions}
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      />
    </div>
  );
};