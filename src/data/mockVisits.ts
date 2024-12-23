import { type Visit } from "@/types/database";

export const mockVisits: Visit[] = [
  {
    id: "1",
    property_id: "1",
    visitor_id: "1",
    type: "physical",
    date: new Date().toISOString(),
    time: "14:00",
    status: "pending",
    notes: "First visit",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];