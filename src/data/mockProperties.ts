import { type PropertyWithAgent } from "@/types/database";

const cities = [
  { name: "Marrakech", lat: 31.6295, lng: -7.9811 },
  { name: "Casablanca", lat: 33.5731, lng: -7.5898 },
  { name: "Rabat", lat: 34.0209, lng: -6.8416 },
  { name: "Tanger", lat: 35.7595, lng: -5.8340 },
  { name: "Agadir", lat: 30.4278, lng: -9.5981 },
  { name: "Fès", lat: 34.0181, lng: -5.0078 },
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
    live_date: new Date("2024-03-15").toISOString(),
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
      description: "Expert en immobilier de luxe",
      location: "Marrakech",
      social_links: {
        facebook: "https://facebook.com/sarahmartin",
        instagram: "https://instagram.com/sarahmartin"
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