import { useState } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// Données mockées pour l'exemple
const mockFavorites = [
  {
    id: 1,
    image: "/placeholder.svg",
    title: "Villa moderne à Marrakech",
    price: 2500000,
    location: "Marrakech",
    type: "Villa",
    surface: 250,
    rooms: 5,
    hasLive: true,
    addedAt: new Date("2024-03-10"),
  },
  {
    id: 2,
    image: "/placeholder.svg",
    title: "Appartement vue mer à Tanger",
    price: 1800000,
    location: "Tanger",
    type: "Appartement",
    surface: 120,
    rooms: 3,
    hasLive: false,
    addedAt: new Date("2024-03-09"),
  },
  {
    id: 3,
    image: "/placeholder.svg",
    title: "Bureau au centre de Casablanca",
    price: 3500000,
    location: "Casablanca",
    type: "Bureau",
    surface: 180,
    rooms: 4,
    hasLive: true,
    addedAt: new Date("2024-03-08"),
  },
];

const Favorites = () => {
  const [favorites, setFavorites] = useState(mockFavorites);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterType, setFilterType] = useState<string>("all");

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

  const filteredFavorites = filterType === "all" 
    ? favorites
    : favorites.filter(property => property.type === filterType);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Mes Favoris</h1>
      
      <div className="flex gap-4 items-center">
        <Select value={filterType} onValueChange={handleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type de bien" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="Villa">Villa</SelectItem>
            <SelectItem value="Appartement">Appartement</SelectItem>
            <SelectItem value="Bureau">Bureau</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={handleSort}>
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Prix {sortOrder === "asc" ? "croissant" : "décroissant"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFavorites.map((property) => (
          <PropertyCard
            key={property.id}
            image={property.image}
            title={property.title}
            price={property.price}
            location={property.location}
            type={property.type}
            surface={property.surface}
            rooms={property.rooms}
            hasLive={property.hasLive}
          />
        ))}
      </div>

      {filteredFavorites.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun bien favori trouvé</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;