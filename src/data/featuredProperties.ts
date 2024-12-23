import { Property } from "@/types/property";

export const featuredProperties: Property[] = [
  {
    id: "1",
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
      id: "1",
      name: "Karim Benjelloun",
      avatar: "https://i.pravatar.cc/150?u=karim",
      image: "https://i.pravatar.cc/150?u=karim",
      phone: "+212 6 00 11 22 33",
      email: "karim.benjelloun@example.com",
      location: "Marrakech",
      type: "agent"
    },
    coordinates: {
      lat: 31.6295,
      lng: -7.9811
    },
    transactionType: "Vente",
    virtualTour: {
      enabled: true,
      url: "TzhRashYdRt",
      platform: 'matterport',
      type: "360"
    }
  },
  {
    id: "2",
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
      id: "2",
      name: "Sophia Martinez",
      avatar: "https://i.pravatar.cc/150?u=sophia",
      image: "https://i.pravatar.cc/150?u=sophia",
      phone: "+212 6 11 22 33 44",
      email: "sophia.martinez@example.com",
      location: "Tanger",
      type: "agent"
    },
    coordinates: {
      lat: 35.7595,
      lng: -5.8340
    },
    transactionType: "Location",
    virtualTour: {
      enabled: true,
      url: "https://my.matterport.com/show/?m=SxQL3iGyvQk",
      type: "360"
    }
  }
];
