import { type PropertyWithAgent } from "@/types/database";
import { addDays } from "date-fns";

const cities = [
  { name: "Marrakech", lat: 31.6295, lng: -7.9811 },
  { name: "Casablanca", lat: 33.5731, lng: -7.5898 },
  { name: "Rabat", lat: 34.0209, lng: -6.8416 },
  { name: "Tanger", lat: 35.7595, lng: -5.8340 },
  { name: "Agadir", lat: 30.4278, lng: -9.5981 },
  { name: "Fès", lat: 34.0181, lng: -5.0078 },
];

const images = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  "https://images.unsplash.com/photo-1613977257363-707ba9348227",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
];

export const mockProperties: PropertyWithAgent[] = [
  {
    id: "1",
    title: "Villa Moderne avec Piscine",
    price: 2500000,
    location: "Marrakech",
    type: "Villa",
    surface: 350,
    rooms: 5,
    bathrooms: 3,
    description: "Magnifique villa moderne avec piscine et jardin paysager",
    features: ["Piscine", "Jardin", "Garage"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    ],
    has_live: true,
    is_replay: false,
    has_scheduled_live: true,
    live_date: addDays(new Date(), 7).toISOString(),
    is_live_now: false,
    remaining_seats: 15,
    viewers: 0,
    coordinates: {
      lat: 31.6295,
      lng: -7.9811
    },
    transaction_type: "Vente",
    virtual_tour: {
      enabled: true,
      url: "TzhRashYdRt",
      platform: "matterport",
      type: "360"
    },
    private_notes: null,
    agent_id: "1",
    status: "available",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: ["Luxe", "Piscine", "Jardin"],
    agent: {
      id: "1",
      full_name: "Sarah Martin",
      avatar_url: "https://i.pravatar.cc/150?u=sarah",
      phone: "+212 6 12 34 56 78",
      company: "Luxury Real Estate",
      role: "agent",
      verified: true,
      rating: 4.8,
      specialties: ["Luxury", "Villas"],
      description: "Luxury real estate specialist",
      location: "Marrakech",
      social_links: {
        facebook: "https://facebook.com/sarahmartin",
        instagram: "https://instagram.com/sarahmartin"
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  },
  {
    id: "2",
    title: "Appartement Vue Mer",
    price: 1800000,
    location: "Tanger",
    type: "Appartement",
    surface: 120,
    rooms: 3,
    bathrooms: 2,
    description: "Superbe appartement avec vue panoramique sur la mer",
    features: ["Vue mer", "Terrasse", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
    ],
    has_live: false,
    is_replay: false,
    has_scheduled_live: false,
    live_date: null,
    is_live_now: false,
    remaining_seats: null,
    viewers: 0,
    coordinates: {
      lat: 35.7595,
      lng: -5.8340
    },
    transaction_type: "Location",
    virtual_tour: {
      enabled: true,
      url: "SxQL3iGyvQk",
      platform: "matterport",
      type: "360"
    },
    private_notes: null,
    agent_id: "2",
    status: "available",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: ["Vue Mer", "Moderne"],
    agent: {
      id: "2",
      full_name: "Mohammed Alami",
      avatar_url: "https://i.pravatar.cc/150?u=mohammed",
      phone: "+212 6 23 45 67 89",
      company: "Coastal Properties",
      role: "agent",
      verified: true,
      rating: 4.6,
      specialties: ["Appartements", "Vue Mer"],
      description: "Spécialiste de l'immobilier côtier",
      location: "Tanger",
      social_links: {
        facebook: "https://facebook.com/mohammedalami",
        instagram: "https://instagram.com/mohammedalami"
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  }
];

export const addCoordinatesToProperties = (properties: Omit<PropertyWithAgent, "coordinates">[]) => {
  return properties.map(property => ({
    ...property,
    coordinates: generateMockCoordinates(property.location)
  }));
};

export const generateMockCoordinates = (location: string) => {
  const city = cities.find(city => location.includes(city.name));
  if (city) {
    return {
      lat: city.lat + (Math.random() - 0.5) * 0.1,
      lng: city.lng + (Math.random() - 0.5) * 0.1
    };
  }
  return {
    lat: 31.7917,
    lng: -7.0926
  };
};