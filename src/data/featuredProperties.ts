import { type PropertyWithAgent } from "@/types/database";

export const featuredProperties: PropertyWithAgent[] = [
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
    features: ["Vue mer", "Terrasse", "Ascenseur", "Parking", "Cuisine équipée"],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
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
      url: "https://my.matterport.com/show/?m=SxQL3iGyvQk",
      platform: "matterport",
      type: "360"
    },
    private_notes: null,
    agent_id: "2",
    status: "available",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: ["Vue Mer", "Terrasse", "Ascenseur"],
    agent: {
      id: "2",
      full_name: "Sophia Martinez",
      avatar_url: "https://i.pravatar.cc/150?u=sophia",
      phone: "+212 6 11 22 33 44",
      company: "Real Estate Group",
      role: "agent",
      verified: true,
      rating: 4.7,
      specialties: ["Appartements", "Locations"],
      description: "Spécialiste des appartements en bord de mer",
      location: "Tanger",
      social_links: {
        facebook: "https://facebook.com/sophiamartinez",
        instagram: "https://instagram.com/sophiamartinez"
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  }
];
