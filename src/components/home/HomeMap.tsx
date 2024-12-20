import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '@/types/property';
import { LiveEvent } from '@/types/live';
import { useNavigate } from 'react-router-dom';
import { ReservationForm } from './ReservationForm';
import { MapControls } from './map/MapControls';
import { MapPopup } from './map/MapPopup';
import { liveStreams, scheduledLives } from '@/data/mockLives';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface HomeMapProps {
  properties: Property[];
}

export const HomeMap = ({ properties }: HomeMapProps) => {
  const navigate = useNavigate();
  const [selectedLiveType, setSelectedLiveType] = useState<'current' | 'scheduled'>('current');
  const [showReservationDialog, setShowReservationDialog] = useState(false);
  const [selectedLive, setSelectedLive] = useState<LiveEvent | null>(null);
  const [mapElement, setMapElement] = useState<HTMLElement | null>(null);

  const handlePopupClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON') {
      const liveId = target.getAttribute('data-live-id');
      const action = target.getAttribute('data-action');
      
      if (action === 'join' && liveId) {
        navigate(`/live/${liveId}`);
      } else if (action === 'reserve' && liveId) {
        const livesToShow = selectedLiveType === 'current' ? liveStreams : scheduledLives;
        const selectedLiveData = livesToShow.find(l => l.id.toString() === liveId);
        if (selectedLiveData) {
          setSelectedLive(selectedLiveData);
          setShowReservationDialog(true);
        }
      }
    }
  };

  useEffect(() => {
    if (mapElement) {
      mapElement.addEventListener('click', handlePopupClick);
      return () => {
        mapElement.removeEventListener('click', handlePopupClick);
      };
    }
  }, [mapElement]);

  // Centre de la carte sur le Maroc
  const center: [number, number] = [31.7917, -7.0926];
  const livesToShow = selectedLiveType === 'current' ? liveStreams : scheduledLives;

  return (
    <div className="space-y-4">
      <MapControls 
        selectedLiveType={selectedLiveType} 
        onTypeChange={setSelectedLiveType} 
      />

      <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={center}
          zoom={5}
          className="w-full h-full"
          scrollWheelZoom={true}
          whenReady={({ target }) => {
            setMapElement(target.getContainer());
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {livesToShow.map((live) => {
            const coordinates = {
              lat: 31.7917 + Math.random() * 2 - 1,
              lng: -7.0926 + Math.random() * 2 - 1,
            };

            return (
              <Marker
                key={live.id}
                position={[coordinates.lat, coordinates.lng]}
                icon={L.divIcon({
                  className: `flex items-center justify-center w-6 h-6 ${
                    selectedLiveType === 'current' 
                      ? 'bg-red-500 animate-pulse' 
                      : 'bg-blue-500'
                  } rounded-full border-2 border-white shadow-lg cursor-pointer`,
                  html: selectedLiveType === 'current' ? '🔴' : '📅',
                })}
              >
                <Popup>
                  <MapPopup 
                    live={live} 
                    isCurrentLive={selectedLiveType === 'current'} 
                  />
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
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