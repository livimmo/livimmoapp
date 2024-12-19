import { Visit } from "@/types/visit";

export const mockVisits: Visit[] = [
  {
    id: 1,
    propertyId: 1,
    propertyTitle: "Villa moderne à Casablanca",
    propertyImage: "/placeholder.svg",
    propertyLocation: "Casablanca, Californie",
    date: new Date(),
    time: "14:00",
    status: "pending",
    agent: {
      id: 1,
      name: "Sarah Martin",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      phone: "+212 6XX XXX XXX",
      email: "sarah.martin@example.com"
    }
  },
  {
    id: 2,
    propertyId: 2,
    propertyTitle: "Appartement vue mer à Tanger",
    propertyImage: "/placeholder.svg",
    propertyLocation: "Tanger, Malabata",
    date: new Date(),
    time: "16:30",
    status: "confirmed",
    agent: {
      id: 2,
      name: "Mohammed Alami",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      phone: "+212 6XX XXX XXX",
      email: "m.alami@example.com"
    }
  },
  {
    id: 3,
    propertyId: 3,
    propertyTitle: "Duplex au centre de Rabat",
    propertyImage: "/placeholder.svg",
    propertyLocation: "Rabat, Agdal",
    date: new Date(),
    time: "10:00",
    status: "completed",
    agent: {
      id: 3,
      name: "Yasmine Idrissi",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
      phone: "+212 6XX XXX XXX",
      email: "yasmine.idrissi@example.com"
    }
  }
];