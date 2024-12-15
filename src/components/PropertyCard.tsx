import { Heart } from "lucide-react";

interface PropertyCardProps {
  image: string;
  title: string;
  price: number;
  location: string;
  type: string;
  surface: number;
  rooms: number;
}

export const PropertyCard = ({
  image,
  title,
  price,
  location,
  type,
  surface,
  rooms,
}: PropertyCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md">
          <Heart className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-primary font-bold text-xl mb-2">
          {price.toLocaleString()} DH
        </p>
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <span>{location}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{type}</span>
          <span>{surface} m²</span>
          <span>{rooms} pièces</span>
        </div>
      </div>
    </div>
  );
};