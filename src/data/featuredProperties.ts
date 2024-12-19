import { Property } from "@/types/property";

export const featuredProperties: Property[] = [
  {
    id: 1,
    title: "Villa Moderne avec Piscine",
    price: 2500000,
    location: "Marrakech",
    type: "Villa",
    surface: 350,
    rooms: 5,
    bathrooms: 3,
    description: "Magnifique villa moderne avec piscine et jardin paysager",
    features: ["Piscine", "Jardin", "Garage", "Climatisation", "Sécurité 24/7"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227",
    ],
    hasLive: true,
    liveDate: new Date("2024-03-15"),
    agent: {
      name: "Karim Benjelloun",
      image: "https://i.pravatar.cc/150?u=karim",
      phone: "+212 6 00 11 22 33",
      email: "karim.benjelloun@example.com",
    },
    transactionType: "Vente",
    coordinates: {
      lat: 31.6295,
      lng: -7.9811
    },
    virtualTour: {
      enabled: true,
      url: "https://my.matterport.com/show/?m=SxQL3iGyvQk",
      type: "360",
      hotspots: [
        {
          title: "Salon",
          description: "Spacieux salon avec vue sur la piscine",
          position: { x: 30, y: 40 },
          details: [
            { label: "Surface", value: "45m²" },
            { label: "Exposition", value: "Sud" }
          ]
        }
      ]
    }
  },
  {
    id: 2,
    title: "Appartement Vue Mer",
    price: 1800000,
    location: "Tanger",
    type: "Appartement",
    surface: 120,
    rooms: 3,
    bathrooms: 2,
    description: "Superbe appartement avec vue panoramique sur la mer",
    features: ["Vue mer", "Terrasse", "Ascenseur", "Parking", "Cuisine équipée"],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    ],
    hasLive: false,
    agent: {
      name: "Sophia Martinez",
      image: "https://i.pravatar.cc/150?u=sophia",
      phone: "+212 6 11 22 33 44",
      email: "sophia.martinez@example.com",
    },
    transactionType: "Location" as const,
    virtualTour: {
      enabled: true,
      url: "https://my.matterport.com/show/?m=SxQL3iGyvQk",
      type: "360" as const,
      hotspots: [
        {
          title: "Chambre",
          description: "Chambre spacieuse avec vue sur la mer",
          position: { x: 50, y: 50 },
          details: [
            { label: "Surface", value: "30m²" },
            { label: "Exposition", value: "Est" }
          ]
        }
      ]
    }
  },
  {
    id: 3,
    title: "Penthouse Luxueux",
    price: 3200000,
    location: "Casablanca",
    type: "Appartement",
    surface: 200,
    rooms: 4,
    bathrooms: 3,
    description: "Penthouse de luxe avec terrasse panoramique",
    features: ["Terrasse", "Vue panoramique", "Parking", "Salle de sport", "Spa"],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227",
    ],
    hasLive: true,
    liveDate: new Date("2024-03-20"),
    agent: {
      name: "Yasmine Alaoui",
      image: "https://i.pravatar.cc/150?u=yasmine",
      phone: "+212 6 22 33 44 55",
      email: "yasmine.alaoui@example.com",
    },
    transactionType: "Vente" as const,
    virtualTour: {
      enabled: true,
      url: "https://my.matterport.com/show/?m=SxQL3iGyvQk",
      type: "360" as const,
      hotspots: [
        {
          title: "Terrasse",
          description: "Terrasse avec vue imprenable sur la ville",
          position: { x: 70, y: 30 },
          details: [
            { label: "Surface", value: "50m²" },
            { label: "Exposition", value: "Ouest" }
          ]
        }
      ]
    }
  },
];
