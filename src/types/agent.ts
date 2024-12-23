export interface Agent {
  id: string;
  name: string;
  image: string;
  avatar: string;
  phone: string;
  email: string;
  location: string;
  type: string;
  company?: string;
  verified?: boolean;
  rating?: number;
  totalReviews?: number;
  activeProperties?: number;
  completedLives?: number;
  scheduledLives?: number;
  soldProperties?: number;
  description?: string;
  contact?: {
    phone: string;
    email: string;
    whatsapp?: string;
  };
}