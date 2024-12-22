export interface BaseLive {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  agent: string;
  location: string;
  neighborhood?: string;
  type: string;
  price: string;
  date: Date;
  availableSeats: number;
  tags?: string[];
  viewers?: number;
}

export interface CurrentLive extends BaseLive {
  status: "live";
}

export interface ScheduledLive extends BaseLive {
  status: "scheduled";
}

export interface ReplayLive extends BaseLive {
  status: "replay";
  viewers: number;
}

export type LiveEvent = CurrentLive | ScheduledLive | ReplayLive;