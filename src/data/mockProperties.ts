import { Property } from "@/types/property";

// Coordonnées des principales villes du Maroc
const cityCoordinates = {
  "Casablanca": { lat: 33.53563065721966, lng: -7.778285306636483 },
  "Rabat": { lat: 34.0209, lng: -6.8416 },
  "Marrakech": { lat: 31.6295, lng: -7.9811 },
  "Tanger": { lat: 35.7595, lng: -5.8340 },
  "Agadir": { lat: 30.4278, lng: -9.5981 },
  "Fès": { lat: 34.0333, lng: -5.0000 }
};

export const generateMockCoordinates = (location: string) => {
  const cityName = Object.keys(cityCoordinates).find(city => 
    location.toLowerCase().includes(city.toLowerCase())
  ) || "Casablanca";
  
  const baseCoordinates = cityCoordinates[cityName];
  
  if (cityName === "Casablanca") {
    return baseCoordinates;
  }
  
  return {
    lat: baseCoordinates.lat + (Math.random() - 0.5) * 0.05,
    lng: baseCoordinates.lng + (Math.random() - 0.5) * 0.05
  };
};

// Fonction pour générer un statut live aléatoire
const generateRandomLiveStatus = () => {
  const hasLive = Math.random() > 0.5;
  if (!hasLive) return { hasLive };

  const now = new Date();
  const futureDate = new Date();
  futureDate.setDate(now.getDate() + Math.floor(Math.random() * 14));
  
  return {
    hasLive,
    liveDate: futureDate,
    isLiveNow: Math.random() > 0.8,
    viewers: Math.floor(Math.random() * 50),
    remainingSeats: Math.floor(Math.random() * 20)
  };
};

