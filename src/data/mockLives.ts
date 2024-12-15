import { LiveEvent } from "@/types/live";

export const liveStreams: LiveEvent[] = [
  {
    id: 1,
    title: "Visite Villa Moderne",
    date: new Date(),
    type: "Villa",
    location: "Marrakech",
    agent: "Sarah Martin",
    availableSeats: 35,
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    price: "2,500,000 MAD",
    description: "Magnifique villa moderne avec piscine",
    viewers: 25,
    status: "live",
    tags: ["Nouveauté"]
  },
  {
    id: 2,
    title: "Appartement Vue Mer",
    date: new Date(),
    type: "Appartement",
    location: "Tanger",
    agent: "Mohammed Alami",
    availableSeats: 30,
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    price: "1,800,000 MAD",
    viewers: 28,
    status: "live",
    tags: ["Nouveauté", "Exclusivité"]
  },
  {
    id: 3,
    title: "Penthouse Luxueux",
    date: new Date(),
    type: "Appartement",
    location: "Casablanca",
    agent: "Karim Hassan",
    availableSeats: 40,
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    price: "3,200,000 MAD",
    viewers: 42,
    status: "live",
    tags: ["Exclusivité"]
  },
  {
    id: 4,
    title: "Riad Traditionnel",
    date: new Date(),
    type: "Riad",
    location: "Marrakech",
    agent: "Yasmine Benali",
    availableSeats: 45,
    thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
    price: "4,500,000 MAD",
    viewers: 56,
    status: "live",
    tags: ["Coup de fusil", "Nouveauté"]
  },
];

export const scheduledLives: LiveEvent[] = [
  {
    id: 1,
    title: "Villa Moderne avec Piscine",
    date: new Date(Date.now() + 86400000), // Tomorrow
    type: "Villa",
    location: "Marrakech",
    agent: "Sarah Martin",
    availableSeats: 15,
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    price: "2,500,000 MAD",
    description: "Magnifique villa moderne avec piscine et jardin paysager"
  },
  {
    id: 2,
    title: "Appartement Vue Mer",
    date: new Date(Date.now() + 86400000), // Tomorrow (same day)
    type: "Appartement",
    location: "Tanger",
    agent: "Mohammed Alami",
    availableSeats: 10,
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    price: "1,800,000 MAD",
    description: "Superbe appartement avec vue imprenable sur la mer"
  },
  {
    id: 3,
    title: "Penthouse Luxueux",
    date: new Date(Date.now() + 172800000), // Day after tomorrow
    type: "Appartement",
    location: "Casablanca",
    agent: "Karim Hassan",
    availableSeats: 8,
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    price: "3,200,000 MAD",
    description: "Penthouse de luxe avec terrasse panoramique"
  },
  {
    id: 4,
    title: "Riad Traditionnel",
    date: new Date(Date.now() + 172800000), // Day after tomorrow (same day)
    type: "Riad",
    location: "Marrakech",
    agent: "Yasmine Benali",
    availableSeats: 12,
    thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
    price: "4,500,000 MAD",
    description: "Riad authentique au cœur de la médina"
  },
  {
    id: 5,
    title: "Villa Contemporaine",
    date: new Date(Date.now() + 259200000), // In 3 days
    type: "Villa",
    location: "Rabat",
    agent: "Adam Tazi",
    availableSeats: 20,
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    price: "5,900,000 MAD",
    description: "Villa contemporaine avec design unique"
  },
  {
    id: 6,
    title: "Duplex avec Terrasse",
    date: new Date(Date.now() + 259200000), // In 3 days (same day)
    type: "Appartement",
    location: "Casablanca",
    agent: "Leila Amrani",
    availableSeats: 15,
    thumbnail: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    price: "2,100,000 MAD",
    description: "Magnifique duplex avec grande terrasse aménagée"
  },
  {
    id: 7,
    title: "Maison de Campagne",
    date: new Date(Date.now() + 345600000), // In 4 days
    type: "Villa",
    location: "Ifrane",
    agent: "Omar Bennis",
    availableSeats: 10,
    thumbnail: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
    price: "3,800,000 MAD",
    description: "Charmante maison de campagne avec vue sur la forêt"
  }
];
