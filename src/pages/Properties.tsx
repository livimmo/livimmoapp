import { Agent } from "@/types/agent";

import { useState } from "react";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { PropertyList } from "@/components/properties/PropertyList";
import { addCoordinatesToProperties } from "@/data/mockProperties";
import { type Property } from "@/types/property";

const mockAgent: Agent = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  phone: "+33 6 12 34 56 78",
  avatar: "/placeholder.svg",
  image: "/placeholder.svg",
  location: "Paris",
  type: "agent",
  company: "Real Estate Co",
  verified: true
};

export const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [surfaceRange, setSurfaceRange] = useState([0, 100000]);
  const [viewType, setViewType] = useState<"all" | "live" | "replay">("all");
  const [transactionType, setTransactionType] = useState<string[]>(["Vente"]);

  const mockPropertiesData: Omit<Property, "coordinates">[] = [
    {
      id: "1",
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
      agent: {
        id: "1",
        name: "Sarah Martin",
        email: "sarah.martin@example.com",
        phone: "+212 6 12 34 56 78",
        avatar: "https://i.pravatar.cc/150?u=sarah",
        image: "https://i.pravatar.cc/150?u=sarah",
        location: "Marrakech",
        type: "agent"
      },
      transactionType: "Vente",
      status: "available"
    },
    {
      id: "2",
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
        id: "2",
        name: "Mohammed Alami",
        email: "mohammed.alami@example.com",
        phone: "+212 6 23 45 67 89",
        avatar: "https://i.pravatar.cc/150?u=mohammed",
        location: "Tanger",
        type: "agent"
      },
      transactionType: "Location",
      status: "available"
    },
  ];

  const properties = addCoordinatesToProperties(mockPropertiesData);

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !propertyType || property.type === propertyType;
    const matchesPriceRange = property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesSurfaceRange = property.surface >= surfaceRange[0] && property.surface <= surfaceRange[1];
    const matchesTransactionType = transactionType.includes(property.transactionType);
    const matchesViewType = viewType === "all" ? true :
      viewType === "live" ? (property.hasLive && !property.isReplay) :
      (property.hasLive && property.isReplay);

    return matchesSearch && matchesType && matchesPriceRange && 
           matchesSurfaceRange && matchesTransactionType && matchesViewType;
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
        viewType={viewType}
        setViewType={setViewType}
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      />
      <PropertyList properties={filteredProperties} />
    </div>
  );
};

export default Properties;

