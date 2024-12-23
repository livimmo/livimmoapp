import { type Property, type PropertyWithAgent } from "@/types/property";
import { type Profile } from "@/types/database";

// Helper function to generate mock coordinates
export const generateMockCoordinates = () => ({
  lat: 31.7917 + (Math.random() * 2 - 1),
  lng: -7.0926 + (Math.random() * 2 - 1),
});

// Mock agent profile
const mockAgent: Profile = {
  id: "1",
  full_name: "Sarah Martin",
  avatar_url: "https://i.pravatar.cc/150?u=sarah",
  company: "Luxury Real Estate",
  phone: "+212 6 12 34 56 78",
  role: "agent",
  verified: true,
  rating: 4.8,
  specialties: ["Luxury", "Villas"],
  description: "Luxury real estate specialist with 10 years of experience",
  location: "Marrakech",
  social_links: {},
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

// Base mock property data
export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Villa moderne avec piscine",
    price: 2500000,
    location: "Marrakech",
    type: "Villa",
    surface: 250,
    rooms: 4,
    bathrooms: 3,
    description: "Magnifique villa moderne avec piscine",
    features: ["Piscine", "Jardin", "Garage"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    ],
    has_live: true,
    is_replay: false,
    has_scheduled_live: false,
    live_date: new Date("2024-03-20").toISOString(),
    is_live_now: true,
    remaining_seats: 10,
    viewers: 150,
    coordinates: generateMockCoordinates(),
    transaction_type: "Vente",
    virtual_tour: {
      enabled: true,
      url: "https://my.matterport.com/show/?m=TzhRashYdRt",
      platform: "matterport",
      type: "360"
    },
    private_notes: null,
    agent_id: "1",
    status: "available",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: ["Nouveauté", "Coup de coeur"]
  },
  {
    id: "2",
    title: "Appartement vue mer",
    price: 1800000,
    location: "Tanger",
    type: "Appartement",
    surface: 120,
    rooms: 3,
    bathrooms: 2,
    description: "Superbe appartement avec vue sur mer",
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
    coordinates: generateMockCoordinates(),
    transaction_type: "Location",
    virtual_tour: {
      enabled: false,
      url: null,
      platform: null,
      type: null
    },
    private_notes: null,
    agent_id: "1",
    status: "available",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: ["Nouveauté"]
  },
  {
    id: "3",
    title: "Maison traditionnelle",
    price: 1200000,
    location: "Fès",
    type: "Maison",
    surface: 200,
    rooms: 5,
    bathrooms: 2,
    description: "Charmante maison traditionnelle avec jardin",
    features: ["Jardin", "Terrasse"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    ],
    has_live: false,
    is_replay: false,
    has_scheduled_live: false,
    live_date: null,
    is_live_now: false,
    remaining_seats: null,
    viewers: 0,
    coordinates: generateMockCoordinates(),
    transaction_type: "Vente",
    virtual_tour: {
      enabled: false,
      url: null,
      platform: null,
      type: null
    },
    private_notes: null,
    agent_id: "1",
    status: "available",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: []
  },
];

// Function to add coordinates to properties
export const addCoordinatesToProperties = (properties: Omit<PropertyWithAgent, "coordinates">[]) => {
  return properties.map(property => ({
    ...property,
    coordinates: generateMockCoordinates()
  }));
};

// Function to add agent data to properties
export const addAgentToProperties = (properties: Property[]): PropertyWithAgent[] => {
  return properties.map(property => ({
    ...property,
    agent: mockAgent
  }));
};

// Export the properties with agent data
export const mockPropertiesWithAgent = addAgentToProperties(mockProperties);