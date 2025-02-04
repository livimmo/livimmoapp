export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

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
  status: 'available' | 'pending' | 'sold' | 'rented';
  created_at: string;
  updated_at: string;
  agent_id: string | null;
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
  } | null;
  private_notes: {
    ownerName?: string;
    location?: string;
    notes?: string;
  } | null;
  viewers?: number;
  is_live_now?: boolean;
  remaining_seats?: number;
  is_user_registered?: boolean;
  tags?: string[];
}

export interface Database {
  public: {
    Tables: {
      properties: {
        Row: Property;
        Insert: Omit<Property, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Property, 'id'>>;
      };
    };
  };
}