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
  hasLive: boolean;
  liveDate?: Date;
  isLiveNow?: boolean;
  viewers?: number;
  remainingSeats?: number;
  isUserRegistered?: boolean;
  tags?: string[];
  isReplay?: boolean;
  agent: Agent;
  coordinates: {
    lat: number;
    lng: number;
  };
  ownerId?: string;
  transactionType: TransactionType;
  status?: PropertyStatus;
  virtualTour?: {
    enabled: boolean;
    type: "360" | "video";
    url?: string;
    platform?: string;
    floorPlan?: {
      url: string;
      rooms: Array<{
        id: string;
        name: string;
        area: number;
        coordinates: { x: number; y: number };
      }>;
    };
    statistics?: {
      totalVisits: number;
      averageTime: string;
      popularRooms: Array<{ name: string; visits: number }>;
      lastVisits: Array<{ date: string; duration: string }>;
    };
  };
  privateNotes?: {
    ownerName?: string;
    location?: string;
    notes?: string;
  };
}