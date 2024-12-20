export interface LiveStream {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  agent: string;
  location: string;
  type: string;
  price: string;
  status: "live";
  date: Date;
  availableSeats: number;
  viewers: number;
  tags?: string[];
}

export interface ScheduledLive {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  agent: string;
  location: string;
  type: string;
  price: string;
  status: "scheduled";
  date: Date;
  availableSeats: number;
  viewers: number;
  tags?: string[];
}

export interface LiveEvent extends LiveStream {
  status: "live" | "replay" | "scheduled";
}

export interface LiveStreamProps {
  videoId: string;
  currentLiveId: number;
  otherLives: LiveEvent[];
  onLiveChange: (liveId: number) => void;
  isReplay?: boolean;
}

export const replayTimestamps = [
  "dQw4w9WgXcQ",
  "jNQXAC9IVRw",
  "ZZ5LpwO-An4",
  "9bZkp7q19f0"
];