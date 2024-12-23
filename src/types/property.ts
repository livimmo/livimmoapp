import { type Agent } from "./agent";

export type PropertyStatus = "available" | "pending" | "sold" | "rented";
export type TransactionType = "Vente" | "Location";

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
  coordinates: {
    lat: number;
    lng: number;
  };
  hasLive?: boolean;
  isLiveNow?: boolean;
  liveDate?: Date;
  viewers?: number;
  remainingSeats?: number;
  isUserRegistered?: boolean;
  agent: Agent;
  virtualTour?: {
    enabled: boolean;
    type: "360" | "video";
  };
  status?: PropertyStatus;
  transactionType: TransactionType;
}