import { type Property } from "@/types/property";
import { addDays } from "date-fns";

const cities = [
  { city: "Casablanca", districts: ["Ain Diab", "Gauthier", "Maarif", "Anfa", "Bourgogne"] },
  { city: "Marrakech", districts: ["Guéliz", "Hivernage", "Palmeraie", "Médina"] },
  { city: "Tanger", districts: ["Malabata", "Centre-ville", "Boukhalef", "Cap Spartel"] },
  { city: "Rabat", districts: ["Agdal", "Hassan", "Hay Riad", "Les Orangers"] }
];

const propertyTypes = [
  { 
    type: "Usine", 
    features: ["Zone industrielle", "Quai de chargement", "Bureaux intégrés", "Parking"]
  },
  { 
    type: "Penthouse", 
    features: ["Vue panoramique", "Terrasse privée", "Ascenseur privé", "Domotique"]
  },
  { 
    type: "Terrain", 
    features: ["Constructible", "Viabilisé", "Vue dégagée", "Accès facile"]
  },
  { 
    type: "Hôtel", 
    features: ["Piscine", "Restaurant", "Spa", "Salle de conférence"]
  },
  { 
    type: "Villa", 
    features: ["Jardin", "Piscine", "Garage", "Sécurité"]
  },
  { 
    type: "Appartement", 
    features: ["Ascenseur", "Parking", "Gardiennage", "Cave"]
  }
];

const propertyImages = [
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
  "https://images.unsplash.com/photo-1524230572899-a752b3835840",
  "https://images.unsplash.com/photo-1431576901776-e539bd916ba2",
  "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
  "https://images.unsplash.com/photo-1433832597046-4f10e10ac764",
  "https://images.unsplash.com/photo-1493397212122-2b85dda8106b"
];

const agents = [
  {
    name: "Sarah Martin",
    image: "https://i.pravatar.cc/150?u=sarah",
    phone: "+212 6 12 34 56 78",
    email: "sarah.martin@example.com",
    company: "Luxury Real Estate",
    verified: true
  },
  {
    name: "Mohammed Alami",
    image: "https://i.pravatar.cc/150?u=mohamed",
    phone: "+212 6 23 45 67 89",
    email: "m.alami@example.com",
    company: "Premium Properties",
    verified: true
  }
];

const generateRandomPrice = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min) * 1000;
};

const generateRandomSurface = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateMockCoordinates = (location: string) => {
  const defaultCoords = {
    lat: 33.5731104,
    lng: -7.6425486
  };

  const cityCoords: Record<string, { lat: number; lng: number }> = {
    "Casablanca": { lat: 33.5731104, lng: -7.6425486 },
    "Marrakech": { lat: 31.6294723, lng: -7.9810845 },
    "Rabat": { lat: 34.0209, lng: -6.8416 },
    "Tanger": { lat: 35.7595, lng: -5.8340 }
  };

  return cityCoords[location.split(',')[0]] || defaultCoords;
};

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const mockProperties: Property[] = Array.from({ length: 20 }, () => {
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  const randomDistrict = randomCity.districts[Math.floor(Math.random() * randomCity.districts.length)];
  const randomPropertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
  const has_live = Math.random() > 0.5;
  const is_live_now = has_live && Math.random() > 0.5;
  const live_date = has_live && !is_live_now ? addDays(new Date(), Math.floor(Math.random() * 14) + 1).toISOString() : null;

  return {
    id: generateUUID(),
    title: `${randomPropertyType.type} ${randomCity.city} - ${randomDistrict}`,
    price: Math.floor(Math.random() * 9500000) + 500000,
    location: `${randomCity.city}, ${randomDistrict}`,
    type: randomPropertyType.type,
    surface: Math.floor(Math.random() * 950) + 50,
    rooms: Math.floor(Math.random() * 10) + 1,
    bathrooms: Math.floor(Math.random() * 5) + 1,
    description: `Magnifique ${randomPropertyType.type.toLowerCase()} situé dans le quartier prisé de ${randomDistrict}, ${randomCity.city}.`,
    features: randomPropertyType.features,
    images: [propertyImages[Math.floor(Math.random() * propertyImages.length)]],
    coordinates: generateMockCoordinates(randomCity.city),
    has_live,
    is_replay: false,
    has_scheduled_live: has_live && !is_live_now,
    live_date,
    is_live_now,
    remaining_seats: !is_live_now && has_live ? Math.floor(Math.random() * 20) + 5 : null,
    viewers: is_live_now ? Math.floor(Math.random() * 100) : 0,
    transaction_type: Math.random() > 0.3 ? "Vente" : "Location",
    virtual_tour: Math.random() > 0.7 ? {
      enabled: true,
      type: "360",
      url: "TzhRashYdRt"
    } : null,
    private_notes: null,
    agent_id: generateUUID(),
    status: Math.random() > 0.5 ? "available" : "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: []
  };
});

export const mockProperty: Property = mockProperties[0];

export const addCoordinatesToProperties = (properties: Omit<Property, 'coordinates'>[]): Property[] => {
  return properties.map(property => ({
    ...property,
    coordinates: generateMockCoordinates(property.location)
  }));
};
