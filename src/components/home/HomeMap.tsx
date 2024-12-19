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
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const popupsRef = useRef<mapboxgl.Popup[]>([]);
  const navigate = useNavigate();
  const [selectedLiveType, setSelectedLiveType] = useState<'current' | 'scheduled'>('current');
  const [showReservationDialog, setShowReservationDialog] = useState(false);
  const [selectedLive, setSelectedLive] = useState<any>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-7.0926, 31.7917],
      zoom: 5
    });

    newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    newMap.on('load', () => {
      setMap(newMap);
    });

    return () => {
      newMap.remove();
    };
  }, []);

  // Handle markers
  useEffect(() => {
    if (!map) return;

    const clearMarkers = () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      popupsRef.current.forEach(popup => popup.remove());
      popupsRef.current = [];
    };

    const handleJoinLive = (liveId: number) => {
      navigate(`/live/${liveId}`);
    };

    const handleReserveLive = (live: any) => {
      setSelectedLive(live);
      setShowReservationDialog(true);
    };

    clearMarkers();

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
      } rounded-full border border-white shadow-lg cursor-pointer hover:scale-110 transition-transform`;
      el.innerHTML = selectedLiveType === 'current' ? '🔴' : '📅';

      const popupContent = document.createElement('div');
      popupContent.className = 'p-2 max-w-[200px]';
      
      const formattedDate = selectedLiveType === 'scheduled' 
        ? new Date(live.date).toLocaleDateString('fr-FR', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
          })
        : null;

      popupContent.innerHTML = `
        <div class="relative mb-2">
          <img src="${live.thumbnail}" alt="${live.title}" class="w-full h-[100px] object-cover rounded"/>
          <div class="absolute bottom-1 left-1">
            <span class="px-1.5 py-0.5 rounded text-[10px] font-medium ${
              selectedLiveType === 'current'
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 text-white'
            }">
              ${selectedLiveType === 'current' ? 'Live' : 'Programmé'}
            </span>
          </div>
        </div>
        <h3 class="font-medium text-sm mb-1 line-clamp-1">${live.title}</h3>
        <p class="text-primary font-medium text-xs mb-1">${live.price}</p>
        <p class="text-xs text-gray-600 mb-1 line-clamp-1">${live.location}</p>
        <div class="flex items-center gap-1 text-xs text-gray-500 mb-2">
          ${selectedLiveType === 'current' 
            ? `<span>${live.viewers} 👥</span>`
            : `<span>${formattedDate}</span>`
          }
        </div>
        <div class="flex gap-1">
          <button 
            class="w-full px-2 py-1 bg-primary text-white text-xs rounded hover:bg-primary/90" 
            data-live-id="${live.id}"
            data-action="${selectedLiveType === 'current' ? 'join' : 'reserve'}"
          >
            ${selectedLiveType === 'current' ? 'Rejoindre' : 'Réserver'}
          </button>
        </div>
      `;

      const popup = new mapboxgl.Popup({ offset: 15, closeButton: true })
        .setDOMContent(popupContent);

      popupsRef.current.push(popup);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([coordinates.lng, coordinates.lat])
        .setPopup(popup)
        .addTo(map);

      markersRef.current.push(marker);

      // Add event listener to the popup content
      const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'BUTTON') {
          const action = target.getAttribute('data-action');
          const liveId = target.getAttribute('data-live-id');
          
          if (action === 'join' && liveId) {
            handleJoinLive(Number(liveId));
          } else if (action === 'reserve') {
            handleReserveLive(live);
          }
        }
      };

      popupContent.addEventListener('click', handleClick);

      // Clean up event listener when popup closes
      popup.on('close', () => {
        popupContent.removeEventListener('click', handleClick);
      });
    });

    return () => {
      clearMarkers();
    };
  }, [map, selectedLiveType, navigate]);

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