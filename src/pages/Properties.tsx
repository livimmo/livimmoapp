import { useState } from "react";
import { PropertyList } from "@/components/properties/PropertyList";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { type Property } from "@/types/property";
import { addCoordinatesToProperties } from "@/data/mockProperties";

// Mock data with coordinates
export const mockProperties: Property[] = addCoordinatesToProperties([
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
    liveDate: new Date(Date.now() + 86400000),
    agent: {
      name: "Sarah Martin",
      image: "https://i.pravatar.cc/150?u=sarah",
      phone: "+212 6 12 34 56 78",
      email: "sarah.martin@example.com",
    },
    transactionType: "Vente" as const,
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
      image: "https://i.pravatar.cc/150?u=mohammed",
      phone: "+212 6 23 45 67 89",
      email: "mohammed.alami@example.com",
    },
    transactionType: "Location" as const,
  },
]);

export const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [surfaceRange, setSurfaceRange] = useState([0, 500]);
  const [showLiveOnly, setShowLiveOnly] = useState(false);

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

    return (
      matchesSearch && matchesType && matchesPrice && matchesSurface && matchesLive
    );
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Nos biens</h1>
        </div>

        <PropertyFilters
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
        />

        <PropertyList properties={filteredProperties} />
      </div>
    </div>
  );
};

export default Properties;
