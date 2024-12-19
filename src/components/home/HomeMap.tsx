import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Property } from '@/types/property';
import { liveStreams, scheduledLives } from '@/data/mockLives';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { ReservationForm } from './ReservationForm';

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

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Handle markers and popups
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers and popups
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

      // Create marker element
      const el = document.createElement('div');
      el.className = `flex items-center justify-center w-6 h-6 ${
        selectedLiveType === 'current' 
          ? 'bg-red-500 animate-pulse' 
          : 'bg-blue-500'
      } rounded-full border-2 border-white shadow-lg cursor-pointer`;
      el.innerHTML = selectedLiveType === 'current' ? '🔴' : '📅';

      // Create popup content
      const popupContent = document.createElement('div');
      popupContent.className = 'p-2 max-w-[200px]';
      
      const formattedDate = live.date ? new Date(live.date).toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
      }) : '';

      popupContent.innerHTML = `
        <div class="mb-2">
          <img src="${live.thumbnail}" alt="${live.title}" class="w-full h-[100px] object-cover rounded"/>
          <div class="absolute bottom-1 left-1">
            <span class="px-2 py-0.5 rounded-full text-xs font-medium ${
              selectedLiveType === 'current'
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 text-white'
            }">
              ${selectedLiveType === 'current' ? 'Live en cours' : 'Live programmé'}
            </span>
          </div>
        </div>
        <h3 class="font-medium text-sm mb-1">${live.title}</h3>
        <p class="text-primary font-medium text-sm mb-1">${live.price}</p>
        <p class="text-xs text-gray-600 mb-1">${live.location}</p>
        <div class="text-xs text-gray-500 mb-2">
          ${selectedLiveType === 'current' 
            ? `${live.viewers} spectateurs`
            : formattedDate
          }
        </div>
        <button 
          class="w-full px-2 py-1 text-xs bg-primary text-white rounded hover:bg-primary/90 transition-colors"
          data-live-id="${live.id}"
          data-action="${selectedLiveType === 'current' ? 'join' : 'reserve'}"
        >
          ${selectedLiveType === 'current' ? 'Rejoindre le live' : 'Réserver ma place'}
        </button>
      `;

      // Add click handlers
      popupContent.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'BUTTON') {
          const liveId = target.getAttribute('data-live-id');
          const action = target.getAttribute('data-action');
          
          if (action === 'join' && liveId) {
            navigate(`/live/${liveId}`);
          } else if (action === 'reserve' && liveId) {
            const selectedLiveData = livesToShow.find(l => l.id.toString() === liveId);
            if (selectedLiveData) {
              setSelectedLive(selectedLiveData);
              setShowReservationDialog(true);
            }
          }
        }
      });

      // Create and store popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setDOMContent(popupContent);
      popupsRef.current.push(popup);

      // Create and store marker
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