import { Property } from "@/types/property";

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
    avatar: "https://example.com/avatar.jpg",
    contact: {
      phone: "+212 6XX XXX XXX",
      email: "sarah@example.com"
    },
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