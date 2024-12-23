import { type PropertyWithAgent } from "@/types/database";

export const mockProperties: PropertyWithAgent[] = [
  {
    id: "1",
    title: "Villa Moderne avec Piscine",
    price: 2500000,
    location: "Marrakech, Guéliz",
    type: "Villa",
    surface: 350,
    rooms: 5,
    bathrooms: 3,
    description: "Magnifique villa moderne avec piscine et jardin paysager",
    features: ["Piscine", "Jardin", "Garage", "Climatisation", "Sécurité 24/7"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227",
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
      full_name: "Karim Benjelloun",
      avatar_url: "https://i.pravatar.cc/150?u=karim",
      phone: "+212 6 00 11 22 33",
      company: "Luxury Real Estate",
      role: "agent",
      verified: true,
      rating: 4.9,
      specialties: ["Luxury", "Villas"],
      description: "Expert en immobilier de luxe",
      location: "Marrakech",
      social_links: {
        facebook: "https://facebook.com/karimbenjelloun",
        instagram: "https://instagram.com/karimbenjelloun"
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  }
];