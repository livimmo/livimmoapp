export const PROPERTY_TYPES = [
  "Résidentiel",
  "Bureau",
  "Hôtel",
  "Commerce", 
  "Industriel",
  "Terrain"
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number];