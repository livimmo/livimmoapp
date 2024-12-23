export interface Visit {
  id: string;
  property_id: string;
  visitor_id: string;
  type: string;
  date: string;
  time: string;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}