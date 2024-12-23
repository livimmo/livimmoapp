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
  virtualTour?: {
    enabled: boolean;
    type: "360" | "video";
    url?: string;
    statistics?: {
      views: number;
      likes: number;
      shares: number;
      totalVisits?: number;
      averageTime?: number;
      popularRooms?: string[];
      lastVisits?: Date[];
    };
  };
  transactionType: TransactionType;
  status?: PropertyStatus;
  createdAt?: Date;
  updatedAt?: Date;
  ownerId?: string;
  privateNotes?: string;
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
}