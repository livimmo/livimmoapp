import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Property } from '@/types/property';
import { liveStreams, scheduledLives } from '@/data/mockLives';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Clock, Users } from 'lucide-react';
import { ReservationForm } from './ReservationForm';
import { Dialog } from '../ui/dialog';

interface HomeMapProps {
  properties: Property[];
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoibGl2aW1tbyIsImEiOiJjbHRwOWZ2Z2gwMXRqMmlxeDVrOXV4ZWd2In0.tHvZ6BrWHPRfZYrLHT_bwg';

export const HomeMap = ({ properties }: HomeMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const navigate = useNavigate();
  const [selectedLiveType, setSelectedLiveType] = useState<'current' | 'scheduled'>('current');
  const [showReservationDialog, setShowReservationDialog] = useState(false);
  const [selectedLive, setSelectedLive] = useState<any>(null);

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
    setMap(newMap);

    return () => {
      newMap.remove();
    };
  }, []);

  const handleJoinLive = (liveId: number) => {
    navigate(`/live/${liveId}`);
  };

  const handleReserveLive = (live: any) => {
    setSelectedLive(live);
    setShowReservationDialog(true);
  };

  useEffect(() => {
    if (!map) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    const livesToShow = selectedLiveType === 'current' ? liveStreams : scheduledLives;

    livesToShow.forEach(live => {
      const coordinates = {
        lat: 31.7917 + Math.random() * 2 - 1,
        lng: -7.0926 + Math.random() * 2 - 1,
      };

      const el = document.createElement('div');
      el.className = `flex items-center justify-center w-8 h-8 ${
        selectedLiveType === 'current' 
          ? 'bg-red-500 animate-pulse' 
          : 'bg-blue-500'
      } rounded-full border-2 border-white shadow-lg`;
      el.innerHTML = selectedLiveType === 'current' ? '🔴' : '📅';

      const popupContent = document.createElement('div');
      popupContent.className = 'p-4 max-w-[300px]';
      popupContent.innerHTML = `
        <div class="relative mb-4">
          <img src="${live.thumbnail}" alt="${live.title}" class="w-full h-[150px] object-cover rounded-lg"/>
          <div class="absolute bottom-2 left-2">
            <span class="px-2 py-1 rounded-full text-xs font-semibold ${
              selectedLiveType === 'current'
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 text-white'
            }">
              ${selectedLiveType === 'current' ? 'Live en cours' : 'Live programmé'}
            </span>
          </div>
        </div>
        <h3 class="font-semibold text-lg mb-2">${live.title}</h3>
        <p class="text-primary font-bold mb-2">${live.price}</p>
        <p class="text-sm text-gray-600 mb-2">${live.location}</p>
        <div class="flex items-center gap-2 text-sm text-gray-500 mb-4">
          ${selectedLiveType === 'current' 
            ? `<span>${live.viewers} spectateurs</span>`
            : `<span>${new Date(live.date).toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>`
          }
        </div>
        <div class="flex gap-2">
          ${selectedLiveType === 'current' 
            ? `<button class="join-live-btn w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                Rejoindre le live
               </button>`
            : `<button class="reserve-live-btn w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                Réserver ma place
               </button>`
          }
        </div>
      `;

      const popup = new mapboxgl.Popup({ offset: 25 })
        .setDOMContent(popupContent);

      // Add click handlers after popup is added to DOM
      popup.on('open', () => {
        const joinBtn = popupContent.querySelector('.join-live-btn');
        const reserveBtn = popupContent.querySelector('.reserve-live-btn');

        if (joinBtn) {
          joinBtn.addEventListener('click', () => handleJoinLive(live.id));
        }
        if (reserveBtn) {
          reserveBtn.addEventListener('click', () => handleReserveLive(live));
        }
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat([coordinates.lng, coordinates.lat])
        .setPopup(popup)
        .addTo(map);

      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
    };
  }, [map, selectedLiveType]);

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