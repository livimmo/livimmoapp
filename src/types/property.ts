import { type Agent } from "./agent";

export type PropertyStatus = "available" | "pending" | "sold" | "rented" | "en_cours";

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
  agent: Agent;
  hasLive?: boolean;
  liveDate?: Date;
  transactionType: "Vente" | "Location";
  status?: PropertyStatus;
  isLiveNow?: boolean;
  remainingSeats?: number;
  viewers?: number;
  isReplay?: boolean;
  tags?: string[];
  ownerId?: string;
  privateNotes?: {
    ownerName?: string;
    location?: string;
    notes?: string;
  };
  virtualTour?: {
    enabled: boolean;
    url?: string;
    platform?: string;
    type?: string;
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
}