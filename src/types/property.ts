export interface Agent {
  id: string;
  name: string;
  avatar: string;
  image: string;
  phone: string;
  email: string;
  location: string;
  type: string;
  description?: string;
  company?: string;
  verified?: boolean;
  rating?: number;
  contact?: {
    phone: string;
    email: string;
    social?: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
    }
  };
  specialties?: string[];
}

export interface Property {
  id: string;
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
  viewers?: number;
  remainingSeats?: number;
  agent: Agent;
  coordinates: {
    lat: number;
    lng: number;
  };
  transactionType: "Vente" | "Location";
  status?: "available" | "pending" | "sold" | "rented";
  privateNotes?: string;
  createdAt?: Date;
  virtualTour?: {
    enabled: boolean;
    type: "360" | "video";
    url?: string;
    floorPlan?: string;
    statistics?: {
      views: number;
      likes: number;
      shares: number;
    };
  };
  tags?: string[];
}

export interface Visit {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  propertyLocation: string;
  date: Date;
  time: string;
  status: string;
  type: string;
  agent: {
    name: string;
    image: string;
    phone: string;
    email: string;
    avatar?: string;
    contact?: {
      phone: string;
      email: string;
    };
  };
  visitor: {
    name: string;
    email: string;
    phone: string;
  };
  isLive?: boolean;
  liveUrl?: string;
}