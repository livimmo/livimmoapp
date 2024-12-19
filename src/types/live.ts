export interface LiveEvent {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  agent: string;
  agentId?: number;
  location: string;
  type: string;
  price: string;
  status: "live" | "replay" | "scheduled";
  date: Date;
  availableSeats: number;
  viewers: number;
  tags?: string[];
}