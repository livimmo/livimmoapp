export const PROPERTY_TYPES = [
  "Résidentiel",
  "Commercial",
  "Terrain",
  "Bureau",
  "Logistique/Industriel",
  "Autres"
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number];