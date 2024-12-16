export interface Agent {
  id: number;
  name: string;
  avatar: string;
  company?: string;
  location: string;
  type: "agent" | "promoter";
  rating: number;
  totalReviews: number;
  activeProperties: number;
  completedLives: number;
  scheduledLives: number;
  soldProperties?: number;
  specialties: string[];
  verified: boolean;
  contact: {
    phone: string;
    email: string;
    social?: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
    };
  };
  description: string;
}