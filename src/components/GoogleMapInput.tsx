import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Skeleton } from "./ui/skeleton";

interface GoogleMapInputProps {
  onLocationSelect?: (location: string) => void;
  value?: string;
  onChange?: (location: string) => void;
  required?: boolean;
}

const defaultCenter = {
  lat: 31.7917,
  lng: -7.0926
};

const containerStyle = {
  width: '100%',
  height: '300px'
};

const libraries: ("places" | "geometry" | "drawing" | "localContext" | "visualization")[] = ["places"];

export const GoogleMapInput = ({ onLocationSelect, value, onChange, required }: GoogleMapInputProps) => {
  const [marker, setMarker] = useState(defaultCenter);
  const [isLoading, setIsLoading] = useState(true);

  const handleMapClick = async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarker({ lat, lng });

    try {
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({ location: { lat, lng } });
      
      if (response.results[0]) {
        const location = response.results[0].formatted_address;
        onLocationSelect?.(location);
        onChange?.(location);
      }
    } catch (error) {
      console.error("Erreur lors de la géocodification:", error);
    }
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
    <>
      {isLoading && (
        <Skeleton className="w-full h-[300px] rounded-lg" />
      )}
      <LoadScript 
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
        onLoad={handleLoad}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={6}
          onClick={handleMapClick}
        >
          <Marker position={marker} />
        </GoogleMap>
      </LoadScript>
    </>
  );
};