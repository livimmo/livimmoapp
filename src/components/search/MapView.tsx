import { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Property } from '@/types/property';
import { PropertyCard } from '../PropertyCard';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { MapPin } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

interface MapViewProps {
  properties: Property[];
}

export const MapView = ({ properties }: MapViewProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const handleGeolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast({
            title: "Localisation réussie",
            description: "Voici les biens disponibles autour de vous.",
          });
        },
        () => {
          toast({
            variant: "destructive",
            title: "Erreur de localisation",
            description: "Impossible d'accéder à votre position. Veuillez vérifier vos paramètres.",
          });
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Géolocalisation non supportée",
        description: "Votre navigateur ne supporte pas la géolocalisation.",
      });
    }
  };

  // Centre de la carte sur le Maroc
  const center = {
    lat: 31.7917,
    lng: -7.0926
  };

  return (
    <div className="relative h-[calc(100vh-200px)] min-h-[600px]">
      {isLoading && (
        <Skeleton className="w-full h-full rounded-lg" />
      )}
      <Button 
        variant="outline" 
        size="icon" 
        className="absolute top-4 right-4 z-10"
        onClick={handleGeolocation}
      >
        <MapPin className="h-4 w-4" />
      </Button>
      <LoadScript 
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        onLoad={() => setIsLoading(false)}
      >
        <GoogleMap
          mapContainerClassName="w-full h-full rounded-lg"
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