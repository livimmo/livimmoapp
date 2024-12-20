import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { LiveStream } from '@/types/live';

interface MapMarkerProps {
  live: LiveStream;
  map: mapboxgl.Map;
  type: 'current' | 'scheduled';
  onClick: (live: LiveStream) => void;
}

export const MapMarker = ({ live, map, type, onClick }: MapMarkerProps) => {
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);

  useEffect(() => {
    const coordinates = {
      lat: 31.7917 + Math.random() * 2 - 1,
      lng: -7.0926 + Math.random() * 2 - 1,
    };

    // Create marker element
    const el = document.createElement('div');
    el.className = `flex items-center justify-center w-6 h-6 ${
      type === 'current' 
        ? 'bg-red-500 animate-pulse' 
        : 'bg-blue-500'
    } rounded-full border-2 border-white shadow-lg cursor-pointer`;
    el.innerHTML = type === 'current' ? '🔴' : '📅';

    // Format date
    const formattedDate = live.date ? new Date(live.date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    }) : '';

    // Create popup content
    const popupContent = document.createElement('div');
    popupContent.className = 'p-2 max-w-[300px]';
    popupContent.innerHTML = `
      <div class="flex gap-3">
        <div class="relative flex-shrink-0" style="width: 80px;">
          <img src="${live.thumbnail}" alt="${live.title}" class="w-[80px] h-[60px] object-cover rounded"/>
          ${type === 'current' ? `
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
            ${type === 'current' 
              ? `${live.viewers} spectateurs`
              : formattedDate
            }
          </div>
        </div>
      </div>
      <button 
        class="w-full mt-2 px-2 py-1 text-xs bg-primary text-white rounded hover:bg-primary/90 transition-colors"
        data-live-id="${live.id}"
        data-action="${type === 'current' ? 'join' : 'reserve'}"
      >
        ${type === 'current' ? 'Rejoindre le live' : 'Réserver ma place'}
      </button>
    `;

    // Create popup
    const popup = new mapboxgl.Popup({ offset: 25 })
      .setDOMContent(popupContent);
    popupRef.current = popup;

    // Create marker
    const marker = new mapboxgl.Marker(el)
      .setLngLat([coordinates.lng, coordinates.lat])
      .setPopup(popup)
      .addTo(map);
    markerRef.current = marker;

    el.addEventListener('click', () => onClick(live));

    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
      }
      if (popupRef.current) {
        popupRef.current.remove();
      }
    };
  }, [live, map, type, onClick]);

  return null;
};