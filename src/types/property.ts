import { type Profile } from "@/types/database/profile";

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  surface: number;
  rooms: number;
  bathrooms: number;
  description: string | null;
  features: string[] | null;
  images: string[] | null;
  has_live: boolean;
  is_replay: boolean;
  has_scheduled_live: boolean;
  live_date: string | null;
  is_live_now: boolean;
  remaining_seats: number | null;
  viewers: number | null;
  coordinates: {
    lat: number;
    lng: number;
  } | null;
  transaction_type: string;
  virtual_tour: {
    enabled: boolean;
    url?: string;
    platform?: "matterport" | "klapty";
    type: "360" | "video" | "live";
    statistics?: {
      totalVisits: number;
      averageTime: string;
      popularRooms: Array<{ name: string; visits: number }>;
      lastVisits: Array<{ date: string; duration: string }>;
    };
  } | null;
  private_notes: {
    ownerName?: string;
    location?: string;
    notes?: string;
  } | null;
  agent_id: string | null;
  status: 'available' | 'pending' | 'sold' | 'rented';
  created_at: string;
  updated_at: string;
  tags: string[] | null;
}

export interface PropertyWithAgent extends Property {
  agent: Profile;
}