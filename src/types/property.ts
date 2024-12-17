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
  isReplay?: boolean;
  liveDate?: Date;
  agent: {
    id?: number;
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
  viewers?: number;
  isLiveNow?: boolean;
  remainingSeats?: number;
  isUserRegistered?: boolean;
  transactionType: "Vente" | "Location";
  tags?: string[];
}