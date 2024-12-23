import { LiveEvent } from "@/types/live";
import { getRandomTags } from "@/utils/propertyTags";

export const scheduledLives: LiveEvent[] = [
  {
    id: 4,
    title: "Riad Traditionnel",
    date: new Date(Date.now() + 86400000),
    type: "Riad",
    location: "Marrakech, Médina",
    agent: "Yasmine Benali",
    availableSeats: 45,
    thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
    price: "4,500,000 MAD",
    description: "Riad authentique avec architecture traditionnelle",
    viewers: 0,
    status: "scheduled",
    tags: getRandomTags()
  },
  {
    id: 5,
    title: "Villa Contemporaine",
    date: new Date(Date.now() + 172800000),
    type: "Villa",
    location: "Rabat, Hay Riad",
    agent: "Adam Tazi",
    availableSeats: 20,
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    price: "5,900,000 MAD",
    description: "Villa contemporaine avec design unique",
    viewers: 0,
    status: "scheduled",
    tags: getRandomTags()
  }
];