const mockPropertiesBase = [
  {
    id: 1,
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
    offers: 15,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    ],
    agent: {
      name: "Sarah Martin",
      image: "https://i.pravatar.cc/150?u=sarah",
      phone: "+212 6 12 34 56 78",
      email: "sarah.martin@example.com",
    },
    transactionType: "Vente" as const
  },
  {
    id: 2,
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
    offers: 8,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
    ],
    agent: {
      name: "Mohammed Alami",
      image: "https://i.pravatar.cc/150?u=mohammed",
      phone: "+212 6 23 45 67 89",
      email: "mohammed.alami@example.com",
    },
    transactionType: "Location" as const
  },
  {
    id: 3,
    title: "Riad traditionnel rénové à Marrakech",
    price: 3200000,
    description: "Authentique riad du 18ème siècle entièrement rénové, alliant le charme de l'architecture traditionnelle aux commodités modernes. Situé dans la médina de Marrakech, ce bien d'exception de 300m² dispose d'un patio avec fontaine, d'une piscine et d'une terrasse offrant une vue imprenable sur l'Atlas.",
    location: "Médina, Marrakech",
    type: "Riad",
    surface: 300,
    rooms: 5,
    bathrooms: 5,
    features: [
      "Patio avec fontaine",
      "Piscine",
      "Terrasse panoramique",
      "Hammam traditionnel",
      "Salon marocain",
      "Cuisine équipée",
      "Personnel de maison"
    ],
    images: [
      "https://images.unsplash.com/photo-1590059390047-f5e617b6cbc7",
      "https://images.unsplash.com/photo-1590059390163-d7aae1abc5ad",
      "https://images.unsplash.com/photo-1590059390296-b9d4a9b53e44"
    ],
    hasLive: true,
    liveDate: new Date("2024-03-25T14:00:00"),
    isLiveNow: false,
    viewers: 0,
    remainingSeats: 20,
    agent: {
      name: "Yasmine Idrissi",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      phone: "+212 6 63 45 67 89",
      email: "yasmine.idrissi@example.com"
    },
    offers: 5,
    transactionType: "Vente" as const,
    coordinates: generateMockCoordinates("Médina, Marrakech")
  },
  {
    id: 4,
    title: "Penthouse contemporain à Tanger",
    price: 3800000,
    description: "Penthouse d'exception de 250m² situé dans le quartier prisé de Malabata. Cette propriété unique offre une vue à 360° sur le détroit de Gibraltar et la ville de Tanger. Les finitions haut de gamme, la domotique intégrée et les vastes terrasses en font un bien rare sur le marché.",
    location: "Malabata, Tanger",
    type: "Penthouse",
    surface: 250,
    rooms: 4,
    bathrooms: 3,
    features: [
      "Vue mer panoramique",
      "Terrasses 100m²",
      "Domotique",
      "Jacuzzi",
      "Cave à vin",
      "Parking 2 voitures",
      "Conciergerie"
    ],
    images: [
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858"
    ],
    hasLive: false,
    agent: {
      name: "Omar Tazi",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      phone: "+212 6 64 56 78 90",
      email: "omar.tazi@example.com"
    },
    offers: 0,
    transactionType: "Location" as const,
    coordinates: generateMockCoordinates("Malabata, Tanger")
  },
  {
    id: 5,
    title: "Usine moderne avec quais de chargement",
    price: 12500000,
    location: "Casablanca, Zone Industrielle Ain Sebaa",
    type: "Logistique/Industriel",
    surface: 2500,
    rooms: 10,
    bathrooms: 6,
    description: "Grande usine moderne avec quais de chargement et bureaux",
    features: ["Quais de chargement", "Bureaux", "Parking poids lourds"],
    hasLive: true,
    tags: ["Nouveauté"],
    offers: 3,
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492",
    ],
    agent: {
      id: 5,
      name: "Karim Tazi",
      image: "https://i.pravatar.cc/150?u=karim2",
      phone: "+212 6 78 90 12 34",
      email: "karim.tazi@example.com",
      company: "Industrial Pro",
      verified: true
    },
    transactionType: "Vente" as const
  },
  {
    id: 6,
    title: "Terrain constructible zone franche",
    price: 8500000,
    location: "Tanger, Zone Franche",
    type: "Terrain",
    surface: 5000,
    rooms: 0,
    bathrooms: 0,
    description: "Terrain viabilisé en zone franche de Tanger",
    features: ["Viabilisé", "Zone franche", "Accès poids lourds"],
    hasLive: true,
    tags: ["Coup de fusil"],
    offers: 7,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    ],
    agent: {
      id: 6,
      name: "Samira Alaoui",
      image: "https://i.pravatar.cc/150?u=samira",
      phone: "+212 6 89 01 23 45",
      email: "samira.alaoui@example.com",
      company: "Tanger Invest",
      verified: true
    },
    transactionType: "Vente" as const
  },
  {
    id: 7,
    title: "Bureaux premium centre-ville",
    price: 45000,
    location: "Casablanca, Marina",
    type: "Bureau",
    surface: 250,
    rooms: 8,
    bathrooms: 4,
    description: "Bureaux haut standing avec vue sur mer",
    features: ["Vue mer", "Parking", "Sécurité 24/7"],
    hasLive: true,
    tags: ["Nouveauté"],
    offers: 4,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c",
      "https://images.unsplash.com/photo-1497366216548-37526070297c",
    ],
    agent: {
      id: 7,
      name: "Hassan Benjelloun",
      image: "https://i.pravatar.cc/150?u=hassan",
      phone: "+212 6 90 12 34 56",
      email: "hassan.benjelloun@example.com",
      company: "Premium Office",
      verified: true
    },
    transactionType: "Location" as const
  },
  {
    id: 8,
    title: "Entrepôt logistique neuf",
    price: 18000000,
    location: "Casablanca, Nouaceur",
    type: "Logistique/Industriel",
    surface: 3500,
    rooms: 5,
    bathrooms: 8,
    description: "Entrepôt neuf aux normes internationales",
    features: ["Quais niveleurs", "Grande hauteur", "Sprinklers"],
    hasLive: true,
    tags: ["Exclusivité"],
    offers: 2,
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
    ],
    agent: {
      id: 8,
      name: "Mehdi Chraibi",
      image: "https://i.pravatar.cc/150?u=mehdi",
      phone: "+212 6 01 23 45 67",
      email: "mehdi.chraibi@example.com",
      company: "Logipro",
      verified: true
    },
    transactionType: "Vente" as const
  },
  {
    id: 9,
    title: "Terrain industriel Bouskoura",
    price: 6500000,
    location: "Casablanca, Bouskoura",
    type: "Terrain",
    surface: 4000,
    rooms: 0,
    bathrooms: 0,
    description: "Terrain industriel plat et viabilisé",
    features: ["Viabilisé", "Plat", "Zone industrielle"],
    hasLive: false,
    tags: ["Nouveauté"],
    offers: 1,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    ],
    agent: {
      id: 9,
      name: "Nadia Berrada",
      image: "https://i.pravatar.cc/150?u=nadia",
      phone: "+212 6 12 34 56 78",
      email: "nadia.berrada@example.com",
      company: "Industriel Pro",
      verified: true
    },
    transactionType: "Vente" as const
  },
  {
    id: 10,
    title: "Plateau de bureaux Agdal",
    price: 35000,
    location: "Rabat, Agdal",
    type: "Bureau",
    surface: 180,
    rooms: 6,
    bathrooms: 2,
    description: "Plateau de bureaux moderne et lumineux",
    features: ["Climatisation", "Fibre optique", "Parking"],
    hasLive: true,
    tags: ["Coup de fusil"],
    offers: 5,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c",
      "https://images.unsplash.com/photo-1497366216548-37526070297c",
    ],
    agent: {
      id: 10,
      name: "Youssef El Amrani",
      image: "https://i.pravatar.cc/150?u=youssef",
      phone: "+212 6 23 45 67 89",
      email: "youssef.elamrani@example.com",
      company: "Rabat Office",
      verified: true
    },
    transactionType: "Location" as const
  },
  {
    id: 11,
    title: "Usine agroalimentaire équipée",
    price: 22000000,
    location: "Meknès, Zone Industrielle",
    type: "Logistique/Industriel",
    surface: 4500,
    rooms: 15,
    bathrooms: 10,
    description: "Usine agroalimentaire aux normes HACCP",
    features: ["Chambres froides", "Quais", "Laboratoire"],
    hasLive: true,
    tags: ["Exclusivité"],
    offers: 3,
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    ],
    agent: {
      id: 11,
      name: "Amine Bennani",
      image: "https://i.pravatar.cc/150?u=amine",
      phone: "+212 6 34 56 78 90",
      email: "amine.bennani@example.com",
      company: "Agro Immo",
      verified: true
    },
    transactionType: "Vente" as const
  },
  {
    id: 12,
    title: "Terrain commercial Marrakech",
    price: 15000000,
    location: "Marrakech, Route de Fès",
    type: "Terrain",
    surface: 8000,
    rooms: 0,
    bathrooms: 0,
    description: "Grand terrain commercial bien situé",
    features: ["Commercial", "Double façade", "Grand axe"],
    hasLive: true,
    tags: ["Nouveauté"],
    offers: 6,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    ],
    agent: {
      id: 12,
      name: "Leila Fassi",
      image: "https://i.pravatar.cc/150?u=leila",
      phone: "+212 6 45 67 89 01",
      email: "leila.fassi@example.com",
      company: "Marrakech Pro",
      verified: true
    },
    transactionType: "Vente" as const
  },
  {
    id: 13,
    title: "Bureaux open space Marina",
    price: 75000,
    location: "Casablanca, Marina",
    type: "Bureau",
    surface: 400,
    rooms: 12,
    bathrooms: 6,
    description: "Grand plateau open space vue mer",
    features: ["Open space", "Vue mer", "Terrasse"],
    hasLive: true,
    tags: ["Coup de fusil"],
    offers: 8,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c",
      "https://images.unsplash.com/photo-1497366216548-37526070297c",
    ],
    agent: {
      id: 13,
      name: "Sofia Ziani",
      image: "https://i.pravatar.cc/150?u=sofia",
      phone: "+212 6 56 78 90 12",
      email: "sofia.ziani@example.com",
      company: "Marina Office",
      verified: true
    },
    transactionType: "Location" as const
  },
  {
    id: 14,
    title: "Terrain industriel Tanger Med",
    price: 9500000,
    location: "Tanger, Zone Tanger Med",
    type: "Terrain",
    surface: 6000,
    rooms: 0,
    bathrooms: 0,
    description: "Terrain industriel zone franche Tanger Med",
    features: ["Zone franche", "Viabilisé", "Accès autoroute"],
    hasLive: true,
    tags: ["Exclusivité"],
    offers: 4,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    ],
    agent: {
      id: 14,
      name: "Omar Alami",
      image: "https://i.pravatar.cc/150?u=omar",
      phone: "+212 6 67 89 01 23",
      email: "omar.alami@example.com",
      company: "Tanger Industrial",
      verified: true
    },
    transactionType: "Vente" as const
  }
].map(property => ({
  ...property,
  transactionType: Math.random() > 0.5 ? ("Vente" as const) : ("Location" as const)
}));

export const addCoordinatesToProperty = (property: Omit<Property, 'coordinates'>): Property => ({
  ...property,
  coordinates: generateMockCoordinates(property.location),
  ...generateRandomLiveStatus()
});

export const addCoordinatesToProperties = (properties: Array<Omit<Property, 'coordinates'>>): Property[] => {
  return properties.map(property => addCoordinatesToProperty(property));
};

export const mockProperties: Property[] = addCoordinatesToProperties(mockPropertiesBase);
