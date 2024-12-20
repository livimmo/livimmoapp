import { useEffect, useRef, useState } from "react";
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

export const GoogleMapInput = ({ onLocationSelect, value, onChange, required }: GoogleMapInputProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);

  const handleMapClick = async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPosition({ lat, lng });

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

  return (
    <>
      {isLoading && (
        <Skeleton className="w-full h-[300px] rounded-lg" />
      )}
      <LoadScript 
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        onLoad={() => setIsLoading(false)}
      >
        <GoogleMap
          mapContainerClassName="w-full h-[300px] rounded-lg"
          center={defaultCenter}
          zoom={5}
          onClick={handleMapClick}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: true,
            fullscreenControl: true,
          }}
        >
          <Marker
            position={markerPosition}
            draggable={true}
            onDragEnd={async (e) => {
              if (!e.latLng) return;
              const lat = e.latLng.lat();
              const lng = e.latLng.lng();
              setMarkerPosition({ lat, lng });
              
              const geocoder = new google.maps.Geocoder();
              const response = await geocoder.geocode({ location: { lat, lng } });
              
              if (response.results[0]) {
                const location = response.results[0].formatted_address;
                onLocationSelect?.(location);
                onChange?.(location);
              }
            }}
          />
        </GoogleMap>
      </LoadScript>
    </>
  );
};