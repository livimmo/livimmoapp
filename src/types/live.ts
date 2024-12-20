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
  viewers: number;
  tags?: string[];
}

export interface LiveStream extends BaseLive {
  status: 'live';
}

export interface ScheduledLive extends BaseLive {
  status: 'scheduled';
}

export interface ReplayLive extends BaseLive {
  status: 'replay';
}

export type LiveEvent = LiveStream | ScheduledLive | ReplayLive;