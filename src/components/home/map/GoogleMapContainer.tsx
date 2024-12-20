import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { LiveStream, ScheduledLive } from '@/types/live';
import { MapMarkerContent } from './MapMarkerContent';
import { Property } from '@/types/property';

interface GoogleMapContainerProps {
  selectedLiveType: 'current' | 'scheduled';
  livesToShow: (LiveStream | ScheduledLive)[];
  onMarkerClick: (live: LiveStream | ScheduledLive) => void;
  selectedLive: LiveStream | ScheduledLive | null;
  properties: Property[];
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const mapStyles = {
  width: '100%',
  height: '400px'
};

const defaultCenter = {
  lat: 31.7917,
  lng: -7.0926
};

export const GoogleMapContainer = ({
  selectedLiveType,
  livesToShow,
  onMarkerClick,
  selectedLive,
  properties
}: GoogleMapContainerProps) => {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState<number | null>(null);

  const onLoad = (map: google.maps.Map) => {
    setMapRef(map);
  };

  const createMarkerIcon = (type: 'current' | 'scheduled', isHovered: boolean) => ({
    path: window.google.maps.SymbolPath.CIRCLE,
    fillColor: type === 'current' ? '#ea384c' : '#0ea5e9',
    fillOpacity: 0.9,
    strokeWeight: 2,
    strokeColor: 'white',
    scale: isHovered ? 12 : 10,
  });

  // Filtrer les propriétés avec des lives
  const liveProperties = properties.filter(property => property.hasLive);

  useEffect(() => {
    if (mapRef && liveProperties.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      liveProperties.forEach(property => {
        bounds.extend({
          lat: property.coordinates.lat,
          lng: property.coordinates.lng,
        });
      });
      mapRef.fitBounds(bounds);
    }
  }, [mapRef, liveProperties]);

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        center={defaultCenter}
        zoom={5}
        onLoad={onLoad}
        options={{
          styles: [
            {
              featureType: "all",
              elementType: "labels.text.fill",
              stylers: [{ color: "#6c7280" }]
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#e2e8f0" }]
            }
          ]
        }}
      >
        {liveProperties.map(property => {
          const isHovered = hoveredMarkerId === property.id;
          const isSelected = selectedLive?.id === property.id;
          const type = property.isLiveNow ? 'current' : 'scheduled';

          return (
            <Marker
              key={property.id}
              position={{
                lat: property.coordinates.lat,
                lng: property.coordinates.lng
              }}
              onClick={() => onMarkerClick(property as any)}
              onMouseOver={() => setHoveredMarkerId(property.id)}
              onMouseOut={() => setHoveredMarkerId(null)}
              icon={createMarkerIcon(type, isHovered || isSelected)}
              animation={isHovered ? window.google.maps.Animation.BOUNCE : undefined}
            >
              {(isSelected || isHovered) && (
                <InfoWindow onCloseClick={() => onMarkerClick(null)}>
                  <MapMarkerContent property={property} selectedLiveType={type} />
                </InfoWindow>
              )}
            </Marker>
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};