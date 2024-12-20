import { useState, useCallback, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Property } from "@/types/property";
import { LiveEvent } from "@/types/live";
import { PropertyCard } from "@/components/PropertyCard";

interface GoogleMapContainerProps {
  selectedLiveType: "current" | "scheduled";
  livesToShow: LiveEvent[];
  onMarkerClick: (live: LiveEvent | null) => void;
  selectedLive: LiveEvent | null;
  properties: Property[];
}

const center = {
  lat: 31.7917,
  lng: -7.0926,
};

const mapStyles = {
  width: "100%",
  height: "600px",
};

export const GoogleMapContainer = ({
  selectedLiveType,
  livesToShow,
  onMarkerClick,
  selectedLive,
  properties,
}: GoogleMapContainerProps) => {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState<number | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMapRef(map);
  }, []);

  useEffect(() => {
    if (mapRef && properties.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      properties.forEach((property) => {
        bounds.extend({
          lat: property.coordinates.lat,
          lng: property.coordinates.lng,
        });
      });
      mapRef.fitBounds(bounds);
    }
  }, [mapRef, properties]);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        center={center}
        zoom={6}
        onLoad={onLoad}
        options={{
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={{
              lat: property.coordinates.lat,
              lng: property.coordinates.lng,
            }}
            onClick={() => setSelectedProperty(property)}
            onMouseOver={() => setHoveredMarkerId(property.id)}
            onMouseOut={() => setHoveredMarkerId(null)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: property.hasLive ? '#ea384c' : '#0ea5e9',
              fillOpacity: 0.9,
              strokeWeight: 2,
              strokeColor: 'white',
              scale: hoveredMarkerId === property.id ? 12 : 10,
            }}
          >
            {(selectedProperty?.id === property.id || hoveredMarkerId === property.id) && (
              <InfoWindow
                position={{
                  lat: property.coordinates.lat,
                  lng: property.coordinates.lng,
                }}
                onCloseClick={() => {
                  setSelectedProperty(null);
                  setHoveredMarkerId(null);
                }}
              >
                <div className="max-w-sm">
                  <PropertyCard {...property} />
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};