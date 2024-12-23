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
  verified?: boolean;
  rating?: number;
  totalReviews?: number;
  description?: string;
  specialties?: string[];
  languages?: string[];
  certifications?: string[];
  availability?: {
    start: string;
    end: string;
  };
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}