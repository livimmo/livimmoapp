import { useState } from 'react';
import { LiveStream, ScheduledLive } from '@/types/live';
import { Button } from '../ui/button';
import { ReservationForm } from './ReservationForm';
import { GoogleMapContainer } from './map/GoogleMapContainer';
import { Property } from '@/types/property';
import { useIsMobile } from '@/hooks/use-mobile';
import { LiveSlider } from '../live/LiveSlider';
import { liveStreams } from '@/data/mockLives';

interface HomeMapProps {
  properties: Property[];
}

export const HomeMap = ({ properties }: HomeMapProps) => {
  const [selectedLiveType, setSelectedLiveType] = useState<'current' | 'scheduled'>('current');
  const [showReservationDialog, setShowReservationDialog] = useState(false);
  const [selectedLive, setSelectedLive] = useState<LiveStream | ScheduledLive | null>(null);
  const isMobile = useIsMobile();

  const currentLives = liveStreams.filter(live => live.status === "live").map(live => ({
    ...live,
    date: live.date instanceof Date ? live.date : new Date(live.date)
  }));

  const handleMarkerClick = (live: LiveStream | ScheduledLive | null) => {
    if (live) {
      setSelectedLive({
        ...live,
        date: live.date instanceof Date ? live.date : new Date(live.date)
      });
      if (selectedLiveType === 'scheduled') {
        setShowReservationDialog(true);
      }
    } else {
      setSelectedLive(null);
    }
  };

  return (
    <section className="space-y-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Map Section */}
        <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
          <GoogleMapContainer
            properties={properties}
            selectedLive={selectedLive}
            onMarkerClick={handleMarkerClick}
          />
        </div>

        {/* Live Slider Section */}
        <div className="w-full h-[500px] bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Lives en cours</h3>
          <div className="h-[calc(100%-2rem)]">
            <LiveSlider lives={currentLives} />
          </div>
        </div>
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
    </section>
  );
};