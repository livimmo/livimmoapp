import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Property } from "@/types/property";
import { PropertyCard } from "@/components/PropertyCard";
import { Skeleton } from "@/components/ui/skeleton";

interface PropertyMapViewProps {
  properties: Property[];
  onMarkerClick?: (property: Property) => void;
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoibGl2aW1tbyIsImEiOiJjbHRwOWZ2Z2gwMXRqMmlxeDVrOXV4ZWd2In0.tHvZ6BrWHPRfZYrLHT_bwg';

export const PropertyMapView = ({ properties, onMarkerClick }: PropertyMapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    // Calculer le centre de la carte basé sur les propriétés
    const bounds = new mapboxgl.LngLatBounds();
    properties.forEach(property => {
      bounds.extend([property.coordinates.lng, property.coordinates.lat]);
    });

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: properties.length > 0 
        ? [(bounds.getEast() + bounds.getWest()) / 2, (bounds.getNorth() + bounds.getSouth()) / 2]
        : [-7.0926, 31.7917],
      zoom: properties.length > 0 ? 6 : 5
    });

    // Ajouter les contrôles de navigation
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Ajouter les marqueurs
    properties.forEach(property => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.innerHTML = '📍';
      el.style.cursor = 'pointer';
      el.style.fontSize = '24px';

      const marker = new mapboxgl.Marker(el)
        .setLngLat([property.coordinates.lng, property.coordinates.lat])
        .addTo(map.current!);

      el.addEventListener('click', () => {
        if (popupRef.current) {
          popupRef.current.remove();
        }

        setSelectedProperty(property);
        onMarkerClick?.(property);

        const popupContent = document.createElement('div');
        popupContent.className = 'popup-content w-[300px]';
        popupContent.innerHTML = `
          <div class="p-2">
            <img src="${property.images[0]}" alt="${property.title}" class="w-full h-[150px] object-cover rounded-lg mb-2" />
            <h3 class="font-semibold text-sm mb-1">${property.title}</h3>
            <p class="text-primary font-bold">${property.price.toLocaleString()} DH</p>
            <p class="text-sm text-gray-500">${property.location}</p>
          </div>
        `;

        popupRef.current = new mapboxgl.Popup({ closeButton: true, maxWidth: '300px' })
          .setLngLat([property.coordinates.lng, property.coordinates.lat])
          .setDOMContent(popupContent)
          .addTo(map.current!);
      });
    });

    map.current.on('load', () => {
      setIsLoading(false);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [properties, onMarkerClick]);

  return (
    <>
      {isLoading && (
        <Skeleton className="w-full h-[600px] rounded-lg" />
      )}
      <div ref={mapContainer} className="w-full h-[600px] rounded-lg" />
    </>
  );
};