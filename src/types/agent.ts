export type AgentType = "agent" | "promoter" | "developer";

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  image?: string;
  location: string;
  type: AgentType;
  company?: string;
  verified?: boolean;
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