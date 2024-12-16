import { useState } from "react";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { PropertyList } from "@/components/properties/PropertyList";
import { addCoordinatesToProperties } from "@/data/mockProperties";

export const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [surfaceRange, setSurfaceRange] = useState([0, 1000]);
  const [showLiveOnly, setShowLiveOnly] = useState(false);
  const [transactionType, setTransactionType] = useState<"Vente" | "Location">("Vente");

  const mockProperties = addCoordinatesToProperties([
    {
      id: 1,
      title: "Villa moderne avec piscine",
      type: "Villa",
      price: 2500000,
      location: "Marrakech",
      surface: 250,
      rooms: 4,
      bathrooms: 3,
      description: "Magnifique villa moderne avec piscine",
      features: ["Piscine", "Jardin", "Garage"],
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      ],
      hasLive: true,
      liveDate: new Date("2024-03-20"),
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
      title: "Appartement vue mer",
      type: "Appartement",
      price: 1800000,
      location: "Tanger",
      surface: 120,
      rooms: 3,
      bathrooms: 2,
      description: "Superbe appartement avec vue sur mer",
      features: ["Vue mer", "Terrasse", "Parking"],
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

  const filteredProperties = mockProperties.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !propertyType || property.type === propertyType;
    const matchesMinPrice = !priceRange[0] || property.price >= priceRange[0];
    const matchesMaxPrice = !priceRange[1] || property.price <= priceRange[1];
    const matchesLive = !showLiveOnly || property.hasLive;
    const matchesTransactionType = property.transactionType === transactionType;

    return matchesSearch && matchesType && matchesMinPrice && matchesMaxPrice && matchesLive && matchesTransactionType;
  });

  return (
    <div className="container mx-auto py-8 px-4">
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
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      />
      <PropertyList properties={filteredProperties} />
    </div>
  );
};

export default Properties;
