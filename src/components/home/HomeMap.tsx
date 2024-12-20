import { useState } from 'react';
import { LiveStream, ScheduledLive } from '@/types/live';
import { Button } from '../ui/button';
import { ReservationForm } from './ReservationForm';
import { GoogleMapContainer } from './map/GoogleMapContainer';
import { liveStreams, scheduledLives } from '@/data/mockLives';

export const HomeMap = () => {
  const [selectedLiveType, setSelectedLiveType] = useState<'current' | 'scheduled'>('current');
  const [showReservationDialog, setShowReservationDialog] = useState(false);
  const [selectedLive, setSelectedLive] = useState<LiveStream | ScheduledLive | null>(null);

  const livesToShow = selectedLiveType === 'current' ? liveStreams : scheduledLives;

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