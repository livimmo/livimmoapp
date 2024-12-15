import { useState } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Search as SearchIcon, MapPin, List, SlidersHorizontal, X } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Données mockées pour l'exemple
const mockProperties = [
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
    coordinates: [31.6295, -7.9811],
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
    coordinates: [35.7595, -5.8340],
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
    coordinates: [33.5731, -7.5898],
  },
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [surfaceRange, setSurfaceRange] = useState([0, 500]);
  const [showLiveOnly, setShowLiveOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [showFilters, setShowFilters] = useState(false);

  // Filtrer les propriétés en fonction des critères
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
      {/* Barre de recherche fixe */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-10 p-4 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher par ville ou région..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode(viewMode === "list" ? "map" : "list")}
          >
            {viewMode === "list" ? (
              <MapPin className="h-4 w-4" />
            ) : (
              <List className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Filtres avancés */}
        {showFilters && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <Select value={propertyType} onValueChange={setPropertyType}>
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
              <div className="flex items-center gap-2">
                <Checkbox
                  id="live"
                  checked={showLiveOnly}
                  onCheckedChange={(checked) => setShowLiveOnly(checked as boolean)}
                />
                <label htmlFor="live" className="text-sm">
                  Live uniquement
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Prix : {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} MAD
              </label>
              <Slider
                min={0}
                max={5000000}
                step={100000}
                value={priceRange}
                onValueChange={setPriceRange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Surface : {surfaceRange[0]} - {surfaceRange[1]} m²
              </label>
              <Slider
                min={0}
                max={500}
                step={10}
                value={surfaceRange}
                onValueChange={setSurfaceRange}
              />
            </div>
          </div>
        )}
      </div>

      {/* Contenu principal */}
      <div className="pt-[76px] px-4">
        {viewMode === "list" ? (
          // Vue liste
          <div className="grid grid-cols-1 gap-4 py-4">
            {filteredProperties.map((property) => (
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
            {filteredProperties.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Aucun bien ne correspond à vos critères
              </div>
            )}
          </div>
        ) : (
          // Vue carte
          <div className="h-[calc(100vh-92px)]">
            <MapContainer
              center={[31.7917, -7.0926]}
              zoom={6}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredProperties.map((property) => (
                <Marker key={property.id} position={property.coordinates as [number, number]}>
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold">{property.title}</h3>
                      <p className="text-sm">{property.price.toLocaleString()} MAD</p>
                      <p className="text-sm">{property.surface} m² - {property.rooms} pièces</p>
                      {property.hasLive && (
                        <Button size="sm" className="mt-2 w-full">
                          Rejoindre le live
                        </Button>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;