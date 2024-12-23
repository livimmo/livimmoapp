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
  companyLogo?: string;
  verified?: boolean;
  rating?: number;
  totalReviews?: number;
  activeProperties?: number;
  completedLives?: number;
  scheduledLives?: number;
  soldProperties?: number;
  description?: string;
  specialties?: string[];
  contact?: {
    phone: string;
    email: string;
    whatsapp?: string;
    social?: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
    };
  };
}