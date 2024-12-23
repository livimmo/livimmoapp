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
  verified?: boolean;
  description?: string;
}