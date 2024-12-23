import { type Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <img src={property.images[0]} alt={property.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{property.title}</h3>
        <p className="text-gray-500">{property.location}</p>
        <p className="text-xl font-bold">{property.price.toLocaleString()} DH</p>
        <div className="flex gap-2 mt-2">
          {property.features.map((feature) => (
            <Badge key={feature} variant="secondary">{feature}</Badge>
          ))}
        </div>
        <div className="mt-4">
          <Button onClick={() => navigate(`/property/${property.id}`)} className="w-full">
            Voir les détails
          </Button>
        </div>
      </div>
    </div>
  );
};