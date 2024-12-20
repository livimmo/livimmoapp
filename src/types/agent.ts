export interface Agent {
  id: number;
  name: string;
  avatar: string;
  company?: string;
  companyLogo?: string;
  location: string;
  type: "agent" | "promoter";
  rating: number;
  totalReviews: number;
  activeProperties: number;
  completedLives: number;
  scheduledLives?: number;
  soldProperties?: number;
  specialties?: string[];
  verified: boolean;
  contact: {
    phone: string;
    email: string;
    social?: {
      linkedin?: string;
      instagram?: string;
      facebook?: string;
    };
  };
  description: string;
}