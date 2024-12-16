export interface LiveEvent {
  id: number;
  title: string;
  description?: string;
  thumbnail: string;
  agent: string;
  location: string;
  type: string;
  price: string;
  status: 'scheduled' | 'live' | 'ended';
  startTime?: string;
  endTime?: string;
  viewers?: number;
  duration?: number;
  viewCount?: number;
  propertyId?: number;
}

export interface LiveStreamConfig {
  title: string;
  propertyId: number;
  estimatedDuration: number;
  autoRecord: boolean;
}