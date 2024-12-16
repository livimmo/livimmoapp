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
  futureDate.setDate(now.getDate() + Math.floor(Math.random() * 14)); // Date dans les 14 prochains jours
  
  return {
    hasLive,
    liveDate: futureDate,
    isLiveNow: Math.random() > 0.8, // 20% de chance d'être en live
    viewers: Math.floor(Math.random() * 50),
    remainingSeats: Math.floor(Math.random() * 20)
  };
};

export const mockProperties: Property[] = [
  {
    id: 1,
    title: "Villa de luxe avec piscine à Casablanca",
    price: 4500000,
    description: "Magnifique villa moderne de 400m² située dans le prestigieux quartier d'Anfa. Cette propriété d'exception offre une vue imprenable sur l'océan et dispose d'une piscine à débordement, d'un jardin paysager et d'un système domotique dernier cri. Parfaite pour une famille exigeante recherchant le confort et le luxe.",
    location: "Anfa, Casablanca",
    type: "Villa",
    surface: 400,
    rooms: 6,
    bathrooms: 4,
    features: [
      "Piscine à débordement",
      "Vue mer",
      "Jardin paysager",
      "Domotique",
      "Garage 2 voitures",
      "Salle de sport",
      "Hammam",
      "Système d'alarme"
    ],
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
    ],
    hasLive: true,
    liveDate: new Date("2024-03-20T15:00:00"),
    isLiveNow: false,
    viewers: 0,
    remainingSeats: 15,
    agent: {
      name: "Sarah Alami",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      phone: "+212 6 61 23 45 67",
      email: "sarah.alami@example.com"
    },
    coordinates: generateMockCoordinates("Anfa, Casablanca")
  },
  {
    id: 2,
    title: "Appartement haut standing à Marina Casablanca",
    price: 2800000,
    description: "Superbe appartement de 180m² situé au cœur de la Marina de Casablanca. Bénéficiant d'une vue panoramique sur le port et l'océan, ce bien d'exception propose des prestations haut de gamme et une décoration raffinée. Les grandes baies vitrées offrent une luminosité exceptionnelle tout au long de la journée.",
    location: "Marina, Casablanca",
    type: "Appartement",
    surface: 180,
    rooms: 4,
    bathrooms: 2,
    features: [
      "Vue panoramique",
      "Terrasse",
      "Climatisation centralisée",
      "Parking sous-sol",
      "Sécurité 24/7",
      "Ascenseur",
      "Cave"
    ],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6"
    ],
    hasLive: true,
    liveDate: new Date("2024-03-22T16:00:00"),
    isLiveNow: true,
    viewers: 12,
    remainingSeats: 8,
    agent: {
      name: "Karim Benjelloun",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      phone: "+212 6 62 34 56 78",
      email: "karim.benjelloun@example.com"
    },
    coordinates: generateMockCoordinates("Marina, Casablanca")
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
    coordinates: generateMockCoordinates("Malabata, Tanger")
  }
];

export const addCoordinatesToProperty = (property: Omit<Property, 'coordinates'>): Property => ({
  ...property,
  coordinates: generateMockCoordinates(property.location),
  ...generateRandomLiveStatus()
});

export const addCoordinatesToProperties = (properties: Omit<Property, 'coordinates'>[]): Property[] => {
  return properties.map(property => addCoordinatesToProperty(property));
};