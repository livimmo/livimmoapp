export interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  type: string;
  surface: number;
  rooms: number;
  bathrooms: number;
  description: string;
  features: string[];
  images: string[];
  hasLive?: boolean;
  liveDate?: Date;
  agent: {
    id?: string | number;
    name: string;
    image: string;
    phone: string;
    email: string;
    company?: string;
    verified?: boolean;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  isLiveNow?: boolean;
  viewers?: number;
  remainingSeats?: number;
  transactionType: string;
  virtualTour?: {
    enabled: boolean;
    url?: string;
  };
  owner?: {
    id: number;
    name: string;
  };
  privateNotes?: string;
  tags?: string[];
  isReplay?: boolean;
}