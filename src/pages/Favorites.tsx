import { useState } from "react";
import { FavoritesFilters } from "@/components/favorites/FavoritesFilters";
import { FavoritesHeader } from "@/components/favorites/FavoritesHeader";
import { FavoritesContent } from "@/components/favorites/FavoritesContent";
import { Property } from "@/types/property";

const mockFavorites: Property[] = [
  {
    id: 1,
    title: "Villa moderne avec piscine",
    price: 4500000,
    location: "Marrakech - Route de l'Ourika",
    type: "Villa",
    surface: 450,
    rooms: 6,
    bathrooms: 3,
    description: "Magnifique villa moderne avec piscine et jardin paysager",
    features: ["Piscine", "Jardin", "Garage", "Climatisation", "Sécurité 24/7"],
    images: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227",
    ],
    hasLive: true,
    liveDate: new Date("2024-03-10"),
    agent: {
      name: "Sarah Martin",
      image: "https://i.pravatar.cc/150?u=sarah",
      phone: "+212 6 12 34 56 78",
      email: "sarah.martin@example.com",
    },
  },
  {
    id: 2,
    title: "Appartement vue mer",
    price: 2800000,
    location: "Tanger - Malabata",
    type: "Appartement",
    surface: 180,
    rooms: 4,
    bathrooms: 2,
    description: "Superbe appartement avec vue panoramique sur la mer",
    features: ["Vue mer", "Terrasse", "Ascenseur", "Parking", "Cuisine équipée"],
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227",
    ],
    hasLive: false,
    agent: {
      name: "Mohammed Alami",
      image: "https://i.pravatar.cc/150?u=mohammed",
      phone: "+212 6 23 45 67 89",
      email: "mohammed.alami@example.com",
    },
  },
  {
    id: 3,
    title: "Riad traditionnel rénové",
    price: 3200000,
    location: "Marrakech - Médina",
    type: "Riad",
    surface: 300,
    rooms: 5,
    bathrooms: 3,
    description: "Magnifique riad traditionnel entièrement rénové",
    features: ["Piscine", "Terrasse", "Patio", "Hammam", "Climatisation"],
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227",
    ],
    hasLive: true,
    liveDate: new Date("2024-03-15"),
    agent: {
      name: "Yasmine Alaoui",
      image: "https://i.pravatar.cc/150?u=yasmine",
      phone: "+212 6 34 56 78 90",
      email: "yasmine.alaoui@example.com",
    },
  },
  {
    id: 4,
    title: "Bureau moderne centre-ville",
    price: 1800000,
    location: "Casablanca - Triangle d'Or",
    type: "Bureau",
    surface: 120,
    rooms: 3,
    bathrooms: 1,
    description: "Espace de bureau moderne au cœur du quartier d'affaires",
    features: ["Parking", "Sécurité 24/7", "Fibre optique", "Climatisation"],
    images: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227",
    ],
    hasLive: false,
    agent: {
      name: "Karim Benjelloun",
      image: "https://i.pravatar.cc/150?u=karim",
      phone: "+212 6 45 67 89 01",
      email: "karim.benjelloun@example.com",
    },
  },
  {
    id: 5,
    title: "Villa contemporaine",
    price: 5500000,
    location: "Rabat - Hay Riad",
    type: "Villa",
    surface: 500,
    rooms: 7,
    bathrooms: 4,
    description: "Superbe villa contemporaine avec jardin et piscine",
    features: ["Piscine", "Jardin", "Smart home", "Garage double", "Sécurité"],
    images: [
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227",
    ],
    hasLive: true,
    liveDate: new Date("2024-03-20"),
    agent: {
      name: "Sofia Garcia",
      image: "https://i.pravatar.cc/150?u=sofia",
      phone: "+212 6 56 78 90 12",
      email: "sofia.garcia@example.com",
    },
  }
];

const Favorites = () => {
  const [favorites, setFavorites] = useState(mockFavorites);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterType, setFilterType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "carousel" | "map">("grid");

  const handleSort = () => {
    const sorted = [...favorites].sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });
    setFavorites(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleFilter = (type: string) => {
    setFilterType(type);
  };

  const filteredFavorites =
    filterType === "all"
      ? favorites
      : favorites.filter((property) => property.type === filterType);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <FavoritesHeader viewMode={viewMode} onViewModeChange={setViewMode} />

      <FavoritesFilters
        filterType={filterType}
        onFilterChange={handleFilter}
        onSortChange={handleSort}
        sortOrder={sortOrder}
      />

      <FavoritesContent viewMode={viewMode} properties={filteredFavorites} />
    </div>
  );
};

export default Favorites;