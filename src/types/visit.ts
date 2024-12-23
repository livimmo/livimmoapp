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
    contact?: string;
    avatar?: string;
  };
  visitor: {
    name: string;
    email: string;
    phone: string;
  };
  isLive?: boolean;
  liveUrl?: string;
}