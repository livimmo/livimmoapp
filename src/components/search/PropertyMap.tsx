import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from "@/components/ui/button";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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
                  <Button size="sm" className="w-full mt-2">
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