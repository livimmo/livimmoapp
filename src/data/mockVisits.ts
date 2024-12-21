import { Visit } from "@/types/visit";
import { Property } from "@/types/property";

const mockProperty: Property = {
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
    description: "Expert immobilier avec plus de 10 ans d'expérience"
  }
};

export const mockVisits: Visit[] = [
  {
    id: 1,
    date: new Date("2024-03-20T14:00:00"),
    status: "pending",
    type: "physical",
    property: mockProperty,
    agent: {
      id: 1,
      name: "Sarah Martin",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      contact: {
        phone: "+212 6XX XXX XXX",
        email: "sarah.martin@example.com"
      },
      location: "Casablanca",
      type: "agent",
      rating: 4.8,
      totalReviews: 124,
      activeProperties: 15,
      completedLives: 45,
      scheduledLives: 3,
      soldProperties: 89,
      company: "Livimmo",
      companyLogo: "/livimmo-icon.svg",
      verified: true,
      specialties: ["Résidentiel", "Luxe"],
      description: "Expert immobilier avec plus de 10 ans d'expérience"
    },
    visitor: {
      name: "Mohamed Alami",
      email: "m.alami@example.com",
      phone: "+212 6XX XXX XXX"
    },
    notes: "Intéressé par la vue et l'emplacement"
  },
  {
    id: 2,
    date: new Date("2024-03-21T10:00:00"),
    status: "confirmed",
    type: "virtual",
    property: mockProperty,
    agent: {
      id: 2,
      name: "Mohammed Alami",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      contact: {
        phone: "+212 6XX XXX XXX",
        email: "m.alami@example.com"
      },
      location: "Rabat",
      type: "agent",
      rating: 4.9,
      totalReviews: 156,
      activeProperties: 12,
      completedLives: 38,
      scheduledLives: 2,
      soldProperties: 72,
      company: "Livimmo",
      companyLogo: "/livimmo-icon.svg",
      verified: true,
      specialties: ["Commercial", "Bureau"]
    },
    visitor: {
      name: "Sophia Chen",
      email: "s.chen@example.com",
      phone: "+212 6XX XXX XXX"
    },
    notes: "Recherche un bien pour investissement"
  },
  {
    id: 3,
    date: new Date("2024-03-22T15:30:00"),
    status: "completed",
    type: "physical",
    property: mockProperty,
    agent: {
      id: 3,
      name: "Yasmine Idrissi",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
      contact: {
        phone: "+212 6XX XXX XXX",
        email: "yasmine.idrissi@example.com"
      },
      location: "Marrakech",
      type: "agent",
      rating: 4.7,
      totalReviews: 98,
      activeProperties: 8,
      completedLives: 25,
      scheduledLives: 4,
      soldProperties: 45,
      company: "Livimmo",
      companyLogo: "/livimmo-icon.svg",
      verified: true,
      specialties: ["Résidentiel", "Luxe"]
    },
    visitor: {
      name: "John Smith",
      email: "j.smith@example.com",
      phone: "+212 6XX XXX XXX"
    },
    notes: "A apprécié la visite, réflexion en cours"
  },
  {
    id: 4,
    date: new Date("2024-03-23T11:00:00"),
    status: "cancelled",
    type: "virtual",
    property: mockProperty,
    agent: {
      id: 1,
      name: "Sarah Martin",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      contact: {
        phone: "+212 6XX XXX XXX",
        email: "sarah.martin@example.com"
      },
      location: "Casablanca",
      type: "agent",
      rating: 4.8,
      totalReviews: 124,
      activeProperties: 15,
      completedLives: 45,
      scheduledLives: 3,
      soldProperties: 89,
      company: "Livimmo",
      companyLogo: "/livimmo-icon.svg",
      verified: true,
      specialties: ["Résidentiel", "Luxe"]
    },
    visitor: {
      name: "Karim Benjelloun",
      email: "k.benjelloun@example.com",
      phone: "+212 6XX XXX XXX"
    },
    notes: "Annulé pour cause personnelle"
  },
  {
    id: 5,
    date: new Date("2024-03-24T16:00:00"),
    status: "pending",
    type: "physical",
    property: mockProperty,
    agent: {
      id: 2,
      name: "Mohammed Alami",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      contact: {
        phone: "+212 6XX XXX XXX",
        email: "m.alami@example.com"
      },
      location: "Rabat",
      type: "agent",
      rating: 4.9,
      totalReviews: 156,
      activeProperties: 12,
      completedLives: 38,
      scheduledLives: 2,
      soldProperties: 72,
      company: "Livimmo",
      companyLogo: "/livimmo-icon.svg",
      verified: true,
      specialties: ["Commercial", "Bureau"]
    },
    visitor: {
      name: "Laura Martinez",
      email: "l.martinez@example.com",
      phone: "+212 6XX XXX XXX"
    },
    notes: "Première visite programmée"
  }
];