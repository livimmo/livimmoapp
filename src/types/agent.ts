export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  image: string;
  location: string;
  type: "agent";
  company?: string;
  verified?: boolean;
}