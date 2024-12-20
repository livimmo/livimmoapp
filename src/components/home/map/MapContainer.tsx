import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapContainerProps {
  onMapLoad: (map: mapboxgl.Map) => void;
}

export const MapContainer = ({ onMapLoad }: MapContainerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-7.0926, 31.7917],
      zoom: 5,
      accessToken: 'pk.eyJ1IjoibGl2aW1tbyIsImEiOiJjbHRwOWZ2Z2gwMXRqMmlxeDVrOXV4ZWd2In0.tHvZ6BrWHPRfZYrLHT_bwg'
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    mapInstance.current = map;

    map.on('load', () => {
      onMapLoad(map);
    });

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [onMapLoad]);

  return <div ref={mapContainer} className="w-full h-full" />;
};