import { Agent } from "./agent";

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
  hasLive: boolean;
  agent: Agent;
  coordinates: {
    lat: number;
    lng: number;
  };
  transactionType: "Vente" | "Location";
  status?: PropertyStatus;
  tags?: string[];
  virtualTour?: {
    enabled: boolean;
    url?: string;
    platform?: 'matterport' | 'other';
    type?: "360" | "3d";
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
  isLiveNow?: boolean;
  viewers?: number;
  remainingSeats?: number;
  liveDate?: Date;
  isReplay?: boolean;
  ownerId?: string;
  privateNotes?: {
    ownerName?: string;
    location?: string;
    notes?: string;
  };
  offers?: number;
}

export interface PropertyCardProps {
  property: Property;
}