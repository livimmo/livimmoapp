export type VisitStatus = "pending" | "confirmed" | "ongoing" | "completed" | "cancelled";
export type VisitType = "physical" | "remote" | "virtual";

export interface Visitor {
  name: string;
  phone: string;
  email: string;
  message?: string;
}

export interface Visit {
  id: number;
  propertyId: number;
  propertyTitle: string;
  propertyImage: string;
  propertyLocation: string;
  date: Date;
  time: string;
  status: VisitStatus;
  type: VisitType;
  agent: Agent;
  visitor: Visitor;
  isLive?: boolean;
  liveUrl?: string;
}