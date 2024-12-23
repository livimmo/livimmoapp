import { LiveEvent } from "@/types/live";
import { getRandomTags } from "@/utils/propertyTags";

export const replayLives: LiveEvent[] = [
  {
    id: 6,
    title: "Visite Villa de Luxe",
    date: new Date(Date.now() - 86400000),
    type: "Villa",
    location: "Marrakech, Palmeraie",
    agent: "Sarah Martin",
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    price: "5,500,000 MAD",
    description: "Magnifique villa de luxe avec piscine et jardin",
    viewers: 150,
    status: "replay",
    availableSeats: 0,
    tags: getRandomTags()
  },
  {
    id: 7,
    title: "Appartement Vue Océan",
    date: new Date(Date.now() - 172800000),
    type: "Appartement",
    location: "Casablanca, Ain Diab",
    agent: "Mohammed Alami",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    price: "2,800,000 MAD",
    description: "Superbe appartement avec vue panoramique sur l'océan",
    viewers: 98,
    status: "replay",
    availableSeats: 0,
    tags: getRandomTags()
  }
];