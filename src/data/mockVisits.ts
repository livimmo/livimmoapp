import { Visit } from "@/types/visit";

export const mockVisits: Visit[] = [
  {
    id: "1",
    propertyId: "prop1",
    propertyTitle: "Villa moderne à Casablanca",
    propertyImage: "/placeholder.svg",
    propertyLocation: "Casablanca, Californie",
    date: new Date(),
    time: "14:00",
    status: "pending",
    agentId: "agent1",
    agentName: "Sarah Martin",
    agentImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    agentPhone: "+212 6XX XXX XXX",
    agentEmail: "sarah.martin@example.com"
  },
  {
    id: "2",
    propertyId: "prop2",
    propertyTitle: "Appartement vue mer à Tanger",
    propertyImage: "/placeholder.svg",
    propertyLocation: "Tanger, Malabata",
    date: new Date(),
    time: "16:30",
    status: "confirmed",
    agentId: "agent2",
    agentName: "Mohammed Alami",
    agentImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    agentPhone: "+212 6XX XXX XXX",
    agentEmail: "m.alami@example.com"
  },
  {
    id: "3",
    propertyId: "prop3",
    propertyTitle: "Duplex au centre de Rabat",
    propertyImage: "/placeholder.svg",
    propertyLocation: "Rabat, Agdal",
    date: new Date(),
    time: "10:00",
    status: "completed",
    agentId: "agent3",
    agentName: "Yasmine Idrissi",
    agentImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
    agentPhone: "+212 6XX XXX XXX",
    agentEmail: "yasmine.idrissi@example.com"
  }
];