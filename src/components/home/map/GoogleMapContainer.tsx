import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { type Property } from "@/types/property";
import { MapMarkerContent } from "./MapMarkerContent";
import { LiveStream, ScheduledLive } from "@/types/live";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 31.7917,
  lng: -7.0926,
};

export interface GoogleMapContainerProps {
  properties: Property[];
  selectedLive?: LiveStream | ScheduledLive | null;
  onMarkerClick?: (live: LiveStream | ScheduledLive | null) => void;
}

export const GoogleMapContainer = ({ 
  properties,
  selectedLive,
  onMarkerClick 
}: GoogleMapContainerProps) => {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const onLoad = (map: google.maps.Map) => {
    setMapRef(map);
  };

  useEffect(() => {
    if (mapRef && properties.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      
      properties.forEach((property) => {
        if (property.coordinates) {
          bounds.extend({
            lat: property.coordinates.lat,
            lng: property.coordinates.lng,
          });
        }
      });
      
      mapRef.fitBounds(bounds);

      const currentZoom = mapRef.getZoom();
      if (currentZoom && currentZoom > 15) {
        mapRef.setZoom(15);
      }
    }
  }, [mapRef, properties]);

  const getMarkerIcon = (property: Property) => {
    if (property.isLiveNow) {
      return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    } else if (property.liveDate) {
      return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    }
    return "http://maps.google.com/mapfiles/ms/icons/purple-dot.png";
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={6}
        onLoad={onLoad}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        {properties.map((property) => (
          property.coordinates && (
            <Marker
              key={property.id}
              position={{
                lat: property.coordinates.lat,
                lng: property.coordinates.lng,
              }}
              icon={getMarkerIcon(property)}
              onClick={() => setSelectedProperty(property)}
            />
          )
        ))}
        {selectedProperty && (
          <MapMarkerContent
            property={selectedProperty}
            selectedLiveType={selectedProperty.isLiveNow ? 'current' : 'scheduled'}
            onClose={() => setSelectedProperty(null)}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};