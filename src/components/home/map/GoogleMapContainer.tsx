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

export const GoogleMapContainer = ({
  selectedLiveType,
  livesToShow,
  onMarkerClick,
  selectedLive
}: GoogleMapContainerProps) => {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);

  const center = {
    lat: 31.7917,
    lng: -7.0926
  };

  const mapStyles = {
    width: '100%',
    height: '400px'
  };

  const onLoad = (map: google.maps.Map) => {
    setMapRef(map);
  };

  useEffect(() => {
    if (mapRef) {
      const bounds = new google.maps.LatLngBounds();
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
        center={center}
        zoom={5}
        onLoad={onLoad}
      >
        {livesToShow.map(live => {
          const position = {
            lat: 31.7917 + Math.random() * 2 - 1,
            lng: -7.0926 + Math.random() * 2 - 1,
          };

          return (
            <Marker
              key={live.id}
              position={position}
              onClick={() => onMarkerClick(live)}
              icon={{
                url: selectedLiveType === 'current' ? '🔴' : '📅',
                scaledSize: new google.maps.Size(30, 30)
              }}
            >
              {selectedLive?.id === live.id && (
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