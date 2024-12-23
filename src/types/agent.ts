export type AgentType = "agent" | "promoter" | "developer" | "owner" | "admin";

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  image: string;
  phone: string;
  email: string;
  location: string;
  type: AgentType;
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
  social?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}