import { useState } from "react";
import { SearchFilters } from "@/components/search/SearchFilters";
import { PropertyList } from "@/components/search/PropertyList";
import { PropertyMap } from "@/components/search/PropertyMap";
import { Button } from "@/components/ui/button";
import { List, Grid, Map as MapIcon } from "lucide-react";
import { Property } from "@/types/property";

const mockProperties: Property[] = [
  {
    id: 1,
    title: "Villa moderne à Marrakech",
    type: "Villa",
    price: 2500000,
    location: "Marrakech",
    surface: 250,
    rooms: 5,
    bathrooms: 3,
    description: "Magnifique villa moderne avec piscine et jardin",
    features: ["Piscine", "Jardin", "Garage", "Climatisation"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    ],
    hasLive: true,
    liveDate: new Date("2024-03-20"),
    agent: {
      name: "Sarah Alami",
      phone: "+212 6 12 34 56 78",
      email: "sarah.alami@example.com",
      image: "https://i.pravatar.cc/150?u=sarah",
    },
  },
  {
    id: 2,
    title: "Appartement vue mer à Tanger",
    type: "Appartement",
    price: 1800000,
    location: "Tanger",
    surface: 120,
    rooms: 3,
    bathrooms: 2,
    description: "Superbe appartement avec vue imprenable sur la mer",
    features: ["Vue mer", "Terrasse", "Ascenseur", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
    ],
    hasLive: false,
    agent: {
      name: "Mohammed Alami",
      phone: "+212 6 23 45 67 89",
      email: "mohammed.alami@example.com",
      image: "https://i.pravatar.cc/150?u=mohammed",
    },
  },
  {
    id: 3,
    title: "Riad traditionnel",
    type: "Riad",
    price: 3200000,
    location: "Marrakech",
    surface: 180,
    rooms: 4,
    bathrooms: 2,
    description: "Charmant riad traditionnel au cœur de la médina",
    features: ["Terrasse", "Jardin", "Climatisation"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    ],
    hasLive: true,
    liveDate: new Date("2024-03-25"),
    agent: {
      name: "Fatima Zahra",
      phone: "+212 6 34 56 78 90",
      email: "fatima.zahra@example.com",
      image: "https://i.pravatar.cc/150?u=fatima",
    },
  },
  {
    id: 4,
    title: "Bureau moderne",
    type: "Bureau",
    price: 1500000,
    location: "Casablanca",
    surface: 90,
    rooms: 2,
    bathrooms: 1,
    description: "Bureau moderne dans le centre d'affaires de Casablanca",
    features: ["Ascenseur", "Climatisation", "Internet haut débit"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    ],
    hasLive: false,
    agent: {
      name: "Omar El Amrani",
      phone: "+212 6 45 67 89 01",
      email: "omar.elamrani@example.com",
      image: "https://i.pravatar.cc/150?u=omar",
    },
  },
  {
    id: 5,
    title: "Villa avec piscine",
    type: "Villa",
    price: 4500000,
    location: "Rabat",
    surface: 350,
    rooms: 6,
    bathrooms: 4,
    description: "Villa spacieuse avec piscine et jardin paysager",
    features: ["Piscine", "Jardin", "Garage", "Climatisation"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    ],
    hasLive: true,
    liveDate: new Date("2024-04-01"),
    agent: {
      name: "Khalid Benali",
      phone: "+212 6 56 78 90 12",
      email: "khalid.benali@example.com",
      image: "https://i.pravatar.cc/150?u=khalid",
    },
  },
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [surfaceRange, setSurfaceRange] = useState([0, 500]);
  const [showLiveOnly, setShowLiveOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "carousel" | "map">("list");

  const filteredProperties = mockProperties.filter((property) => {
    const matchesSearch = property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = propertyType === "all" || property.type === propertyType;
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesSurface = property.surface >= surfaceRange[0] && property.surface <= surfaceRange[1];
    const matchesLive = !showLiveOnly || property.hasLive;

    return matchesSearch && matchesType && matchesPrice && matchesSurface && matchesLive;
  });

  return (
    <div className="min-h-screen bg-background">
      <SearchFilters
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
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      <div className="pt-[76px] px-4">
        <div className="flex justify-end mb-4 gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-accent" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("carousel")}
            className={viewMode === "carousel" ? "bg-accent" : ""}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("map")}
            className={viewMode === "map" ? "bg-accent" : ""}
          >
            <MapIcon className="h-4 w-4" />
          </Button>
        </div>

        {viewMode === "map" ? (
          <PropertyMap properties={filteredProperties} />
        ) : (
          <PropertyList properties={filteredProperties} viewMode={viewMode === "carousel" ? "carousel" : "list"} />
        )}

        {filteredProperties.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucun bien ne correspond à vos critères
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
