import { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Property } from '@/types/property';
import { PropertyCard } from '../PropertyCard';

interface MapViewProps {
  properties: Property[];
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyBpyx3FTnDuj6a2XEKerIKFt87wxQYRov8';

export const MapView = ({ properties }: MapViewProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const handleMarkerClick = useCallback((property: Property) => {
    setSelectedProperty(property);
  }, []);

  // Centre de la carte sur le Maroc
  const center = {
    lat: 31.7917,
    lng: -7.0926
  };

  const mapStyles = {
    width: '100%',
    height: '600px'
  };

  return (
    <div className="w-full h-[600px] relative rounded-lg overflow-hidden">
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          center={center}
          zoom={5}
        >
          {properties.map((property) => (
            <Marker
              key={property.id}
              position={{
                lat: property.coordinates.lat,
                lng: property.coordinates.lng
              }}
              onClick={() => handleMarkerClick(property)}
            >
              {selectedProperty?.id === property.id && (
                <InfoWindow onCloseClick={() => setSelectedProperty(null)}>
                  <div className="w-[300px]">
                    <PropertyCard {...property} />
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};