export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  image: string;
  location: string;
  type: string;
  company?: string;
  companyLogo?: string;
  verified?: boolean;
  rating?: number;
  totalReviews?: number;
  description?: string;
  specialties?: string[];
  languages?: string[];
  certifications?: string[];
  activeProperties?: number;
  completedLives?: number;
  scheduledLives?: number;
  soldProperties?: number;
  contact?: {
    phone: string;
    email: string;
    social?: {
      facebook?: string;
      twitter?: string;
      linkedin?: string;
      instagram?: string;
    }
  };
}