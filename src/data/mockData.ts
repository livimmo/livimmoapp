import { type Property, type PropertyWithAgent } from "@/types/property";
import { type Profile } from "@/types/database/profile";
import { type Visit } from "@/types/database/visit";

export const mockAgents: Profile[] = [
  {
    id: "1",
    full_name: "John Doe",
    avatar_url: "/placeholder.svg",
    company: "Real Estate Co",
    phone: "+1234567890",
    role: "agent",
    verified: true,
    rating: 4.5,
    specialties: ["Residential", "Commercial"],
    description: "Experienced real estate agent",
    location: "Casablanca",
    social_links: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com"
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const mockDevelopers: Profile[] = [
  {
    id: "2",
    full_name: "Jane Smith",
    avatar_url: "/placeholder.svg",
    company: "Development Corp",
    phone: "+1234567890",
    role: "developer",
    verified: true,
    rating: 4.8,
    specialties: ["Residential", "Luxury"],
    description: "Leading property developer",
    location: "Rabat",
    social_links: {
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com"
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const mockProperties: PropertyWithAgent[] = [
  {
    id: "1",
    title: "Modern Apartment",
    price: 1500000,
    location: "Casablanca, Maarif",
    type: "Apartment",
    surface: 120,
    rooms: 3,
    bathrooms: 2,
    description: "Beautiful modern apartment",
    features: ["Parking", "Pool"],
    images: ["/placeholder.svg"],
    has_live: true,
    is_replay: false,
    has_scheduled_live: true,
    live_date: new Date().toISOString(),
    is_live_now: false,
    remaining_seats: 10,
    viewers: 0,
    coordinates: { lat: 33.5731, lng: -7.5898 },
    transaction_type: "Vente",
    virtual_tour: {
      enabled: true,
      url: "https://example.com",
      platform: "matterport",
      type: "360"
    },
    private_notes: null,
    agent_id: "1",
    status: "available",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: ["Nouveauté"],
    agent: mockAgents[0]
  }
];

export const mockVisits: Visit[] = [
  {
    id: "1",
    property_id: "1",
    visitor_id: "1",
    type: "physical",
    date: new Date().toISOString(),
    time: "14:00",
    status: "pending",
    notes: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const mockLives = mockProperties.map(property => ({
  id: property.id,
  title: property.title,
  description: property.description || "",
  thumbnail: property.images[0] || "",
  agent: property.agent.full_name,
  location: property.location,
  type: property.type,
  price: property.price.toString(),
  date: new Date(),
  availableSeats: property.remaining_seats || 15,
  viewers: property.viewers || 0,
  status: property.is_live_now ? "live" : property.is_replay ? "replay" : "scheduled",
  tags: property.tags || []
}));