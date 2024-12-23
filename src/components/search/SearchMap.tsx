import { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { type Property } from "@/types/property";
import { PropertyCard } from '../PropertyCard';
import { Skeleton } from '../ui/skeleton';

interface SearchMapProps {
  properties: Property[];
}

export const SearchMap = ({ properties }: SearchMapProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Centre de la carte sur le Maroc
  const center = {
    lat: 31.7917,
    lng: -7.0926
  };

  return (
    <div className="relative h-[calc(100vh-200px)] rounded-lg overflow-hidden">
      {isLoading && (
        <Skeleton className="w-full h-full rounded-lg" />
      )}
      <LoadScript 
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        onLoad={() => setIsLoading(false)}
      >
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={6}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: true,
            fullscreenControl: true,
          }}
        >
          {properties.map((property) => (
            <Marker
              key={property.id}
              position={{
                lat: property.coordinates.lat,
                lng: property.coordinates.lng
              }}
              onClick={() => setSelectedProperty(property)}
            />
          ))}

          {selectedProperty && (
            <InfoWindow
              position={{
                lat: selectedProperty.coordinates.lat,
                lng: selectedProperty.coordinates.lng
              }}
              onCloseClick={() => setSelectedProperty(null)}
            >
              <div className="w-[280px]">
                <PropertyCard {...selectedProperty} />
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};