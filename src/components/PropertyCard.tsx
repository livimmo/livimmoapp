import { Property } from "@/types/property";

export const PropertyCard = ({ property }: { property: Property }) => {
  // Convert string IDs to numbers where needed
  const numericId = parseInt(property.id, 10);
  const numericPrice = typeof property.price === 'string' ? parseInt(property.price, 10) : property.price;
  const numericSurface = typeof property.surface === 'string' ? parseInt(property.surface, 10) : property.surface;

  return (
    <div className="property-card" key={numericId}>
      <h2 className="text-lg font-bold">{property.title}</h2>
      <p className="text-gray-600">Price: {numericPrice} €</p>
      <p className="text-gray-600">Location: {property.location}</p>
      <p className="text-gray-600">Surface: {numericSurface} m²</p>
      <p className="text-gray-600">Rooms: {property.rooms}</p>
      <p className="text-gray-600">Bathrooms: {property.bathrooms}</p>
      <p className="text-gray-600">Description: {property.description}</p>
      <div className="property-images">
        {property.images.map((image, index) => (
          <img key={index} src={image} alt={property.title} className="property-image" />
        ))}
      </div>
      <p className="text-gray-600">Features: {property.features.join(", ")}</p>
      <p className="text-gray-600">Agent: {property.agent.name}</p>
    </div>
  );
};
