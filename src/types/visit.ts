import { type Property } from "./property";
import { type Profile } from "./database/profile";

export interface Visit {
  id: string;
  property_id: string | null;
  visitor_id: string | null;
  type: string | null;
  date: string | null;
  time: string | null;
  status: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  property?: Property;
  visitor?: Profile;
}

export interface VisitWithDetails extends Visit {
  propertyTitle?: string;
  propertyImage?: string;
  propertyLocation?: string;
  agent?: Profile;
  isLive?: boolean;
  liveUrl?: string;
}