export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  image: string;
  location: string;
  type: "agent" | "promoter";
  company?: string;
  companyLogo?: string;
  verified?: boolean;
  description?: string;
  rating?: number;
  totalReviews?: number;
  activeProperties?: number;
  completedLives?: number;
  scheduledLives?: number;
  soldProperties?: number;
  specialties?: string[];
  languages?: string[];
  experience?: number;
  properties?: number;
  clients?: number;
  sales?: number;
  social?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}