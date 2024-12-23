export type LiveStatus = "scheduled" | "live" | "replay" | "ended";

export interface LiveEvent {
  id: number;
  title: string;
  description?: string;
  thumbnail: string;
  date: Date;
  agent: string;
  price: string;
  location: string;
  type: string;
  status: LiveStatus;
  viewers?: number;
  availableSeats?: number;
  neighborhood?: string;
}

export type LiveStream = LiveEvent & {
  status: "live";
};

export type ScheduledLive = LiveEvent & {
  status: "scheduled";
};