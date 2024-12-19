export type VisitStatus = "pending" | "confirmed" | "ongoing" | "completed" | "cancelled";

export interface Visit {
  id: number;
  propertyId: number;
  propertyTitle: string;
  propertyImage: string;
  propertyLocation: string;
  date: Date;
  time: string;
  status: VisitStatus;
  agent: {
    id: number;
    name: string;
    image: string;
    phone: string;
    email: string;
  };
  isLive?: boolean;
  liveUrl?: string;
}