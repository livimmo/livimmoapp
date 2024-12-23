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
  isLiveNow?: boolean;
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
  remainingSeats?: number;
  transactionType: string;
  owner?: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  privateNotes?: string;
  tags?: string[];
  status?: "available" | "pending" | "sold" | "rented";
  createdAt?: Date;
}

export type PropertyStatus = "available" | "pending" | "sold" | "rented";