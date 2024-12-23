import { Agent } from "./agent";

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  surface: number;
  rooms: number;
  bathrooms: number;
  description: string;
  features: string[];
  images: string[];
  hasLive: boolean;
  agent: Agent;
  coordinates: {
    lat: number;
    lng: number;
  };
  transactionType: "Vente" | "Location";
}