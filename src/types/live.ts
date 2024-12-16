export interface LiveEvent {
  id: number;
  title: string;
  description?: string;
  thumbnail: string;
  agent: string;
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