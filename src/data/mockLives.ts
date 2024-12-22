import { LiveEvent } from "@/types/live";

export const mockLives: LiveEvent[] = [
  {
    id: 1,
    title: "Visite Villa Moderne",
    description: "Découvrez cette magnifique villa contemporaine",
    thumbnail: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    agent: "John Doe",
    location: "Casablanca",
    neighborhood: "Californie",
    type: "Villa",
    price: "4,500,000 DH",
    date: new Date("2024-01-15T14:00:00"),
    availableSeats: 20,
    viewers: 0,
    status: "scheduled",
    tags: ["Nouveauté", "Coup de cœur"]
  },
  {
    id: 2,
    title: "Visite Appartement Luxe",
    description: "Explorez cet appartement de luxe avec vue sur mer",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    agent: "Alice Smith",
    location: "Tanger",
    neighborhood: "Malabata",
    type: "Appartement",
    price: "3,200,000 DH",
    date: new Date("2024-02-10T14:00:00"),
    availableSeats: 15,
    viewers: 0,
    status: "scheduled",
    tags: ["Luxe", "Vue mer"]
  },
  {
    id: 3,
    title: "Visite Riad Traditionnel",
    description: "Venez découvrir ce riad traditionnel au cœur de Marrakech",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    agent: "Mohammed Ali",
    location: "Marrakech",
    neighborhood: "Médina",
    type: "Riad",
    price: "2,800,000 DH",
    date: new Date("2024-03-05T14:00:00"),
    availableSeats: 10,
    viewers: 0,
    status: "scheduled",
    tags: ["Traditionnel", "Médina"]
  },
  {
    id: 4,
    title: "Visite Bureau Moderne",
    description: "Découvrez ce bureau moderne au centre-ville de Casablanca",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    agent: "Sara Benali",
    location: "Casablanca",
    neighborhood: "Triangle d'Or",
    type: "Bureau",
    price: "1,800,000 DH",
    date: new Date("2024-04-20T14:00:00"),
    availableSeats: 25,
    viewers: 0,
    status: "scheduled",
    tags: ["Moderne", "Centre-ville"]
  },
  {
    id: 5,
    title: "Visite Villa de Luxe",
    description: "Profitez d'une visite de cette villa de luxe à Rabat",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    agent: "Fatima Zahra",
    location: "Rabat",
    neighborhood: "Hay Riad",
    type: "Villa",
    price: "5,500,000 DH",
    date: new Date("2024-05-15T14:00:00"),
    availableSeats: 30,
    viewers: 0,
    status: "scheduled",
    tags: ["Luxe", "Rabat"]
  }
];

// Create replay lives from existing mock lives
export const replayLives: LiveEvent[] = mockLives.map((live, index) => ({
  ...live,
  id: live.id + 100, // Ensure unique IDs
  status: "replay",
  viewers: Math.floor(Math.random() * 100) + 50
}));

// Create live streams from existing mock lives
export const liveStreams: LiveEvent[] = mockLives.map((live, index) => ({
  ...live,
  id: live.id + 200, // Ensure unique IDs
  status: "live",
  viewers: Math.floor(Math.random() * 20) + 5
}));

// Create scheduled lives from existing mock lives
export const scheduledLives: LiveEvent[] = mockLives.map((live, index) => ({
  ...live,
  id: live.id + 300, // Ensure unique IDs
  status: "scheduled",
  viewers: 0
}));