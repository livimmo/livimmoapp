import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Property } from '@/types/property';
import { liveStreams, scheduledLives } from '@/data/mockLives';
import { useNavigate } from 'react-router-dom';
import { ReservationForm } from './ReservationForm';
import { MapControls } from './MapControls';
import { MapPopupContent } from './MapPopupContent';

interface HomeMapProps {
  properties: Property[];
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoibGl2aW1tbyIsImEiOiJjbHRwOWZ2Z2gwMXRqMmlxeDVrOXV4ZWd2In0.tHvZ6BrWHPRfZYrLHT_bwg';

export const HomeMap = ({ properties }: HomeMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const popupsRef = useRef<mapboxgl.Popup[]>([]);
  const navigate = useNavigate();
  const [selectedLiveType, setSelectedLiveType] = useState<'current' | 'scheduled'>('current');
  const [showReservationDialog, setShowReservationDialog] = useState(false);
  const [selectedLive, setSelectedLive] = useState<any>(null);

  const handlePopupClick = (e: MouseEvent) => {
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
  };

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

    mapContainer.current.addEventListener('click', handlePopupClick);

    return () => {
      mapContainer.current?.removeEventListener('click', handlePopupClick);
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    popupsRef.current.forEach(popup => popup.remove());
    popupsRef.current = [];

    const livesToShow = selectedLiveType === 'current' ? liveStreams : scheduledLives;

    livesToShow.forEach(live => {
      const coordinates = {
        lat: 31.7917 + Math.random() * 2 - 1,
        lng: -7.0926 + Math.random() * 2 - 1,
      };

      const el = document.createElement('div');
      el.className = `flex items-center justify-center w-6 h-6 ${
        selectedLiveType === 'current' 
          ? 'bg-red-500 animate-pulse' 
          : 'bg-blue-500'
      } rounded-full border-2 border-white shadow-lg cursor-pointer`;
      el.innerHTML = selectedLiveType === 'current' ? '🔴' : '📅';

      const formattedDate = live.date ? new Date(live.date).toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
      }) : '';

      const popupContent = document.createElement('div');
      const popupReactContent = MapPopupContent({ 
        live, 
        selectedLiveType, 
        formattedDate 
      });
      popupContent.innerHTML = popupReactContent.props.children.outerHTML;

      const popup = new mapboxgl.Popup({ offset: 25 })
        .setDOMContent(popupContent);
      popupsRef.current.push(popup);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([coordinates.lng, coordinates.lat])
        .setPopup(popup)
        .addTo(map.current!);
      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      popupsRef.current.forEach(popup => popup.remove());
      popupsRef.current = [];
    };
  }, [map.current, selectedLiveType, navigate]);

  return (
    <div className="space-y-4">
      <MapControls 
        selectedLiveType={selectedLiveType} 
        onTypeChange={setSelectedLiveType}
      />

      <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
        <div ref={mapContainer} className="w-full h-full" />
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