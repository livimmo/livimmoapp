export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  location: string;
  type: "agent" | "promoter";
  company?: string;
  companyLogo?: string;
  description?: string;
  verified?: boolean;
  rating?: number;
  totalReviews?: number;
  activeProperties?: number;
  completedLives?: number;
  soldProperties?: number;
  contact?: {
    email: string;
    phone: string;
  };
}