export interface Property {
  id: number;
  image: string;
  title: string;
  price: number;
  location: string;
  type: string;
  surface: number;
  rooms: number;
  hasLive?: boolean;
  addedAt: Date;
}