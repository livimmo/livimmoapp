export interface Visit {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  propertyLocation: string;
  date: Date;
  time: string;
  status: "pending" | "confirmed" | "ongoing" | "completed" | "cancelled";
  agentId: string;
  agentName: string;
  agentImage: string;
  agentPhone: string;
  agentEmail: string;
}