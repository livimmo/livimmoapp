import { useState } from "react";
import { type SearchFilters, type ViewType } from "@/types/search";

export const useSearchFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [surfaceRange, setSurfaceRange] = useState([0, 1000]);
  const [showLiveOnly, setShowLiveOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [transactionType, setTransactionType] = useState("buy");
  const [city, setCity] = useState("all");
  const [neighborhood, setNeighborhood] = useState("all");
  const [viewType, setViewType] = useState<ViewType>("all");

  const filters: SearchFilters = {
    searchTerm,
    propertyType,
    priceRange,
    surfaceRange,
    showLiveOnly,
    transactionType,
    city,
    neighborhood,
    viewType,
  };

  return {
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
    setViewType,
  };
};