import { Visit } from "@/types/visit";

export const mockVisits: Visit[] = [
  {
    id: 1,
    propertyId: 1,
    propertyTitle: "Villa moderne à Casablanca",
    propertyImage: "/placeholder.svg",
    propertyLocation: "Casablanca, Californie",
    date: new Date("2024-04-20"),
    time: "14:00",
    status: "pending",
    type: "physical",
    agent: {
      id: 1,
      name: "Sarah Martin",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      phone: "+212 6XX XXX XXX",
      email: "sarah.martin@example.com"
    },
    visitor: {
      name: "Mohamed Alami",
      phone: "+212 6XX XXX XXX",
      email: "m.alami@example.com",
      message: "Je suis intéressé par l'achat de cette villa pour ma famille"
    }
  },
  {
    id: 2,
    propertyId: 2,
    propertyTitle: "Appartement vue mer à Tanger",
    propertyImage: "/placeholder.svg",
    propertyLocation: "Tanger, Malabata",
    date: new Date("2024-04-21"),
    time: "16:30",
    status: "confirmed",
    type: "remote",
    agent: {
      id: 2,
      name: "Mohammed Alami",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      phone: "+212 6XX XXX XXX",
      email: "m.alami@example.com"
    },
    visitor: {
      name: "Sophia Chen",
      phone: "+1 XXX XXX XXXX",
      email: "sophia.c@example.com",
      message: "Je cherche à louer un appartement avec vue sur mer pour 1 an"
    }
  },
  {
    id: 3,
    propertyId: 3,
    propertyTitle: "Duplex au centre de Rabat",
    propertyImage: "/placeholder.svg",
    propertyLocation: "Rabat, Agdal",
    date: new Date("2024-04-22"),
    time: "10:00",
    status: "completed",
    type: "physical",
    agent: {
      id: 3,
      name: "Yasmine Idrissi",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
      phone: "+212 6XX XXX XXX",
      email: "yasmine.idrissi@example.com"
    },
    visitor: {
      name: "John Smith",
      phone: "+44 XXX XXX XXXX", 
      email: "john.s@example.com",
      message: "Je suis un investisseur étranger intéressé par l'achat de ce duplex"
    }
  },
  {
    id: 4,
    propertyId: 1,
    propertyTitle: "Villa moderne à Casablanca",
    propertyImage: "/placeholder.svg",
    propertyLocation: "Casablanca, Californie",
    date: new Date("2024-04-23"),
    time: "11:30",
    status: "pending",
    type: "physical",
    agent: {
      id: 1,
      name: "Sarah Martin",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      phone: "+212 6XX XXX XXX",
      email: "sarah.martin@example.com"
    },
    visitor: {
      name: "Karim Benjelloun",
      phone: "+212 6XX XXX XXX",
      email: "k.benjelloun@example.com",
      message: "Je souhaite visiter la villa pour une potentielle location longue durée"
    }
  },
  {
    id: 5,
    propertyId: 2,
    propertyTitle: "Appartement vue mer à Tanger",
    propertyImage: "/placeholder.svg",
    propertyLocation: "Tanger, Malabata",
    date: new Date("2024-04-24"),
    time: "15:00",
    status: "confirmed",
    type: "remote",
    agent: {
      id: 2,
      name: "Mohammed Alami",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      phone: "+212 6XX XXX XXX",
      email: "m.alami@example.com"
    },
    visitor: {
      name: "Laura Martinez",
      phone: "+34 XXX XXX XXX",
      email: "laura.m@example.com",
      message: "Je cherche un pied-à-terre à Tanger pour les vacances"
    }
  }
];