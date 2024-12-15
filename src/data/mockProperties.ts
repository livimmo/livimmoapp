import { Property } from "@/types/property";

export const generateMockCoordinates = () => ({
  lat: 31.7917 + Math.random() * 2,
  lng: -7.0926 + Math.random() * 2
});

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
  coordinates: generateMockCoordinates(),
  ...generateRandomLiveStatus()
});

// Helper function to add coordinates to an array of properties
export const addCoordinatesToProperties = (properties: Omit<Property, 'coordinates'>[]): Property[] => {
  return properties.map(property => addCoordinatesToProperty(property));
};