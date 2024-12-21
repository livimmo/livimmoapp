export interface Agent {
  id: number;
  name: string;
  image: string;
  phone: string;
  email: string;
  role?: string;
  agency?: string;
  description?: string;
}