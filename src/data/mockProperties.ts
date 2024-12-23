import { type Property, type PropertyWithAgent } from "@/types/property";
import { generateMockCoordinates } from "@/utils/coordinates";

const mockAgent = {
  id: "1",
  full_name: "Sarah Martin",
  avatar_url: "https://i.pravatar.cc/150?u=sarah",
  company: "Luxury Real Estate",
  phone: "+212 6 12 34 56 78",
  role: "agent",
  verified: true,
  rating: 4.8,
  specialties: ["Luxury", "Residential"],
  description: "Luxury real estate agent with 10 years of experience",
  location: "Casablanca",
  social_links: {
    linkedin: "https://linkedin.com/in/sarah-martin",
    instagram: "https://instagram.com/sarahmartin"
  },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

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
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
    ],
    has_live: true,
    is_replay: false,
    has_scheduled_live: true,
    live_date: new Date("2024-03-20").toISOString(),
    is_live_now: false,
    remaining_seats: 15,
    viewers: 0,
    coordinates: generateMockCoordinates(),
    transaction_type: "Vente",
    virtual_tour: null,
    private_notes: null,
    agent_id: "1",
    status: "available",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: ["Nouveauté", "Coup de coeur"]
  }
];

// Function to add agent data to properties
export const addAgentToProperties = (properties: Property[]): PropertyWithAgent[] => {
  return properties.map(property => ({
    ...property,
    agent: mockAgent
  }));
};

// Export the properties with agent data
export const mockPropertiesWithAgent = addAgentToProperties(mockProperties);