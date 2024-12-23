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
  verified?: boolean;
  description?: string;
  specialties?: string[];
  languages?: string[];
  experience?: number;
  rating?: number;
  reviews?: number;
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