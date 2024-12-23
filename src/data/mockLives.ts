import { LiveEvent } from "@/types/live";

export const mockLives: LiveEvent[] = [
  {
    id: 1,
    title: "Villa moderne à Casablanca",
    description: "Découvrez cette magnifique villa avec piscine",
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    date: new Date("2024-01-15T15:00:00"),
    agent: "Sarah Alami",
    price: "2 500 000",
    location: "Casablanca, Californie",
    type: "Villa",
    status: "live",
    viewers: 45,
    availableSeats: 10
  },
  {
    id: 2,
    title: "Appartement spacieux à Marrakech",
    description: "Un appartement avec vue sur la médina",
    thumbnail: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    date: new Date("2024-01-20T18:00:00"),
    agent: "Mohamed Benali",
    price: "1 200 000",
    location: "Marrakech, Médina",
    type: "Appartement",
    status: "live",
    viewers: 30,
    availableSeats: 5
  },
  {
    id: 3,
    title: "Maison traditionnelle à Fès",
    description: "Une maison avec un charme authentique",
    thumbnail: "https://images.unsplash.com/photo-1518601009530-1b1c1c1c1c1c",
    date: new Date("2024-01-25T12:00:00"),
    agent: "Fatima Zahra",
    price: "800 000",
    location: "Fès, Médina",
    type: "Maison",
    status: "live",
    viewers: 20,
    availableSeats: 8
  },
  {
    id: 4,
    title: "Terrain à bâtir à Agadir",
    description: "Terrain idéal pour construire votre maison",
    thumbnail: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    date: new Date("2024-02-01T10:00:00"),
    agent: "Ali El Amrani",
    price: "500 000",
    location: "Agadir, Plage",
    type: "Terrain",
    status: "live",
    viewers: 15,
    availableSeats: 12
  },
  {
    id: 5,
    title: "Studio à Tanger",
    description: "Un studio moderne au cœur de la ville",
    thumbnail: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    date: new Date("2024-02-05T14:00:00"),
    agent: "Youssef El Idrissi",
    price: "600 000",
    location: "Tanger, Centre-ville",
    type: "Studio",
    status: "live",
    viewers: 25,
    availableSeats: 6
  },
];

export const replayLives: LiveEvent[] = mockLives.map(live => ({
  ...live,
  status: "replay",
  viewers: Math.floor(Math.random() * 100) + 50
}));

export const liveStreams: LiveEvent[] = mockLives.filter(live => live.status === "live");

export const scheduledLives: LiveEvent[] = mockLives.filter(live => live.status === "scheduled");
