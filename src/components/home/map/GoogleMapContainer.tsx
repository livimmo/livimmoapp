import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { LiveStream, ScheduledLive } from '@/types/live';
import { MapMarkerContent } from './MapMarkerContent';

interface GoogleMapContainerProps {
  selectedLiveType: 'current' | 'scheduled';
  livesToShow: (LiveStream | ScheduledLive)[];
  onMarkerClick: (live: LiveStream | ScheduledLive) => void;
  selectedLive: LiveStream | ScheduledLive | null;
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyBpyx3FTnDuj6a2XEKerIKFt87wxQYRov8';

const mapStyles = {
  width: '100%',
  height: '400px'
};

const defaultCenter = {
  lat: 31.7917,
  lng: -7.0926
};

const createMarkerIcon = (type: 'current' | 'scheduled') => {
  const color = type === 'current' ? '#ea384c' : '#0ea5e9';
  return {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: color,
    fillOpacity: 0.9,
    strokeWeight: 2,
    strokeColor: 'white',
    scale: 10,
  };
};

export const GoogleMapContainer = ({
  selectedLiveType,
  livesToShow,
  onMarkerClick,
  selectedLive
}: GoogleMapContainerProps) => {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState<number | null>(null);

  const onLoad = (map: google.maps.Map) => {
    setMapRef(map);
  };

  useEffect(() => {
    if (mapRef && livesToShow.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      livesToShow.forEach(live => {
        bounds.extend({
          lat: 31.7917 + Math.random() * 2 - 1,
          lng: -7.0926 + Math.random() * 2 - 1,
        });
      });
      mapRef.fitBounds(bounds);
    }
  }, [mapRef, livesToShow]);

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
        {livesToShow.map(live => {
          const position = {
            lat: 31.7917 + Math.random() * 2 - 1,
            lng: -7.0926 + Math.random() * 2 - 1,
          };

          const isHovered = hoveredMarkerId === live.id;
          const isSelected = selectedLive?.id === live.id;
          const scale = isHovered || isSelected ? 12 : 10;

          return (
            <Marker
              key={live.id}
              position={position}
              onClick={() => onMarkerClick(live)}
              onMouseOver={() => setHoveredMarkerId(live.id)}
              onMouseOut={() => setHoveredMarkerId(null)}
              icon={{
                ...createMarkerIcon(selectedLiveType),
                scale: scale,
              }}
              animation={isHovered ? google.maps.Animation.BOUNCE : undefined}
            >
              {(isSelected || isHovered) && (
                <InfoWindow onCloseClick={() => onMarkerClick(null)}>
                  <MapMarkerContent live={live} selectedLiveType={selectedLiveType} />
                </InfoWindow>
              )}
            </Marker>
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};