export interface Property {
  id: number;
  title: string;
  type: string;
  price: string | number;
  location: string;
  surface: string | number;
  rooms: number;
  bathrooms: number;
  description: string;
  features: string[];
  images: string[];
  agent: {
    name: string;
    image: string;
    phone: string;
    email: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}