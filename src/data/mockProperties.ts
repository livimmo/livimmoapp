import { Property } from "@/types/property";

export const generateMockCoordinates = () => ({
  lat: 31.7917 + Math.random() * 2,
  lng: -7.0926 + Math.random() * 2
});

export const addCoordinatesToProperty = (property: Omit<Property, 'coordinates'>): Property => ({
  ...property,
  coordinates: generateMockCoordinates()
});

// Helper function to add coordinates to an array of properties
export const addCoordinatesToProperties = (properties: Omit<Property, 'coordinates'>[]): Property[] => {
  return properties.map(property => addCoordinatesToProperty(property));
};