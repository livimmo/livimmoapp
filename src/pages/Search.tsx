import { useState } from "react";
import { SearchFilters } from "@/components/search/SearchFilters";
import { PropertyList } from "@/components/search/PropertyList";
import { PropertyMap } from "@/components/search/PropertyMap";
import { Button } from "@/components/ui/button";
import { List, Grid, Map as MapIcon } from "lucide-react";

const placeholderImages = [
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
  "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
];

const mockProperties = [
  {
    id: 1,
    image: placeholderImages[Math.floor(Math.random() * placeholderImages.length)],
    title: "Villa moderne à Marrakech",
    price: 2500000,
    location: "Marrakech",
    type: "Villa",
    surface: 250,
    rooms: 5,
    hasLive: true,
    tags: ["Coup de fusil", "Nouveauté"]
  },
  {
    id: 2,
    image: placeholderImages[Math.floor(Math.random() * placeholderImages.length)],
    title: "Appartement vue mer à Tanger",
    price: 1800000,
    location: "Tanger",
    type: "Appartement",
    surface: 120,
    rooms: 3,
    hasLive: false,
    tags: ["Exclusivité"]
  },
  {
    id: 3,
    image: placeholderImages[Math.floor(Math.random() * placeholderImages.length)],
    title: "Riad traditionnel",
    price: 3200000,
    location: "Marrakech",
    type: "Riad",
    surface: 180,
    rooms: 4,
    hasLive: true,
    tags: ["Nouveauté"]
  },
  {
    id: 4,
    image: placeholderImages[Math.floor(Math.random() * placeholderImages.length)],
    title: "Bureau moderne",
    price: 1500000,
    location: "Casablanca",
    type: "Bureau",
    surface: 90,
    rooms: 2,
    hasLive: true,
    tags: ["Coup de fusil"]
  },
  {
    id: 5,
    image: placeholderImages[Math.floor(Math.random() * placeholderImages.length)],
    title: "Villa avec piscine",
    price: 4500000,
    location: "Rabat",
    type: "Villa",
    surface: 350,
    rooms: 6,
    hasLive: false,
    tags: ["Exclusivité", "Nouveauté"]
  }
];

type ViewMode = "list" | "carousel" | "map";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [surfaceRange, setSurfaceRange] = useState([0, 500]);
  const [showLiveOnly, setShowLiveOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

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
    <div className="min-h-screen bg-background pb-16">
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
