export const generateMockCoordinates = () => {
  // Generate random coordinates within Morocco's approximate bounds
  const lat = 31.7917 + (Math.random() * 4 - 2); // ~29.7917 to ~33.7917
  const lng = -7.0926 + (Math.random() * 4 - 2); // ~-9.0926 to ~-5.0926

  return {
    lat,
    lng
  };
};

export const parseCoordinates = (coordinates: { lat: number; lng: number } | null) => {
  if (!coordinates) {
    return generateMockCoordinates();
  }
  return coordinates;
};