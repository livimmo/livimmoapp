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
}