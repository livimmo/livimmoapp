import { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Property } from '@/types/property';
import { PropertyCard } from '../PropertyCard';

interface MapViewProps {
  properties: Property[];
}

export const MapView = ({ properties }: MapViewProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Centre de la carte sur le Maroc
  const center = {
    lat: 31.7917,
    lng: -7.0926
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={5}
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
              <PropertyCard property={selectedProperty} />
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};