export type AgentType = "agent" | "promoter" | "developer" | "owner" | "admin";

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  image: string;
  location: string;
  type: AgentType;
  company?: string;
  companyLogo?: string;
  description?: string;
  rating?: number;
  totalReviews?: number;
  activeProperties?: number;
  completedLives?: number;
  scheduledLives?: number;
  soldProperties?: number;
  verified?: boolean;
}