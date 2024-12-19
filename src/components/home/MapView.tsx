import { useState, useCallback, useRef } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Property } from '@/types/property';
import { PropertyCard } from '../PropertyCard';
import { Button } from '../ui/button';
import { MapPin } from 'lucide-react';

interface MapViewProps {
  properties: Property[];
}

export const MapView = ({ properties }: MapViewProps) => {
  const [popupInfo, setPopupInfo] = useState<Property | null>(null);
  const mapRef = useRef(null);

  const [viewState, setViewState] = useState({
    latitude: 31.7917,
    longitude: -7.0926,
    zoom: 5
  });

  const onMarkerClick = useCallback((property: Property) => {
    setPopupInfo(property);
  }, []);

  return (
    <div className="w-full h-[600px] relative rounded-lg overflow-hidden">
      <Map
        ref={mapRef}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="top-right" />

        {properties.map((property) => (
          <Marker
            key={property.id}
            latitude={property.coordinates.lat}
            longitude={property.coordinates.lng}
            anchor="bottom"
            onClick={e => {
              e.originalEvent.stopPropagation();
              onMarkerClick(property);
            }}
          >
            <Button
              variant="outline"
              size="icon"
              className="bg-white hover:bg-primary hover:text-white transition-colors"
            >
              <MapPin className="h-4 w-4" />
            </Button>
          </Marker>
        ))}

        {popupInfo && (
          <Popup
            anchor="bottom"
            latitude={popupInfo.coordinates.lat}
            longitude={popupInfo.coordinates.lng}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
            className="w-[300px]"
          >
            <PropertyCard {...popupInfo} />
          </Popup>
        )}
      </Map>
    </div>
  );
};