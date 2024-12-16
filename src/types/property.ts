export interface Property {
  id: number;
  title: string;
  type: string;
  price: number;
  location: string;
  surface: number;
  rooms: number;
  bathrooms: number;
  description: string;
  features: string[];
  images: string[];
  hasLive?: boolean;
  liveDate?: Date;
  isLiveNow?: boolean;
  viewers?: number;
  remainingSeats?: number;
  tags?: string[];
  offers?: number;
  agent: {
    id: string;
    name: string;
    image: string;
    phone: string;
    email: string;
    isVerified?: boolean;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}