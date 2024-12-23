import { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Property } from "@/types/property";
import { PropertyCard } from '../PropertyCard';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { Circle } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

interface PropertyMapProps {
  properties: Property[];
}

const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = ["places"];

export const PropertyMap = ({ properties }: PropertyMapProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const defaultCenter = {
    lat: 31.7917,
    lng: -7.0926
  };
  
  const center = properties.length > 0
    ? {
        lat: properties.reduce((sum, p) => sum + p.coordinates.lat, 0) / properties.length,
        lng: properties.reduce((sum, p) => sum + p.coordinates.lng, 0) / properties.length,
      }
    : defaultCenter;

  const containerStyle = {
    width: '100%',
    height: '100%'
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (!import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Clé API Google Maps manquante. Veuillez configurer VITE_GOOGLE_MAPS_API_KEY.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[700px]">
      <div className="relative h-[400px] lg:h-full rounded-lg overflow-hidden">
        {isLoading && (
          <Skeleton className="w-full h-full rounded-lg" />
        )}
        <LoadScript 
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          libraries={libraries}
          onLoad={handleLoad}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={6}
            options={{
              disableDefaultUI: false,
              zoomControl: true,
              fullscreenControl: true,
              mapTypeControl: true,
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
                options={{
                  maxWidth: 280,
                  pixelOffset: new google.maps.Size(0, -20)
                }}
              >
                <div className="max-w-[260px] scale-90 origin-top">
                  <PropertyCard {...selectedProperty} />
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>

      <ScrollArea className="h-[300px] lg:h-full bg-white rounded-lg shadow-lg p-4">
        <div className="space-y-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className={`cursor-pointer transition-all ${
                selectedProperty?.id === property.id
                  ? "ring-2 ring-primary rounded-lg"
                  : ""
              }`}
              onClick={() => setSelectedProperty(property)}
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};