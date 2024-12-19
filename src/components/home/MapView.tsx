import { useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '@/types/property';
import { PropertyCard } from '../PropertyCard';
import { Button } from '../ui/button';
import { MapPin } from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapViewProps {
  properties: Property[];
}

export const MapView = ({ properties }: MapViewProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const handleMarkerClick = useCallback((property: Property) => {
    setSelectedProperty(property);
  }, []);

  // Centre de la carte sur le Maroc
  const center: [number, number] = [31.7917, -7.0926];

  return (
    <div className="w-full h-[600px] relative rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={5}
        className="w-full h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.coordinates.lat, property.coordinates.lng]}
            eventHandlers={{
              click: () => handleMarkerClick(property),
            }}
          >
            {selectedProperty?.id === property.id && (
              <Popup>
                <div className="w-[300px]">
                  <PropertyCard {...property} />
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};