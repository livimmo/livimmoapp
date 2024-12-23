import { type Profile } from "./database/profile";

export interface Visit {
  id: string;
  property_id: string;
  visitor_id: string;
  type: string | null;
  date: string | null;
  time: string | null;
  status: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  property: {
    title: string;
    location: string;
    image: string;
    agent: Profile;
  };
  visitor: {
    id: string;
    name: string;
    avatar: string;
  };
}