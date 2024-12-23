import { type Profile } from "@/types/database/profile";
import { type Property } from "@/types/property";

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
  property?: {
    title: string;
    location: string;
    image: string;
    agent: Profile;
  };
  visitor?: {
    id: string;
    name: string;
    avatar: string;
  };
}