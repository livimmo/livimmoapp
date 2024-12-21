import { useState } from "react";

interface PropertyFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  propertyType: string;
  setPropertyType: (value: string) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  surfaceRange: [number, number];
  setSurfaceRange: (value: [number, number]) => void;
  viewType: "grid" | "list";
  setViewType: (value: "grid" | "list") => void;
  suggestions?: string[];
  transactionType: string[];
  setTransactionType: (value: string[]) => void;
}

export const PropertyFilters = ({
  searchTerm,
  setSearchTerm,
  propertyType,
  setPropertyType,
  priceRange,
  setPriceRange,
  surfaceRange,
  setSurfaceRange,
  viewType,
  setViewType,
  suggestions,
  transactionType,
  setTransactionType,
}: PropertyFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded p-2"
      />
      <select
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
        className="border rounded p-2"
      >
        <option value="">Tous les types</option>
        <option value="Villa">Villa</option>
        <option value="Appartement">Appartement</option>
        <option value="Riad">Riad</option>
        <option value="Terrain">Terrain</option>
        <option value="Bureau">Bureau</option>
        <option value="Logistique/Industriel">Logistique/Industriel</option>
      </select>
      <input
        type="number"
        placeholder="Prix min"
        value={priceRange[0]}
        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
        className="border rounded p-2"
      />
      <input
        type="number"
        placeholder="Prix max"
        value={priceRange[1]}
        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
        className="border rounded p-2"
      />
      <input
        type="number"
        placeholder="Surface min"
        value={surfaceRange[0]}
        onChange={(e) => setSurfaceRange([Number(e.target.value), surfaceRange[1]])}
        className="border rounded p-2"
      />
      <input
        type="number"
        placeholder="Surface max"
        value={surfaceRange[1]}
        onChange={(e) => setSurfaceRange([surfaceRange[0], Number(e.target.value)])}
        className="border rounded p-2"
      />
      <select
        value={viewType}
        onChange={(e) => setViewType(e.target.value as "grid" | "list")}
        className="border rounded p-2"
      >
        <option value="grid">Grille</option>
        <option value="list">Liste</option>
      </select>
      <div className="flex gap-2">
        {suggestions && suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setSearchTerm(suggestion)}
            className="border rounded p-2"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
