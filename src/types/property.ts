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
  offers?: number; // Nombre d'offres reçues
  agent: {
    name: string;
    image: string;
    phone: string;
    email: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}