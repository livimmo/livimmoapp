export interface LiveEvent {
  id: number;
  title: string;
  date: Date;
  type: string;
  location: string;
  agent: string;
  availableSeats: number;
  thumbnail: string;
  price: string;
  description?: string;
}