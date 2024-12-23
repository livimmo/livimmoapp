import { Property } from "@/types/property";
import { mockAgents } from "./mockAgents";

export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Villa moderne avec piscine",
    price: 2500000,
    location: "Casablanca, Anfa",
    type: "Villa",
    surface: 350,
    rooms: 5,
    bathrooms: 3,
    description: "Magnifique villa moderne avec piscine et jardin",
    features: ["Piscine", "Jardin", "Garage"],
    images: ["/placeholder.svg"],
    coordinates: {
      lat: 33.5731,
      lng: -7.6298
    },
    agent: mockAgents[0],
    hasLive: true,
    transactionType: "Vente",
    status: "available"
  },
  {
    id: "2",
    title: "Appartement de luxe",
    price: 1500000,
    location: "Marrakech, Gueliz",
    type: "Appartement",
    surface: 120,
    rooms: 3,
    bathrooms: 2,
    description: "Appartement de luxe au cœur de Marrakech",
    features: ["Balcon", "Vue sur la ville"],
    images: ["/placeholder.svg"],
    coordinates: {
      lat: 31.6342,
      lng: -8.0079
    },
    agent: mockAgents[1],
    hasLive: false,
    transactionType: "Vente",
    status: "available"
  },
  {
    id: "3",
    title: "Terrain à bâtir",
    price: 800000,
    location: "Rabat, Hay Riad",
    type: "Terrain",
    surface: 500,
    rooms: 0,
    bathrooms: 0,
    description: "Terrain idéal pour construction",
    features: ["Proche des commodités"],
    images: ["/placeholder.svg"],
    coordinates: {
      lat: 34.0209,
      lng: -6.8416
    },
    agent: mockAgents[2],
    hasLive: false,
    transactionType: "Vente",
    status: "available"
  },
  {
    id: "4",
    title: "Maison traditionnelle",
    price: 1200000,
    location: "Fès, Médina",
    type: "Maison",
    surface: 200,
    rooms: 4,
    bathrooms: 2,
    description: "Charmante maison traditionnelle dans la médina de Fès",
    features: ["Patio", "Proche des souks"],
    images: ["/placeholder.svg"],
    coordinates: {
      lat: 34.0594,
      lng: -5.0094
    },
    agent: mockAgents[0],
    hasLive: true,
    transactionType: "Vente",
    status: "available"
  },
  {
    id: "5",
    title: "Bureau à louer",
    price: 5000,
    location: "Casablanca, Centre-ville",
    type: "Bureau",
    surface: 80,
    rooms: 1,
    bathrooms: 1,
    description: "Bureau moderne à louer dans le centre de Casablanca",
    features: ["Climatisation", "Internet inclus"],
    images: ["/placeholder.svg"],
    coordinates: {
      lat: 33.5731,
      lng: -7.5898
    },
    agent: mockAgents[1],
    hasLive: false,
    transactionType: "Location",
    status: "available"
  }
];
