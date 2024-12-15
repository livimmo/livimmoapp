import { useState } from "react";
import { FavoritesFilters } from "@/components/favorites/FavoritesFilters";
import { FavoritesHeader } from "@/components/favorites/FavoritesHeader";
import { FavoritesContent } from "@/components/favorites/FavoritesContent";
import { type Property } from "@/types/property";

const mockFavorites: Property[] = [
  {
    id: 1,
    title: "Villa moderne avec piscine",
    price: 4500000,
    location: "Marrakech - Route de l'Ourika",
    type: "Villa",
    surface: 450,
    rooms: 6,
    bathrooms: 4,
    description: "Magnifique villa moderne avec piscine et jardin",
    features: ["Piscine", "Jardin", "Garage", "Climatisation"],
    images: ["https://images.unsplash.com/photo-1649972904349-6e44c42644a7"],
    hasLive: true,
    agent: {
      name: "John Doe",
      image: "https://i.pravatar.cc/150?u=john",
      phone: "+212 6 00 00 00 00",
      email: "john.doe@example.com",
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
    description: "Superbe appartement avec vue imprenable sur la mer",
    features: ["Vue mer", "Terrasse", "Ascenseur", "Parking"],
    images: ["https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"],
    hasLive: false,
    agent: {
      name: "Alice Smith",
      image: "https://i.pravatar.cc/150?u=alice",
      phone: "+212 6 11 22 33 44",
      email: "alice.smith@example.com",
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
    description: "Charmant riad traditionnel au cœur de la médina",
    features: ["Patio", "Fontaine", "Terrasse"],
    images: ["https://images.unsplash.com/photo-1518770660439-4636190af475"],
    hasLive: true,
    agent: {
      name: "Mohammed Ali",
      image: "https://i.pravatar.cc/150?u=mohammed",
      phone: "+212 6 22 33 44 55",
      email: "mohammed.ali@example.com",
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
    description: "Bureau moderne idéalement situé au centre-ville",
    features: ["Climatisation", "Internet", "Sécurité"],
    images: ["https://images.unsplash.com/photo-1461749280684-dccba630e2f6"],
    hasLive: false,
    agent: {
      name: "Sara Benali",
      image: "https://i.pravatar.cc/150?u=sara",
      phone: "+212 6 33 44 55 66",
      email: "sara.benali@example.com",
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
    bathrooms: 5,
    description: "Villa contemporaine avec piscine et jardin",
    features: ["Piscine", "Jardin", "Garage"],
    images: ["https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"],
    hasLive: true,
    agent: {
      name: "Fatima Zahra",
      image: "https://i.pravatar.cc/150?u=fatima",
      phone: "+212 6 44 55 66 77",
      email: "fatima.zahra@example.com",
    },
  },
  {
    id: 6,
    title: "Duplex avec terrasse",
    price: 2100000,
    location: "Casablanca - Anfa",
    type: "Appartement",
    surface: 160,
    rooms: 4,
    bathrooms: 2,
    description: "Duplex spacieux avec terrasse et vue",
    features: ["Terrasse", "Vue", "Climatisation"],
    images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"],
    hasLive: true,
    agent: {
      name: "Omar El Amrani",
      image: "https://i.pravatar.cc/150?u=omar",
      phone: "+212 6 55 66 77 88",
      email: "omar.elamrani@example.com",
    },
  },
  {
    id: 7,
    title: "Villa pieds dans l'eau",
    price: 7800000,
    location: "Tanger - Achakar",
    type: "Villa",
    surface: 600,
    rooms: 8,
    bathrooms: 6,
    description: "Villa de luxe avec accès direct à la plage",
    features: ["Plage", "Piscine", "Jardin"],
    images: ["https://images.unsplash.com/photo-1485827404703-89b55fcc595e"],
    hasLive: true,
    agent: {
      name: "Youssef Khatib",
      image: "https://i.pravatar.cc/150?u=youssef",
      phone: "+212 6 66 77 88 99",
      email: "youssef.khatib@example.com",
    },
  },
  {
    id: 8,
    title: "Penthouse vue panoramique",
    price: 4200000,
    location: "Casablanca - Marina",
    type: "Appartement",
    surface: 250,
    rooms: 5,
    bathrooms: 3,
    description: "Penthouse avec vue imprenable sur la marina",
    features: ["Vue", "Terrasse", "Ascenseur"],
    images: ["https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"],
    hasLive: false,
    agent: {
      name: "Nadia Bouzid",
      image: "https://i.pravatar.cc/150?u=nadia",
      phone: "+212 6 77 88 99 00",
      email: "nadia.bouzid@example.com",
    },
  },
  {
    id: 9,
    title: "Local commercial",
    price: 3500000,
    location: "Marrakech - Guéliz",
    type: "Commerce",
    surface: 200,
    rooms: 2,
    bathrooms: 1,
    description: "Local commercial idéalement situé",
    features: ["Visibilité", "Accès facile"],
    images: ["https://images.unsplash.com/photo-1531297484001-80022131f5a1"],
    hasLive: true,
    agent: {
      name: "Khalid Bakkali",
      image: "https://i.pravatar.cc/150?u=khalid",
      phone: "+212 6 88 99 00 11",
      email: "khalid.bakkali@example.com",
    },
  },
  {
    id: 10,
    title: "Villa golf",
    price: 6500000,
    location: "Marrakech - Amelkis",
    type: "Villa",
    surface: 550,
    rooms: 6,
    bathrooms: 4,
    description: "Villa de luxe située près du golf",
    features: ["Golf", "Piscine", "Jardin"],
    images: ["https://images.unsplash.com/photo-1472396961693-142e6e269027"],
    hasLive: true,
    agent: {
      name: "Rachid El Idrissi",
      image: "https://i.pravatar.cc/150?u=rachid",
      phone: "+212 6 99 00 11 22",
      email: "rachid.elidrissi@example.com",
    },
  },
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
