import { useState } from 'react';
import { LiveStream, ScheduledLive } from '@/types/live';
import { Button } from '../ui/button';
import { ReservationForm } from './ReservationForm';
import { GoogleMapContainer } from './map/GoogleMapContainer';
import { Property } from '@/types/property';
import { useIsMobile } from '@/hooks/use-mobile';

interface HomeMapProps {
  properties: Property[];
}

export const HomeMap = ({ properties }: HomeMapProps) => {
  const [selectedLiveType, setSelectedLiveType] = useState<'current' | 'scheduled'>('current');
  const [showReservationDialog, setShowReservationDialog] = useState(false);
  const [selectedLive, setSelectedLive] = useState<LiveStream | ScheduledLive | null>(null);
  const isMobile = useIsMobile();

  const handleMarkerClick = (live: LiveStream | ScheduledLive | null) => {
    setSelectedLive(live);
    if (selectedLiveType === 'scheduled' && live) {
      setShowReservationDialog(true);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2 flex-wrap">
        <Button
          variant={selectedLiveType === 'current' ? 'default' : 'outline'}
          onClick={() => setSelectedLiveType('current')}
          className="relative"
          size={isMobile ? "sm" : "default"}
        >
          Lives en cours
          {selectedLiveType === 'current' && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          )}
        </Button>
        <Button
          variant={selectedLiveType === 'scheduled' ? 'default' : 'outline'}
          onClick={() => setSelectedLiveType('scheduled')}
          size={isMobile ? "sm" : "default"}
        >
          Lives programmés
        </Button>
      </div>

      <div className="relative w-full rounded-lg overflow-hidden shadow-lg h-[50vh] md:h-[600px]">
        <GoogleMapContainer
          properties={properties}
          selectedLive={selectedLive}
          onMarkerClick={handleMarkerClick}
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