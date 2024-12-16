import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface GoogleMapInputProps {
  onLocationSelect: (location: string) => void;
}

const defaultCenter = {
  lat: 31.7917,
  lng: -7.0926
};

const containerStyle = {
  width: '100%',
  height: '300px'
};

export const GoogleMapInput = ({ onLocationSelect }: GoogleMapInputProps) => {
  const [marker, setMarker] = useState(defaultCenter);

  const handleMapClick = async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarker({ lat, lng });

    try {
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({ location: { lat, lng } });
      
      if (response.results[0]) {
        onLocationSelect(response.results[0].formatted_address);
      }
    } catch (error) {
      console.error("Erreur lors de la géocodification:", error);
    }
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={6}
        onClick={handleMapClick}
      >
        <Marker position={marker} />
      </GoogleMap>
    </LoadScript>
  );
};