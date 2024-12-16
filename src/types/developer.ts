export interface Developer {
  id: number;
  name: string;
  logo: string;
  description: string;
  location: string;
  sector: "residential" | "commercial" | "mixed";
  activeProjects: number;
  activeLives: number;
  scheduledLives: number;
  rating: number;
  totalReviews: number;
}