export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  type: string;
  status: "available" | "sold" | "rented";
  images: string[];
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}