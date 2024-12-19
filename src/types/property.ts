export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  type: string;
  status: "available" | "sold" | "rented";
  images: string[];
  features: string[];
  createdAt: Date;
  updatedAt: Date;
  // Live-related properties
  hasLive?: boolean;
  liveDate?: Date;
  isLiveNow?: boolean;
  isReplay?: boolean;
  viewers?: number;
  remainingSeats?: number;
  // Virtual tour properties
  virtualTour?: {
    enabled: boolean;
    url: string;
    platform?: 'klapty' | 'matterport';
    type: "360" | "3D";
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
  // Agent information
  agent: {
    id?: number;
    name: string;
    image: string;
    phone: string;
    email: string;
    company?: string;
    verified?: boolean;
  };
  // Location coordinates
  coordinates: {
    lat: number;
    lng: number;
  };
  // Property tags
  tags?: string[];
  // Transaction type
  transactionType: "Vente" | "Location";
  // Offers count
  offers?: number;
}

// Helper type for creating properties without coordinates
export type PropertyWithoutCoordinates = Omit<Property, 'coordinates'>;

// Helper type for property card props
export type PropertyCardProps = Property & {
  viewers?: number;
  isLiveNow?: boolean;
  remainingSeats?: number;
  isUserRegistered?: boolean;
  offers?: number;
  customButton?: React.ReactNode;
};

// Helper function to create a default property with required fields
export const createDefaultProperty = (partial: Partial<Property>): Property => ({
  id: 0,
  title: "",
  description: "",
  price: 0,
  location: "",
  surface: 0,
  rooms: 0,
  bedrooms: 0,
  bathrooms: 0,
  type: "",
  status: "available",
  images: [],
  features: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  agent: {
    name: "",
    image: "",
    phone: "",
    email: "",
  },
  coordinates: {
    lat: 0,
    lng: 0,
  },
  transactionType: "Vente",
  ...partial,
});