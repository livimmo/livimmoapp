import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from "@/components/ui/button";
import { Video, MapPin } from "lucide-react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Create custom icons for live and regular properties
const createCustomIcon = (color: string) => {
  return L.divIcon({
    html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>`,
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
};

const liveIcon = createCustomIcon('#ea384c'); // Red for live properties
const regularIcon = createCustomIcon('#2563EB'); // Blue for regular properties

interface Property {
  id: number;
  image: string;
  title: string;
  price: number;
  location: string;
  hasLive?: boolean;
}

interface PropertyMapProps {
  properties: Property[];
}

export const PropertyMap = ({ properties }: PropertyMapProps) => {
  // Coordonnées du centre du Maroc
  const defaultCenter: [number, number] = [31.7917, -7.0926];

  return (
    <div className="h-[calc(100vh-200px)] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={defaultCenter}
        zoom={6}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[
              31.7917 + Math.random() * 2 - 1, // Random position for demo
              -7.0926 + Math.random() * 2 - 1  // Random position for demo
            ]}
            icon={property.hasLive ? liveIcon : regularIcon}
          >
            <Popup>
              <div className="p-2">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <h3 className="font-semibold">{property.title}</h3>
                <p className="text-sm text-muted-foreground">{property.location}</p>
                <p className="text-primary font-semibold">
                  {property.price.toLocaleString()} DH
                </p>
                {property.hasLive && (
                  <Button size="sm" className="w-full mt-2 bg-[#ea384c] text-white hover:bg-[#ea384c]/90">
                    <Video className="mr-2 h-4 w-4" />
                    Rejoindre le live
                  </Button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};