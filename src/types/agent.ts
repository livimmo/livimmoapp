export interface Agent {
  id: string;
  name: string;
  image: string;
  phone?: string;
  email?: string;
  isVerified?: boolean;
  description?: string;
  projectCount?: number;
  rating?: number;
  totalReviews?: number;
}