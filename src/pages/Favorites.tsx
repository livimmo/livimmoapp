import { useState } from "react";
import { FavoritesFilters } from "@/components/favorites/FavoritesFilters";
import { FavoritesHeader } from "@/components/favorites/FavoritesHeader";
import { FavoritesContent } from "@/components/favorites/FavoritesContent";
import { Property } from "@/types/property";

const mockFavorites: Property[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    title: "Villa moderne avec piscine",
    price: 4500000,
    location: "Marrakech - Route de l'Ourika",
    type: "Villa",
    surface: 450,
    rooms: 6,
    hasLive: true,
    addedAt: new Date("2024-03-10"),
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    title: "Appartement vue mer",
    price: 2800000,
    location: "Tanger - Malabata",
    type: "Appartement",
    surface: 180,
    rooms: 4,
    hasLive: false,
    addedAt: new Date("2024-03-09"),
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    title: "Riad traditionnel rénové",
    price: 3200000,
    location: "Marrakech - Médina",
    type: "Riad",
    surface: 300,
    rooms: 5,
    hasLive: true,
    addedAt: new Date("2024-03-08"),
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    title: "Bureau moderne centre-ville",
    price: 1800000,
    location: "Casablanca - Triangle d'Or",
    type: "Bureau",
    surface: 120,
    rooms: 3,
    hasLive: false,
    addedAt: new Date("2024-03-07"),
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    title: "Villa contemporaine",
    price: 5500000,
    location: "Rabat - Hay Riad",
    type: "Villa",
    surface: 500,
    rooms: 7,
    hasLive: true,
    addedAt: new Date("2024-03-06"),
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    title: "Duplex avec terrasse",
    price: 2100000,
    location: "Casablanca - Anfa",
    type: "Appartement",
    surface: 160,
    rooms: 4,
    hasLive: true,
    addedAt: new Date("2024-03-05"),
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    title: "Villa pieds dans l'eau",
    price: 7800000,
    location: "Tanger - Achakar",
    type: "Villa",
    surface: 600,
    rooms: 8,
    hasLive: true,
    addedAt: new Date("2024-03-04"),
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    title: "Penthouse vue panoramique",
    price: 4200000,
    location: "Casablanca - Marina",
    type: "Appartement",
    surface: 250,
    rooms: 5,
    hasLive: false,
    addedAt: new Date("2024-03-03"),
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    title: "Local commercial",
    price: 3500000,
    location: "Marrakech - Guéliz",
    type: "Commerce",
    surface: 200,
    rooms: 2,
    hasLive: true,
    addedAt: new Date("2024-03-02"),
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    title: "Villa golf",
    price: 6500000,
    location: "Marrakech - Amelkis",
    type: "Villa",
    surface: 550,
    rooms: 6,
    hasLive: true,
    addedAt: new Date("2024-03-01"),
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    title: "Appartement haut standing",
    price: 3100000,
    location: "Rabat - Agdal",
    type: "Appartement",
    surface: 190,
    rooms: 4,
    hasLive: false,
    addedAt: new Date("2024-02-29"),
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c",
    title: "Villa jardin",
    price: 4800000,
    location: "Fès - Route d'Immouzer",
    type: "Villa",
    surface: 420,
    rooms: 5,
    hasLive: true,
    addedAt: new Date("2024-02-28"),
  },
  {
    id: 13,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    title: "Studio meublé",
    price: 900000,
    location: "Casablanca - Gauthier",
    type: "Studio",
    surface: 45,
    rooms: 1,
    hasLive: false,
    addedAt: new Date("2024-02-27"),
  },
  {
    id: 14,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    title: "Riad spa",
    price: 5200000,
    location: "Marrakech - Kasbah",
    type: "Riad",
    surface: 380,
    rooms: 6,
    hasLive: true,
    addedAt: new Date("2024-02-26"),
  },
  {
    id: 15,
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
    title: "Appartement neuf",
    price: 1600000,
    location: "Tanger - Centre",
    type: "Appartement",
    surface: 95,
    rooms: 3,
    hasLive: false,
    addedAt: new Date("2024-02-25"),
  },
  {
    id: 16,
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
    title: "Villa piscine",
    price: 3900000,
    location: "Agadir - Golf",
    type: "Villa",
    surface: 320,
    rooms: 4,
    hasLive: true,
    addedAt: new Date("2024-02-24"),
  },
  {
    id: 17,
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    title: "Bureau open space",
    price: 2400000,
    location: "Casablanca - CFC",
    type: "Bureau",
    surface: 150,
    rooms: 1,
    hasLive: false,
    addedAt: new Date("2024-02-23"),
  },
  {
    id: 18,
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    title: "Duplex vue mer",
    price: 2900000,
    location: "Tanger - Marshan",
    type: "Appartement",
    surface: 170,
    rooms: 4,
    hasLive: true,
    addedAt: new Date("2024-02-22"),
  },
  {
    id: 19,
    image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc",
    title: "Villa d'architecte",
    price: 8500000,
    location: "Marrakech - Palmeraie",
    type: "Villa",
    surface: 800,
    rooms: 8,
    hasLive: true,
    addedAt: new Date("2024-02-21"),
  },
  {
    id: 20,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    title: "Loft industriel",
    price: 1900000,
    location: "Casablanca - Maarif",
    type: "Loft",
    surface: 140,
    rooms: 2,
    hasLive: false,
    addedAt: new Date("2024-02-20"),
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
