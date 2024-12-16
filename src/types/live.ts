export interface LiveEvent {
  id: number;
  title: string;
  description?: string;
  thumbnail: string;
  agent: string;
  agentId?: number;
  location: string;
  type: string;
  price: string;
  status: 'scheduled' | 'live' | 'ended' | 'replay';
  startTime?: string;
  endTime?: string;
  viewers?: number;
  duration?: number;
  viewCount?: number;
  propertyId?: number;
  date: Date;
  availableSeats: number;
  tags?: string[];
}

export interface LiveStreamConfig {
  title: string;
  propertyId: number;
  estimatedDuration: number;
  autoRecord: boolean;
}

export interface LiveStreamProps {
  videoId: string;
  currentLiveId: number;
  otherLives: any[];
  onLiveChange?: (liveId: number) => void;
  isReplay?: boolean;
}

export const replayTimestamps = [
  'VIQpb65HmMs',
  'VIQpb65HmMs?start=300',
  'VIQpb65HmMs?start=600',
  'VIQpb65HmMs?start=900',
  'VIQpb65HmMs?start=1200',
];
