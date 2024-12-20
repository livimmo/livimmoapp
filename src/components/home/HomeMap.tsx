import { useState } from 'react';
import { LiveStream, ScheduledLive } from '@/types/live';
import { Button } from '../ui/button';
import { ReservationForm } from './ReservationForm';
import { GoogleMapContainer } from './map/GoogleMapContainer';
import { Property } from '@/types/property';

interface HomeMapProps {
  properties: Property[];
}

export const HomeMap = ({ properties }: HomeMapProps) => {
  const [selectedLiveType, setSelectedLiveType] = useState<'current' | 'scheduled'>('current');
  const [showReservationDialog, setShowReservationDialog] = useState(false);
  const [selectedLive, setSelectedLive] = useState<LiveStream | ScheduledLive | null>(null);

  const currentLives: LiveStream[] = properties
    .filter((p): p is Property & { status: 'live' } => p.hasLive && p.status === 'live')
    .map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      thumbnail: p.images[0],
      agent: p.agent.name,
      location: p.location,
      type: p.type,
      price: p.price.toString(),
      status: 'live' as const,
      date: new Date(),
      availableSeats: 20,
      viewers: Math.floor(Math.random() * 100)
    }));

  const scheduledLives: ScheduledLive[] = properties
    .filter((p): p is Property & { status: 'scheduled' } => p.hasLive && p.status === 'scheduled')
    .map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      thumbnail: p.images[0],
      agent: p.agent.name,
      location: p.location,
      type: p.type,
      price: p.price.toString(),
      status: 'scheduled' as const,
      date: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000),
      availableSeats: 20,
      viewers: 0
    }));

  const livesToShow = selectedLiveType === 'current' ? currentLives : scheduledLives;

  const handleMarkerClick = (live: LiveStream | ScheduledLive | null) => {
    setSelectedLive(live);
    if (selectedLiveType === 'scheduled' && live) {
      setShowReservationDialog(true);
    }
  };

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

      <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
        <GoogleMapContainer
          selectedLiveType={selectedLiveType}
          livesToShow={livesToShow}
          onMarkerClick={handleMarkerClick}
          selectedLive={selectedLive}
        />
      </div>

      {selectedLive && showReservationDialog && (
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