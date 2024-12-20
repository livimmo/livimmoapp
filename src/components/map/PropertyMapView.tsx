import { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Property } from "@/types/property";
import { PropertyCard } from "@/components/PropertyCard";
import { Skeleton } from "@/components/ui/skeleton";

interface PropertyMapViewProps {
  properties: Property[];
  onMarkerClick?: (property: Property) => void;
}

export const PropertyMapView = ({ properties, onMarkerClick }: PropertyMapViewProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const center = properties.length > 0
    ? {
        lat: properties.reduce((sum, p) => sum + p.coordinates.lat, 0) / properties.length,
        lng: properties.reduce((sum, p) => sum + p.coordinates.lng, 0) / properties.length,
      }
    : { lat: 31.7917, lng: -7.0926 };

  return (
    <>
      {isLoading && (
        <Skeleton className="w-full h-[600px] rounded-lg" />
      )}
      <LoadScript 
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        onLoad={() => setIsLoading(false)}
      >
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '600px' }}
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
              onClick={() => {
                setSelectedProperty(property);
                onMarkerClick?.(property);
              }}
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
    </>
  );
};