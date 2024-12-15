import { Property } from "@/types/property";

// Coordonnées des principales villes du Maroc
const cityCoordinates = {
  "Casablanca": { lat: 33.5731, lng: -7.5898 },
  "Rabat": { lat: 34.0209, lng: -6.8416 },
  "Marrakech": { lat: 31.6295, lng: -7.9811 },
  "Tanger": { lat: 35.7595, lng: -5.8340 },
  "Agadir": { lat: 30.4278, lng: -9.5981 },
  "Fès": { lat: 34.0333, lng: -5.0000 }
};

export const generateMockCoordinates = (location: string) => {
  // Trouver la ville la plus proche dans notre liste
  const cityName = Object.keys(cityCoordinates).find(city => 
    location.toLowerCase().includes(city.toLowerCase())
  ) || "Casablanca"; // Par défaut à Casablanca

  const baseCoordinates = cityCoordinates[cityName];
  
  // Ajouter une petite variation aléatoire pour éviter que tous les points soient au même endroit
  return {
    lat: baseCoordinates.lat + (Math.random() - 0.5) * 0.05,
    lng: baseCoordinates.lng + (Math.random() - 0.5) * 0.05
  };
};

// Helper function to randomly assign live status
const generateRandomLiveStatus = () => {
  const hasLive = Math.random() > 0.5;
  if (!hasLive) return { hasLive: false };

  const isLiveNow = Math.random() > 0.5;
  const liveDate = isLiveNow ? new Date() : new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000);
  const viewers = Math.floor(Math.random() * 50);
  const remainingSeats = Math.floor(Math.random() * 15) + 1;

  return {
    hasLive: true,
    liveDate,
    isLiveNow,
    viewers,
    remainingSeats,
  };
};

export const addCoordinatesToProperty = (property: Omit<Property, 'coordinates'>): Property => ({
  ...property,
  coordinates: generateMockCoordinates(property.location),
  ...generateRandomLiveStatus()
});

export const addCoordinatesToProperties = (properties: Omit<Property, 'coordinates'>[]): Property[] => {
  return properties.map(property => addCoordinatesToProperty(property));
};