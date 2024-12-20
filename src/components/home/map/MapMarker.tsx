import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { LiveStream } from '@/types/live';

interface MapMarkerProps {
  map: mapboxgl.Map;
  live: LiveStream;
  coordinates: { lat: number; lng: number };
  isLive: boolean;
  onMarkerClick: (live: LiveStream) => void;
}

export const MapMarker = ({ map, live, coordinates, isLive, onMarkerClick }: MapMarkerProps) => {
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);

  useEffect(() => {
    if (!map) return;

    // Create marker element
    const el = document.createElement('div');
    el.className = `flex items-center justify-center w-6 h-6 ${
      isLive ? 'bg-red-500 animate-pulse' : 'bg-blue-500'
    } rounded-full border-2 border-white shadow-lg cursor-pointer`;
    el.innerHTML = isLive ? '🔴' : '📅';

    // Format date
    const formattedDate = live.date
      ? new Date(live.date).toLocaleDateString('fr-FR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          hour: '2-digit',
          minute: '2-digit'
        })
      : '';

    // Create popup content
    const popupContent = document.createElement('div');
    popupContent.className = 'p-2 max-w-[300px]';
    popupContent.innerHTML = `
      <div class="flex gap-3">
        <div class="relative flex-shrink-0" style="width: 80px;">
          <img src="${live.thumbnail}" alt="${live.title}" class="w-[80px] h-[60px] object-cover rounded"/>
          ${isLive ? `
            <div class="absolute top-1 left-1">
              <div class="flex items-center justify-center w-4 h-4 bg-red-500 rounded-full animate-pulse">
                <span class="text-white text-[10px]">🔴</span>
              </div>
            </div>
          ` : ''}
        </div>
        <div class="flex-grow min-w-0">
          <h3 class="font-medium text-sm mb-1 truncate">${live.title}</h3>
          <p class="text-primary font-medium text-xs mb-1">${live.price}</p>
          <p class="text-xs text-gray-600 mb-1 truncate">${live.location}</p>
          <div class="text-xs text-gray-500 mb-2">
            ${isLive ? `${live.viewers} spectateurs` : formattedDate}
          </div>
        </div>
      </div>
      <button 
        class="w-full mt-2 px-2 py-1 text-xs bg-primary text-white rounded hover:bg-primary/90 transition-colors"
        data-live-id="${live.id}"
        data-action="${isLive ? 'join' : 'reserve'}"
      >
        ${isLive ? 'Rejoindre le live' : 'Réserver ma place'}
      </button>
    `;

    // Create popup
    const popup = new mapboxgl.Popup({ offset: 25 })
      .setDOMContent(popupContent);

    // Create marker
    const marker = new mapboxgl.Marker(el)
      .setLngLat([coordinates.lng, coordinates.lat])
      .setPopup(popup);

    marker.addTo(map);

    markerRef.current = marker;
    popupRef.current = popup;

    // Add click handler
    el.addEventListener('click', () => onMarkerClick(live));

    return () => {
      marker.remove();
      popup.remove();
      markerRef.current = null;
      popupRef.current = null;
    };
  }, [map, live, coordinates, isLive, onMarkerClick]);

  return null;
};