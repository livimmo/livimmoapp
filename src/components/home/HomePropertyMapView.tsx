import { useState } from "react";
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import { Property } from "@/types/property";
import { PropertyCard } from "@/components/PropertyCard";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface HomePropertyMapViewProps {
  properties: Property[];
}

const libraries = ["places", "geometry"] as ["places", "geometry"];

export const HomePropertyMapView = ({ properties }: HomePropertyMapViewProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const { toast } = useToast();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

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

  const center = properties.length > 0
    ? {
        lat: properties.reduce((sum, p) => sum + p.coordinates.lat, 0) / properties.length,
        lng: properties.reduce((sum, p) => sum + p.coordinates.lng, 0) / properties.length,
      }
    : { lat: 31.7917, lng: -7.0926 };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <Skeleton className="w-full h-[600px] rounded-lg" />;
  }

  return (
    <div className="relative h-[600px] rounded-lg overflow-hidden">
      <Button 
        variant="outline" 
        size="icon" 
        className="absolute top-4 right-4 z-10 bg-white"
        onClick={handleGeolocation}
      >
        <MapPin className="h-4 w-4" />
      </Button>
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
    </div>
  );
};