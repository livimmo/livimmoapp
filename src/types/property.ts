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
  isReplay?: boolean;
  liveDate?: Date;
  status?: 'available' | 'pending' | 'sold' | 'rented';
  createdAt?: Date;
  ownerId?: string;
  agent: {
    id?: string;
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
  virtualTour?: {
    enabled: boolean;
    url?: string;
    platform?: 'matterport' | 'klapty';
    type: "360" | "video" | "live";
    hotspots?: Array<{
      title: string;
      description: string;
      position: { x: number; y: number };
      details?: Array<{ label: string; value: string }>;
    }>;
    floorPlan?: {
      url: string;
      rooms: Array<{
        id: string;
        name: string;
        area: number;
        coordinates: { x: number; y: number };
      }>;
    };
    statistics?: {
      totalVisits: number;
      averageTime: string;
      popularRooms: Array<{
        name: string;
        visits: number;
      }>;
      lastVisits: Array<{
        date: string;
        duration: string;
      }>;
    };
  };
  privateNotes?: {
    ownerName?: string;
    location?: string;
    notes?: string;
  };
}