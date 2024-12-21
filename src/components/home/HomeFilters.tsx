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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [surfaceRange, setSurfaceRange] = useState<[number, number]>([0, 100000]);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [transactionType, setTransactionType] = useState<string[]>(["Vente"]);

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

    if (searchTerm) {
      filtered = filtered.filter((property) =>
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (propertyType !== "all") {
      filtered = filtered.filter((property) => property.type === propertyType);
    }

    if (transactionType.length > 0) {
      filtered = filtered.filter((property) => 
        transactionType.includes(property.transactionType)
      );
    }

    filtered = filtered.filter(
      (property) =>
        property.price >= priceRange[0] && property.price <= priceRange[1]
    );

    filtered = filtered.filter(
      (property) =>
        property.surface >= surfaceRange[0] && property.surface <= surfaceRange[1]
    );

    onFiltersChange(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, propertyType, priceRange, surfaceRange, viewType, transactionType]);

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
        viewType={viewType}
        setViewType={setViewType}
        suggestions={suggestions}
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      />
    </div>
  );
};