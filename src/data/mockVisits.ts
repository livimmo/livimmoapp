import { Visit } from "@/types/visit";
import { mockProperty } from "./mockProperties";

export const mockVisits: Visit[] = [
  {
    id: 1,
    propertyId: mockProperty.id,
    propertyTitle: mockProperty.title,
    propertyImage: mockProperty.images[0],
    propertyLocation: mockProperty.location,
    date: new Date("2024-03-20T14:00:00"),
    time: "14:00",
    status: "pending",
    type: "physical",
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
      verified: true,
      specialties: ["Résidentiel", "Luxe"],
      description: "Expert immobilier avec plus de 10 ans d'expérience"
    },
    visitor: {
      name: "Mohamed Alami",
      email: "m.alami@example.com",
      phone: "+212 6XX XXX XXX"
    }
  },
  {
    id: 2,
    propertyId: mockProperty.id,
    propertyTitle: mockProperty.title,
    propertyImage: mockProperty.images[0],
    propertyLocation: mockProperty.location,
    date: new Date("2024-03-21T10:00:00"),
    time: "10:00",
    status: "confirmed",
    type: "virtual",
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
      verified: true,
      specialties: ["Commercial", "Bureau"],
      description: "Expert en immobilier commercial"
    },
    visitor: {
      name: "Sophia Chen",
      email: "s.chen@example.com",
      phone: "+212 6XX XXX XXX"
    }
  }
];