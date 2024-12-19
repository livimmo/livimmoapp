import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Property } from '@/types/property';

interface HomeMapProps {
  properties: Property[];
}

// Temporary public token - should be moved to environment variables
const MAPBOX_TOKEN = 'pk.eyJ1IjoibGl2aW1tbyIsImEiOiJjbHRwOWZ2Z2gwMXRqMmlxeDVrOXV4ZWd2In0.tHvZ6BrWHPRfZYrLHT_bwg';

export const HomeMap = ({ properties }: HomeMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-7.0926, 31.7917], // Centre du Maroc
      zoom: 5
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for properties
    properties.forEach((property) => {
      if (!property.coordinates) return;

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h3 class="font-semibold">${property.title}</h3>
          <p class="text-sm">${property.price.toLocaleString()} MAD</p>
          <p class="text-sm text-gray-600">${property.location}</p>
        </div>
      `);

      // Create marker
      new mapboxgl.Marker()
        .setLngLat([property.coordinates.lng, property.coordinates.lat])
        .setPopup(popup)
        .addTo(map.current!);
    });

    setMounted(true);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [properties]);

  if (!mounted) {
    return (
      <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg mb-8 bg-gray-100" />
    );
  }

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg mb-8">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};