import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Property } from '@/types/property';
import { liveStreams, scheduledLives } from '@/data/mockLives';
import { useNavigate } from 'react-router-dom';

interface HomeMapProps {
  properties: Property[];
}

// Temporary public token - should be moved to environment variables
const MAPBOX_TOKEN = 'pk.eyJ1IjoibGl2aW1tbyIsImEiOiJjbHRwOWZ2Z2gwMXRqMmlxeDVrOXV4ZWd2In0.tHvZ6BrWHPRfZYrLHT_bwg';

export const HomeMap = ({ properties }: HomeMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapContainer.current || map) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-7.0926, 31.7917], // Centre du Maroc
      zoom: 5
    });

    newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
    setMap(newMap);

    return () => {
      newMap.remove();
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Convertir les lives en propriétés avec coordonnées
    const currentLiveProperties = liveStreams.map(live => ({
      ...live,
      coordinates: {
        lat: 31.7917 + Math.random() * 2 - 1,
        lng: -7.0926 + Math.random() * 2 - 1,
      }
    }));

    const scheduledLiveProperties = scheduledLives.map(live => ({
      ...live,
      coordinates: {
        lat: 31.7917 + Math.random() * 2 - 1,
        lng: -7.0926 + Math.random() * 2 - 1,
      }
    }));

    // Add current live markers
    currentLiveProperties.forEach(live => {
      const el = document.createElement('div');
      el.className = 'flex items-center justify-center w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse';
      el.innerHTML = '🔴';

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h3 class="font-semibold">${live.title}</h3>
          <p class="text-sm">${live.price}</p>
          <p class="text-sm text-red-500">Live en cours</p>
          <p class="text-sm">${live.viewers} spectateurs</p>
        </div>
      `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([live.coordinates.lng, live.coordinates.lat])
        .setPopup(popup)
        .addTo(map);

      markersRef.current.push(marker);
    });

    // Add scheduled live markers
    scheduledLiveProperties.forEach(live => {
      const el = document.createElement('div');
      el.className = 'flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-lg';
      el.innerHTML = '📅';

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h3 class="font-semibold">${live.title}</h3>
          <p class="text-sm">${live.price}</p>
          <p class="text-sm text-blue-500">Live programmé</p>
          <p class="text-sm">Le ${new Date(live.date).toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>
      `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([live.coordinates.lng, live.coordinates.lat])
        .setPopup(popup)
        .addTo(map);

      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
    };
  }, [map, properties]);

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg mb-8">
      <div ref={mapContainer} className="w-full h-full" />
      <div className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            <span>Lives en cours</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span>Lives programmés</span>
          </div>
        </div>
      </div>
    </div>
  );
};