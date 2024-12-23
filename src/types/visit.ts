import { type Profile } from "./database/profile";
import { type Property } from "./property";

export interface Visit {
  id: string;
  property_id: string;
  visitor_id: string;
  type: string | null;
  date: string;
  time: string | null;
  status: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  property?: Property;
  visitor?: Profile;
}