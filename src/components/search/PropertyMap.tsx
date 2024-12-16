import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Property } from "@/types/property";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { PropertyCard } from '../PropertyCard';
import { ScrollArea } from '../ui/scroll-area';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface PropertyMapProps {
  properties: Property[];
}

export const PropertyMap = ({ properties }: PropertyMapProps) => {
  const defaultCenter: [number, number] = [31.7917, -7.0926];
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  // Calculer le centre de la carte basé sur les propriétés si disponibles
  const center = properties.length > 0
    ? [
        properties.reduce((sum, p) => sum + p.coordinates.lat, 0) / properties.length,
        properties.reduce((sum, p) => sum + p.coordinates.lng, 0) / properties.length,
      ] as [number, number]
    : defaultCenter;

  const handleMarkerClick = (property: Property) => {
    setSelectedProperty(property);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[700px]">
      <div className="relative h-full">
        <MapContainer
          center={center}
          zoom={6}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
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
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{property.title}</h3>
                  <p className="text-sm">{property.price.toLocaleString()} DH</p>
                  <p className="text-sm text-gray-500">{property.location}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <ScrollArea className="h-full bg-white rounded-lg shadow-lg p-4">
        <div className="space-y-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className={`cursor-pointer transition-all ${
                selectedProperty?.id === property.id
                  ? "ring-2 ring-primary rounded-lg"
                  : ""
              }`}
              onClick={() => handleMarkerClick(property)}
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};