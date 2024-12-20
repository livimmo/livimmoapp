import { useState } from "react";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { SearchContent } from "@/components/search/SearchContent";
import { featuredProperties } from "@/data/featuredProperties";

const Search = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [filteredProperties, setFilteredProperties] = useState(featuredProperties);

  return (
    <div className="container mx-auto px-4 py-8">
      <PropertyFilters />
      <SearchContent 
        filteredProperties={filteredProperties} 
        viewMode={viewMode} 
      />
    </div>
  );
};

export default Search;