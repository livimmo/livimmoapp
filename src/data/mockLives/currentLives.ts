import { LiveEvent } from "@/types/live";
import { getRandomTags } from "@/utils/propertyTags";

export const currentLives: LiveEvent[] = [
  {
    id: 1,
    title: "Villa Moderne avec Piscine",
    date: new Date(),
    type: "Villa",
    location: "Marrakech, Guéliz",
    agent: "Sarah Martin",
    availableSeats: 35,
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    price: "2,500,000 MAD",
    description: "Magnifique villa moderne avec piscine et jardin paysager",
    viewers: 25,
    status: "live",
    tags: getRandomTags()
  },
  {
    id: 2,
    title: "Appartement Vue Mer",
    date: new Date(),
    type: "Appartement",
    location: "Tanger, Malabata",
    agent: "Mohammed Alami",
    availableSeats: 30,
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    price: "1,800,000 MAD",
    description: "Superbe appartement avec vue imprenable sur la mer",
    viewers: 28,
    status: "live",
    tags: getRandomTags()
  },
  {
    id: 3,
    title: "Penthouse Luxueux",
    date: new Date(),
    type: "Appartement",
    location: "Casablanca, Ain Diab",
    agent: "Karim Hassan",
    availableSeats: 40,
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    price: "3,200,000 MAD",
    description: "Penthouse de luxe avec terrasse panoramique",
    viewers: 42,
    status: "live",
    tags: getRandomTags()
  }
];