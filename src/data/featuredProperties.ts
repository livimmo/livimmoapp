import { Property, createDefaultProperty } from "@/types/property";

export const featuredProperties: Property[] = [
  createDefaultProperty({
    id: 1,
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
    hasLive: true,
    liveDate: new Date("2024-03-15"),
    agent: {
      id: 1,
      name: "Karim Benjelloun",
      image: "https://i.pravatar.cc/150?u=karim",
      phone: "+212 6 00 11 22 33",
      email: "karim.benjelloun@example.com",
    },
    coordinates: {
      lat: 31.6295,
      lng: -7.9811
    },
    transactionType: "Vente",
    virtualTour: {
      enabled: true,
      url: "VOTRE_ID_KLAPTY",
      platform: 'klapty',
      type: "360",
      hotspots: [
        {
          title: "Salon",
          description: "Spacieux salon avec vue sur la piscine",
          position: { x: 30, y: 40 },
          details: [
            { label: "Surface", value: "45m²" },
            { label: "Exposition", value: "Sud" }
          ]
        }
      ],
      floorPlan: {
        url: "https://example.com/floorplan.svg",
        rooms: [
          {
            id: "salon",
            name: "Salon",
            area: 45,
            coordinates: { x: 30, y: 40 }
          },
          {
            id: "cuisine",
            name: "Cuisine",
            area: 20,
            coordinates: { x: 60, y: 40 }
          }
        ]
      },
      statistics: {
        totalVisits: 245,
        averageTime: "8:30",
        popularRooms: [
          { name: "Salon", visits: 180 },
          { name: "Cuisine", visits: 150 },
          { name: "Chambre principale", visits: 120 }
        ],
        lastVisits: [
          { date: "2024-03-10", duration: "10:15" },
          { date: "2024-03-09", duration: "7:45" }
        ]
      }
    }
  }),
  createDefaultProperty({
    id: 2,
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
    hasLive: false,
    agent: {
      id: 2,
      name: "Sophia Martinez",
      image: "https://i.pravatar.cc/150?u=sophia",
      phone: "+212 6 11 22 33 44",
      email: "sophia.martinez@example.com",
    },
    coordinates: {
      lat: 35.7595,
      lng: -5.8340
    },
    transactionType: "Location",
    virtualTour: {
      enabled: true,
      url: "https://my.matterport.com/show/?m=SxQL3iGyvQk",
      type: "360",
      hotspots: [
        {
          title: "Chambre",
          description: "Chambre spacieuse avec vue sur la mer",
          position: { x: 50, y: 50 },
          details: [
            { label: "Surface", value: "30m²" },
            { label: "Exposition", value: "Est" }
          ]
        }
      ],
      floorPlan: {
        url: "https://example.com/floorplan2.svg",
        rooms: [
          {
            id: "salon",
            name: "Salon",
            area: 35,
            coordinates: { x: 30, y: 40 }
          },
          {
            id: "chambre",
            name: "Chambre principale",
            area: 20,
            coordinates: { x: 60, y: 40 }
          }
        ]
      },
      statistics: {
        totalVisits: 180,
        averageTime: "6:45",
        popularRooms: [
          { name: "Salon", visits: 150 },
          { name: "Chambre principale", visits: 120 }
        ],
        lastVisits: [
          { date: "2024-03-10", duration: "7:15" },
          { date: "2024-03-09", duration: "6:30" }
        ]
      }
    }
  })
];