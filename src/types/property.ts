export interface Property {
  id: string | number;
  title: string;
  price: number;
  location: string;
  type: string;
  surface: number;
  rooms: number;
  bathrooms?: number;
  description: string;
  features: string[];
  images: string[];
  hasLive?: boolean;
  liveDate?: Date;
  agent: {
    id?: number;
    name: string;
    image: string;
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
  transactionType?: string;
  virtualTour?: boolean;
  owner?: string;
}