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
  virtualTour?: {
    enabled: boolean;
    url?: string;
    type?: string;
    platform?: string;
    hotspots?: Array<{
      title: string;
      description: string;
      position: { x: number; y: number };
      details: Array<{ label: string; value: string }>;
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
      popularRooms: Array<{ name: string; visits: number }>;
      lastVisits: Array<{ date: string; duration: string }>;
    };
  };
  owner?: {
    id: number;
    name: string;
  };
  privateNotes?: string;
  tags?: string[];
  status?: "available" | "pending" | "sold" | "rented";
  createdAt?: Date;
}