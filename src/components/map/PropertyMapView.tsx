import { useState } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Property } from "@/types/property";
import { PropertyCard } from "@/components/PropertyCard";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface PropertyMapViewProps {
  properties: Property[];
  onMarkerClick?: (property: Property) => void;
  hoveredProperty?: Property | null;
}

export const PropertyMapView = ({ properties, onMarkerClick, hoveredProperty }: PropertyMapViewProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const { toast } = useToast();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places", "geometry"]
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

  if (loadError) {
    return (
      <div className="p-4 text-center text-red-500">
        Erreur de chargement de la carte
      </div>
    );
  }

  if (!isLoaded) {
    return <Skeleton className="w-full h-full rounded-lg" />;
  }

  const center = properties.length > 0
    ? {
        lat: properties.reduce((sum, p) => sum + p.coordinates.lat, 0) / properties.length,
        lng: properties.reduce((sum, p) => sum + p.coordinates.lng, 0) / properties.length,
      }
    : { lat: 31.7917, lng: -7.0926 };

  return (
    <>
      <Button 
        variant="outline" 
        size="icon" 
        className="absolute top-4 right-4 z-10 bg-white"
        onClick={handleGeolocation}
      >
        <MapPin className="h-4 w-4" />
      </Button>

      <GoogleMap
        mapContainerClassName="w-full h-full"
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

        {(hoveredProperty || selectedProperty) && (
          <InfoWindow
            position={{
              lat: (hoveredProperty || selectedProperty)!.coordinates.lat,
              lng: (hoveredProperty || selectedProperty)!.coordinates.lng
            }}
            onCloseClick={() => setSelectedProperty(null)}
          >
            <div className="w-[280px]">
              <PropertyCard {...(hoveredProperty || selectedProperty)!} />
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
};