import { Agent } from "./agent";

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
  agent: Agent;
  hasLive: boolean;
  liveDate?: Date;
  isLiveNow?: boolean;
  viewers?: number;
  remainingSeats?: number;
  isUserRegistered?: boolean;
  tags?: string[];
  virtualTour?: {
    enabled: boolean;
    type: "360" | "video";
    url?: string;
    platform?: string;
    floorPlan?: {
      url: string;
      rooms: {
        id: string;
        name: string;
        area: number;
        coordinates: {
          x: number;
          y: number;
        };
      }[];
    };
    statistics?: {
      views: number;
      likes: number;
      shares: number;
      totalVisits?: number;
      averageTime?: number;
      popularRooms?: {
        name: string;
        visits: number;
      }[];
      lastVisits?: {
        date: string;
        duration: string;
      }[];
    };
  };
  transactionType: TransactionType;
  status?: PropertyStatus;
  createdAt?: Date;
  updatedAt?: Date;
  ownerId?: string;
  privateNotes?: {
    ownerName?: string;
    location?: string;
    notes?: string;
  };
  isReplay?: boolean;
}