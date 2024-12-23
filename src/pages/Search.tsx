import { useState } from "react";
import { SearchFilters } from "@/components/search/SearchFilters";
import { ViewControls } from "@/components/search/ViewControls";
import { SearchContent } from "@/components/search/SearchContent";
import { type Property } from "@/types/property";
import { mockAgents } from "@/data/mockAgents";
import { useToast } from "@/components/ui/use-toast";

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

const mockProperties: Property[] = [
  {
    id: "1",
    images: [placeholderImages[Math.floor(Math.random() * placeholderImages.length)]],
    title: "Villa moderne à Marrakech",
    price: 2500000,
    location: "Marrakech",
    type: "Villa",
    surface: 250,
    rooms: 5,
    bathrooms: 3,
    description: "Magnifique villa moderne avec vue imprenable",
    features: ["Piscine", "Jardin", "Garage"],
    hasLive: true,
    tags: ["Coup de fusil", "Nouveauté"],
    agent: mockAgents[0],
    coordinates: {
      lat: 31.6295,
      lng: -7.9811
    },
    transactionType: "Vente",
  },
  {
    id: "2",
    images: [placeholderImages[Math.floor(Math.random() * placeholderImages.length)]],
    title: "Appartement vue mer à Tanger",
    price: 1800000,
    location: "Tanger",
    type: "Appartement",
    surface: 120,
    rooms: 3,
    bathrooms: 2,
    description: "Superbe appartement avec vue sur mer",
    features: ["Vue mer", "Terrasse", "Parking"],
    hasLive: false,
    tags: ["Exclusivité"],
    agent: mockAgents[1],
    coordinates: {
      lat: 35.7595,
      lng: -5.8340
    },
    transactionType: "Location",
  },
  {
    id: "3",
    images: [placeholderImages[Math.floor(Math.random() * placeholderImages.length)]],
    title: "Riad traditionnel",
    price: 3200000,
    location: "Marrakech",
    type: "Riad",
    surface: 180,
    rooms: 4,
    bathrooms: 2,
    description: "Magnifique riad traditionnel",
    features: ["Piscine", "Terrasse", "Patio"],
    hasLive: true,
    tags: ["Nouveauté"],
    agent: mockAgents[2],
    coordinates: {
      lat: 31.6342,
      lng: -8.0079
    },
    transactionType: "Vente",
  },
  {
    id: "4",
    images: [placeholderImages[Math.floor(Math.random() * placeholderImages.length)]],
    title: "Bureau moderne",
    price: 1500000,
    location: "Casablanca",
    type: "Bureau",
    surface: 90,
    rooms: 2,
    bathrooms: 1,
    description: "Bureau moderne en plein centre-ville",
    features: ["Parking", "Sécurité", "Climatisation"],
    hasLive: true,
    tags: ["Coup de fusil"],
    agent: mockAgents[3],
    coordinates: {
      lat: 33.5731,
      lng: -7.5898
    },
    transactionType: "Location",
  },
  {
    id: "5",
    images: [placeholderImages[Math.floor(Math.random() * placeholderImages.length)]],
    title: "Villa avec piscine",
    price: 4500000,
    location: "Rabat",
    type: "Villa",
    surface: 350,
    rooms: 6,
    bathrooms: 4,
    description: "Superbe villa avec piscine et jardin",
    features: ["Piscine", "Jardin", "Garage", "Sécurité"],
    hasLive: false,
    tags: ["Exclusivité", "Nouveauté"],
    agent: mockAgents[0],
    coordinates: {
      lat: 34.0209,
      lng: -6.8416
    },
    transactionType: "Vente",
  }
];

const Search = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [surfaceRange, setSurfaceRange] = useState([0, 500]);
  const [showLiveOnly, setShowLiveOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [transactionType, setTransactionType] = useState<"buy" | "rent">("buy");

  const filteredProperties = mockProperties.filter((property) => {
    const matchesSearch =
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = propertyType === "all" || property.type === propertyType;
    const matchesPrice =
      property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesSurface =
      property.surface >= surfaceRange[0] && property.surface <= surfaceRange[1];
    const matchesLive = !showLiveOnly || property.hasLive;
    const matchesTransactionType = 
      (transactionType === "buy" && property.transactionType === "Vente") ||
      (transactionType === "rent" && property.transactionType === "Location");

    return (
      matchesSearch &&
      matchesType &&
      matchesPrice &&
      matchesSurface &&
      matchesLive &&
      matchesTransactionType
    );
  });

  // Show toast when no results are found
  if (filteredProperties.length === 0 && searchTerm !== "") {
    toast({
      title: "Aucun résultat",
      description: "Aucun bien ne correspond à vos critères. Essayez de modifier vos filtres.",
      variant: "destructive",
    });
  }

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
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      />

      <div className="pt-[180px] px-3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {filteredProperties.length > 0
              ? `${filteredProperties.length} biens trouvés`
              : "Aucun bien trouvé"}
          </h2>
          <ViewControls viewMode={viewMode} setViewMode={setViewMode} />
        </div>
        
        <SearchContent
          filteredProperties={filteredProperties}
          viewMode={viewMode}
        />
      </div>
    </div>
  );
};

export default Search;
