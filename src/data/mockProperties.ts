import { type Property } from "@/types/property";

// Helper function to generate mock coordinates
export const generateMockCoordinates = (location: string) => {
  // Default to Casablanca coordinates
  const defaultCoords = {
    lat: 33.5731104,
    lng: -7.6425486
  };

  // You could add more city coordinates here
  const cityCoords: Record<string, { lat: number; lng: number }> = {
    "Casablanca": { lat: 33.5731104, lng: -7.6425486 },
    "Marrakech": { lat: 31.6294723, lng: -7.9810845 },
    "Rabat": { lat: 34.0209, lng: -6.8416 },
    "Tanger": { lat: 35.7595, lng: -5.8340 }
  };

  return cityCoords[location] || defaultCoords;
};

// Helper function to add coordinates to properties
export const addCoordinatesToProperties = (properties: Property[]): Property[] => {
  return properties.map(property => ({
    ...property,
    coordinates: generateMockCoordinates(property.location)
  }));
};

export const mockProperty: Property = {
  id: 1,
  title: "Appartement moderne au centre-ville",
  price: 1200000,
  location: "Casablanca, Maarif",
  type: "Appartement",
  surface: 120,
  rooms: 3,
  bathrooms: 2,
  description: "Magnifique appartement rénové...",
  features: ["Climatisation", "Ascenseur", "Parking"],
  images: ["/placeholder.svg"],
  coordinates: {
    lat: 33.5731104,
    lng: -7.6425486
  },
  transactionType: "Vente",
  agent: {
    id: 1,
    name: "Sarah Martin",
    image: "https://example.com/avatar.jpg",
    phone: "+212 6XX XXX XXX",
    email: "sarah@example.com",
    location: "Casablanca",
    type: "agent",
    description: "Expert immobilier avec plus de 10 ans d'expérience",
    rating: 4.8,
    totalReviews: 156,
    activeProperties: 12,
    completedLives: 45,
    scheduledLives: 3,
    soldProperties: 89,
    verified: true,
    specialties: ["Résidentiel", "Luxe"]
  }
};

// Create an array of mock properties
export const mockProperties: Property[] = [
  mockProperty,
  {
    ...mockProperty,
    id: 2,
    title: "Villa avec piscine",
    location: "Marrakech",
    price: 2500000,
    type: "Villa",
    surface: 300,
    rooms: 5,
    bathrooms: 3,
    coordinates: generateMockCoordinates("Marrakech")
  },
  {
    ...mockProperty,
    id: 3,
    title: "Appartement vue mer",
    location: "Tanger",
    price: 1800000,
    type: "Appartement",
    surface: 150,
    rooms: 4,
    bathrooms: 2,
    coordinates: generateMockCoordinates("Tanger")
  }
];