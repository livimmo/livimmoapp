import { Agent } from "./agent";

export type PropertyStatus = "available" | "pending" | "sold" | "rented" | "en_cours";
export type TransactionType = "Vente" | "Location";

export interface Property {
  id: string;  // Changed from number to string
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
  coordinates: {
    lat: number;
    lng: number;
  };
  agent: Agent;
  hasLive: boolean;
  liveDate?: Date;
  isLiveNow?: boolean;
  viewers?: number;
  remainingSeats?: number;
  isUserRegistered?: boolean;
  tags?: string[];
  isReplay?: boolean;
  virtualTour?: {
    enabled: boolean;
    type: "360" | "video";
    url?: string;
    platform?: string;
  };
  transactionType: TransactionType;
  status?: PropertyStatus;
}