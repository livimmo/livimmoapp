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
    id?: string;
    name: string;
    image: string;
    phone: string;
    email: string;
    rating?: number;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  isLiveNow?: boolean;
  viewers?: number;
  remainingSeats?: number;
  isUserRegistered?: boolean;
  tags?: string[];
}