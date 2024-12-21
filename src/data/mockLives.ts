import { LiveEvent } from "@/types/live";

export const liveStreams: LiveEvent[] = [
  {
    id: 1,
    title: "Visite Villa Moderne",
    date: new Date(),
    type: "Villa",
    location: "Marrakech",
    neighborhood: "Guéliz",
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
    description: "Superbe appartement avec vue imprenable sur la mer",
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
    description: "Penthouse de luxe avec terrasse panoramique",
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
    description: "Riad authentique avec architecture traditionnelle",
    viewers: 56,
    status: "live",
    tags: ["Coup de fusil", "Nouveauté"]
  },
];

export const scheduledLives: LiveEvent[] = [
  {
    id: 1,
    title: "Villa Moderne avec Piscine",
    date: new Date(Date.now() + 86400000),
    type: "Villa",
    location: "Marrakech",
    neighborhood: "Hivernage",
    agent: "Sarah Martin",
    availableSeats: 15,
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    price: "2,500,000 MAD",
    description: "Magnifique villa moderne avec piscine et jardin paysager",
    status: "scheduled",
    viewers: 0
  },
  {
    id: 2,
    title: "Appartement Vue Mer",
    date: new Date(Date.now() + 86400000),
    type: "Appartement",
    location: "Tanger",
    neighborhood: "Malabata",
    agent: "Mohammed Alami",
    availableSeats: 10,
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    price: "1,800,000 MAD",
    description: "Superbe appartement avec vue imprenable sur la mer",
    status: "scheduled",
    viewers: 0
  },
  {
    id: 3,
    title: "Penthouse Luxueux",
    date: new Date(Date.now() + 172800000),
    type: "Appartement",
    location: "Casablanca",
    agent: "Karim Hassan",
    availableSeats: 8,
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    price: "3,200,000 MAD",
    description: "Penthouse de luxe avec terrasse panoramique",
    status: "scheduled",
    viewers: 0
  },
  {
    id: 4,
    title: "Riad Traditionnel",
    date: new Date(Date.now() + 172800000),
    type: "Riad",
    location: "Marrakech",
    agent: "Yasmine Benali",
    availableSeats: 12,
    thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
    price: "4,500,000 MAD",
    description: "Riad authentique au cœur de la médina",
    status: "scheduled",
    viewers: 0
  },
  {
    id: 5,
    title: "Villa Contemporaine",
    date: new Date(Date.now() + 259200000),
    type: "Villa",
    location: "Rabat",
    agent: "Adam Tazi",
    availableSeats: 20,
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    price: "5,900,000 MAD",
    description: "Villa contemporaine avec design unique",
    status: "scheduled",
    viewers: 0
  },
  {
    id: 6,
    title: "Duplex avec Terrasse",
    date: new Date(Date.now() + 259200000),
    type: "Appartement",
    location: "Casablanca",
    agent: "Leila Amrani",
    availableSeats: 15,
    thumbnail: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    price: "2,100,000 MAD",
    description: "Magnifique duplex avec grande terrasse aménagée",
    status: "scheduled",
    viewers: 0
  },
  {
    id: 7,
    title: "Maison de Campagne",
    date: new Date(Date.now() + 345600000),
    type: "Villa",
    location: "Ifrane",
    agent: "Omar Bennis",
    availableSeats: 10,
    thumbnail: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
    price: "3,800,000 MAD",
    description: "Charmante maison de campagne avec vue sur la forêt",
    status: "scheduled",
    viewers: 0
  }
];

export const replayLives: LiveEvent[] = [
  {
    id: 8,
    title: "Visite Villa de Luxe",
    date: new Date(Date.now() - 86400000), // yesterday
    type: "Villa",
    location: "Marrakech",
    neighborhood: "Palmeraie",
    agent: "Sarah Martin",
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    price: "5,500,000 MAD",
    description: "Magnifique villa de luxe avec piscine et jardin",
    viewers: 150,
    status: "replay",
    availableSeats: 0 // Ajout du champ manquant
  },
  {
    id: 9,
    title: "Appartement Vue Océan",
    date: new Date(Date.now() - 172800000), // 2 days ago
    type: "Appartement",
    location: "Casablanca",
    neighborhood: "Ain Diab",
    agent: "Mohammed Alami",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    price: "2,800,000 MAD",
    description: "Superbe appartement avec vue panoramique sur l'océan",
    viewers: 98,
    status: "replay",
    availableSeats: 0 // Ajout du champ manquant
  },
  {
    id: 10,
    title: "Riad Traditionnel Rénové",
    date: new Date(Date.now() - 259200000), // 3 days ago
    type: "Riad",
    location: "Marrakech",
    neighborhood: "Médina",
    agent: "Yasmine Idrissi",
    thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
    price: "3,200,000 MAD",
    description: "Riad authentique entièrement rénové avec matériaux traditionnels",
    viewers: 120,
    status: "replay",
    availableSeats: 0 // Ajout du champ manquant
  }
];