import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Property } from '@/types/property';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface HomeMapProps {
  properties: Property[];
}

// Create a dynamic import of the MapContainer component
const MapWithNoSSR = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), {
  ssr: false,
});

export const HomeMap = ({ properties }: HomeMapProps) => {
  const [mounted, setMounted] = useState(false);
  const center = { lat: 31.7917, lng: -7.0926 }; // Centre du Maroc
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg mb-8 bg-gray-100" />;
  }

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg mb-8">
      <MapWithNoSSR
        center={[center.lat, center.lng]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {properties.map((property) => (
          property.coordinates && (
            <Marker 
              key={property.id}
              position={[property.coordinates.lat, property.coordinates.lng]}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{property.title}</h3>
                  <p className="text-sm">{property.price.toLocaleString()} MAD</p>
                  <p className="text-sm text-gray-600">{property.location}</p>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapWithNoSSR>
    </div>
  );
};