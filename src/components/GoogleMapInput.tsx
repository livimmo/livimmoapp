import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Skeleton } from "./ui/skeleton";

interface GoogleMapInputProps {
  onLocationSelect?: (location: string) => void;
  value?: string;
  onChange?: (location: string) => void;
  required?: boolean;
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoibGl2aW1tbyIsImEiOiJjbHRwOWZ2Z2gwMXRqMmlxeDVrOXV4ZWd2In0.tHvZ6BrWHPRfZYrLHT_bwg';

const defaultCenter = {
  lng: -7.0926,
  lat: 31.7917
};

export const GoogleMapInput = ({ onLocationSelect, value, onChange, required }: GoogleMapInputProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [defaultCenter.lng, defaultCenter.lat],
      zoom: 5
    });

    marker.current = new mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([defaultCenter.lng, defaultCenter.lat])
      .addTo(map.current);

    map.current.addControl(new mapboxgl.NavigationControl());

    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      marker.current?.setLngLat([lng, lat]);
      handleLocationUpdate(lng, lat);
    });

    marker.current.on('dragend', () => {
      const { lng, lat } = marker.current!.getLngLat();
      handleLocationUpdate(lng, lat);
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
  }, []);

  const handleLocationUpdate = async (lng: number, lat: number) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`
      );
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const location = data.features[0].place_name;
        onLocationSelect?.(location);
        onChange?.(location);
      }
    } catch (error) {
      console.error("Erreur lors de la géocodification:", error);
    }
  };

  return (
    <>
      {isLoading && (
        <Skeleton className="w-full h-[300px] rounded-lg" />
      )}
      <div ref={mapContainer} className="w-full h-[300px] rounded-lg" />
    </>
  );
};