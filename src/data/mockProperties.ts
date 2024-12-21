import { type Property } from "@/types/property";
import { addDays } from "date-fns";

const generateRandomPrice = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min) * 1000;
};

const generateRandomSurface = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateRandomRooms = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Helper function to generate mock coordinates
export const generateMockCoordinates = (location: string) => {
  const defaultCoords = {
    lat: 33.5731104,
    lng: -7.6425486
  };

  const cityCoords: Record<string, { lat: number; lng: number }> = {
    "Casablanca": { lat: 33.5731104, lng: -7.6425486 },
    "Marrakech": { lat: 31.6294723, lng: -7.9810845 },
    "Rabat": { lat: 34.0209, lng: -6.8416 },
    "Tanger": { lat: 35.7595, lng: -5.8340 },
    "Agadir": { lat: 30.4278, lng: -9.5981 },
    "Fès": { lat: 34.0333, lng: -5.0000 }
  };

  return cityCoords[location] || defaultCoords;
};

const cities = [
  { city: "Casablanca", districts: ["Maarif", "Ain Diab", "Anfa", "Bourgogne", "CIL", "Gauthier"] },
  { city: "Marrakech", districts: ["Guéliz", "Hivernage", "Palmeraie", "Médina", "Agdal"] },
  { city: "Rabat", districts: ["Agdal", "Hassan", "Hay Riad", "Les Orangers", "Souissi"] },
  { city: "Tanger", districts: ["Malabata", "Iberia", "Centre Ville", "Marshan", "Cap Spartel"] },
  { city: "Agadir", districts: ["Centre", "Founty", "Sonaba", "Talborjt"] },
  { city: "Fès", districts: ["Ville Nouvelle", "Atlas", "Route Immouzer", "Saiss"] }
];

const propertyTypes = [
  { type: "Appartement", features: ["Ascenseur", "Parking", "Climatisation", "Terrasse"] },
  { type: "Villa", features: ["Piscine", "Jardin", "Garage", "Sécurité 24/7"] },
  { type: "Penthouse", features: ["Vue panoramique", "Terrasse privée", "Ascenseur privé", "Domotique"] },
  { type: "Hôtel", features: ["Restaurant", "Spa", "Salle de conférence", "Parking"] },
  { type: "Usine", features: ["Quai de chargement", "Bureau administratif", "Parking poids lourds", "Sécurité"] },
  { type: "Bureau", features: ["Open space", "Salle de réunion", "Kitchenette", "Fibre optique"] },
  { type: "Local commercial", features: ["Vitrine", "Stock", "Climatisation", "Alarme"] },
  { type: "Riad", features: ["Patio", "Fontaine", "Terrasse", "Hammam"] }
];

const agents = [
  {
    id: 1,
    name: "Sarah Martin",
    image: "https://i.pravatar.cc/150?u=sarah",
    phone: "+212 6XX XXX XXX",
    email: "sarah@livimmo.ma",
    company: "Livimmo",
    verified: true
  },
  {
    id: 2,
    name: "Mohammed Alami",
    image: "https://i.pravatar.cc/150?u=mohammed",
    phone: "+212 6XX XXX XXX",
    email: "mohammed@livimmo.ma",
    company: "Livimmo",
    verified: true
  },
  {
    id: 3,
    name: "Yasmine Idrissi",
    image: "https://i.pravatar.cc/150?u=yasmine",
    phone: "+212 6XX XXX XXX",
    email: "yasmine@livimmo.ma",
    company: "Livimmo",
    verified: true
  }
];

const propertyImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d"
];

// Generate 20 random properties
export const mockProperties: Property[] = Array.from({ length: 20 }, (_, index) => {
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  const randomDistrict = randomCity.districts[Math.floor(Math.random() * randomCity.districts.length)];
  const randomPropertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
  const randomAgent = agents[Math.floor(Math.random() * agents.length)];
  const hasLive = Math.random() > 0.5;
  const isLiveNow = hasLive && Math.random() > 0.5;
  const liveDate = hasLive && !isLiveNow ? addDays(new Date(), Math.floor(Math.random() * 14) + 1) : undefined;

  return {
    id: index + 1,
    title: `${randomPropertyType.type} ${randomCity.city} - ${randomDistrict}`,
    price: generateRandomPrice(500, 10000),
    location: `${randomCity.city}, ${randomDistrict}`,
    type: randomPropertyType.type,
    surface: generateRandomSurface(50, 1000),
    rooms: generateRandomRooms(1, 10),
    bathrooms: generateRandomRooms(1, 5),
    description: `Magnifique ${randomPropertyType.type.toLowerCase()} situé dans le quartier prisé de ${randomDistrict}, ${randomCity.city}.`,
    features: randomPropertyType.features,
    images: [propertyImages[Math.floor(Math.random() * propertyImages.length)]],
    coordinates: generateMockCoordinates(randomCity.city),
    hasLive,
    isLiveNow,
    liveDate,
    viewers: isLiveNow ? Math.floor(Math.random() * 100) : 0,
    remainingSeats: !isLiveNow && hasLive ? Math.floor(Math.random() * 20) + 5 : undefined,
    isUserRegistered: Math.random() > 0.7,
    transactionType: Math.random() > 0.3 ? "Vente" : "Location",
    agent: randomAgent,
    virtualTour: {
      enabled: Math.random() > 0.7,
      type: "360"
    }
  };
});

// Base mock property with all required fields (keeping for compatibility)
export const mockProperty: Property = mockProperties[0];
