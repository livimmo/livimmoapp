import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Property } from "@/types/property";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon as unknown as string,
  iconRetinaUrl: markerIcon2x as unknown as string,
  shadowUrl: markerShadow as unknown as string,
});

interface PropertyMapProps {
  properties: Property[];
}

export const PropertyMap = ({ properties }: PropertyMapProps) => {
  // Centre par défaut sur le Maroc (coordonnées approximatives du centre du pays)
  const defaultCenter: [number, number] = [31.7917, -7.0926];
  
  // Calculer le centre de la carte basé sur les propriétés si disponibles
  const center = properties.length > 0
    ? [
        properties.reduce((sum, p) => sum + p.coordinates.lat, 0) / properties.length,
        properties.reduce((sum, p) => sum + p.coordinates.lng, 0) / properties.length,
      ] as [number, number]
    : defaultCenter;

  useEffect(() => {
    // Force une mise à jour de la carte quand les propriétés changent
    const map = L.map('map');
    return () => {
      map.remove();
    };
  }, [properties]);

  return (
    <div className="h-[500px] w-full relative z-0">
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
  );
};