import { useState, useCallback } from 'react';
import { Property } from '@/types/property';
import { Button } from '../ui/button';
import { MapContainer } from './map/MapContainer';
import { MapMarker } from './map/MapMarker';
import { ReservationForm } from './ReservationForm';
import { liveStreams, scheduledLives } from '@/data/mockLives';
import mapboxgl from 'mapbox-gl';

interface HomeMapProps {
  properties: Property[];
}

export const HomeMap = ({ properties }: HomeMapProps) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [selectedLiveType, setSelectedLiveType] = useState<'current' | 'scheduled'>('current');
  const [showReservationDialog, setShowReservationDialog] = useState(false);
  const [selectedLive, setSelectedLive] = useState<any>(null);

  const handleMapLoad = useCallback((mapInstance: mapboxgl.Map) => {
    setMap(mapInstance);
  }, []);

  const handleMarkerClick = useCallback((live: any) => {
    if (selectedLiveType === 'scheduled') {
      setSelectedLive(live);
      setShowReservationDialog(true);
    }
  }, [selectedLiveType]);

  const livesToShow = selectedLiveType === 'current' ? liveStreams : scheduledLives;

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
        <Button
          variant={selectedLiveType === 'current' ? 'default' : 'outline'}
          onClick={() => setSelectedLiveType('current')}
          className="relative"
        >
          Lives en cours
          {selectedLiveType === 'current' && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          )}
        </Button>
        <Button
          variant={selectedLiveType === 'scheduled' ? 'default' : 'outline'}
          onClick={() => setSelectedLiveType('scheduled')}
        >
          Lives programmés
        </Button>
      </div>

      <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
        <MapContainer onMapLoad={handleMapLoad} />
        {map && livesToShow.map((live) => (
          <MapMarker
            key={live.id}
            map={map}
            live={live}
            coordinates={{
              lat: 31.7917 + Math.random() * 2 - 1,
              lng: -7.0926 + Math.random() * 2 - 1,
            }}
            isLive={selectedLiveType === 'current'}
            onMarkerClick={handleMarkerClick}
          />
        ))}
      </div>

      {selectedLive && (
        <ReservationForm
          live={selectedLive}
          onClose={() => {
            setShowReservationDialog(false);
            setSelectedLive(null);
          }}
        />
      )}
    </div>
  );
};