import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Property } from '@/types/property';
import { liveStreams, scheduledLives } from '@/data/mockLives';
import { useNavigate } from 'react-router-dom';
import { MapControls } from './map/MapControls';
import { MapMarker } from './map/MapMarker';
import { ReservationForm } from './ReservationForm';

interface HomeMapProps {
  properties: Property[];
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoibGl2aW1tbyIsImEiOiJjbHRwOWZ2Z2gwMXRqMmlxeDVrOXV4ZWd2In0.tHvZ6BrWHPRfZYrLHT_bwg';

export const HomeMap = ({ properties }: HomeMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const navigate = useNavigate();
  const [selectedLiveType, setSelectedLiveType] = useState<'current' | 'scheduled'>('current');
  const [showReservationDialog, setShowReservationDialog] = useState(false);
  const [selectedLive, setSelectedLive] = useState<any>(null);

  const handlePopupClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON') {
      const liveId = target.getAttribute('data-live-id');
      const action = target.getAttribute('data-action');
      
      if (action === 'join' && liveId) {
        navigate(`/live/${liveId}`);
      } else if (action === 'reserve' && liveId) {
        const livesToShow = selectedLiveType === 'current' ? liveStreams : scheduledLives;
        const selectedLiveData = livesToShow.find(l => l.id.toString() === liveId);
        if (selectedLiveData) {
          setSelectedLive(selectedLiveData);
          setShowReservationDialog(true);
        }
      }
    }
  }, [navigate, selectedLiveType]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-7.0926, 31.7917],
      zoom: 5
    });

    newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current = newMap;

    // Add click event listener
    mapContainer.current.addEventListener('click', handlePopupClick);

    return () => {
      mapContainer.current?.removeEventListener('click', handlePopupClick);
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [handlePopupClick]);

  const livesToShow = selectedLiveType === 'current' ? liveStreams : scheduledLives;

  return (
    <div className="space-y-4">
      <MapControls 
        selectedLiveType={selectedLiveType}
        onTypeChange={setSelectedLiveType}
      />

      <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
        <div ref={mapContainer} className="w-full h-full">
          {map.current && livesToShow.map(live => (
            <MapMarker
              key={live.id}
              live={live}
              map={map.current!}
              type={selectedLiveType}
              onClick={(live) => {
                const action = selectedLiveType === 'current' ? 'join' : 'reserve';
                if (action === 'join') {
                  navigate(`/live/${live.id}`);
                } else {
                  setSelectedLive(live);
                  setShowReservationDialog(true);
                }
              }}
            />
          ))}
        </div>
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