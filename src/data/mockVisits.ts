import { type Visit } from "@/types/database";

export const mockVisits: Visit[] = [
  {
    id: "1",
    property_id: "1",
    visitor_id: "user1",
    type: "physical",
    date: new Date("2024-03-20").toISOString(),
    time: "14:00",
    status: "pending",
    notes: "First visit to the property",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "2",
    property_id: "2",
    visitor_id: "user2",
    type: "virtual",
    date: new Date("2024-03-21").toISOString(),
    time: "15:30",
    status: "confirmed",
    notes: "Virtual tour of the apartment",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];