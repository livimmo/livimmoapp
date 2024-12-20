import { LiveStream, ScheduledLive } from '@/types/live';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface MapMarkerContentProps {
  live: LiveStream | ScheduledLive;
  selectedLiveType: 'current' | 'scheduled';
}

export const MapMarkerContent = ({ live, selectedLiveType }: MapMarkerContentProps) => {
  const navigate = useNavigate();

  const formattedDate = live.date
    ? new Date(live.date).toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
      })
    : '';

  return (
    <div className="p-2 max-w-[300px]">
      <div className="flex gap-3">
        <div className="relative flex-shrink-0" style={{ width: 80 }}>
          <img
            src={live.thumbnail}
            alt={live.title}
            className="w-[80px] h-[60px] object-cover rounded"
          />
          {selectedLiveType === 'current' && (
            <div className="absolute top-1 left-1">
              <div className="flex items-center justify-center w-4 h-4 bg-red-500 rounded-full animate-pulse">
                <span className="text-white text-[10px]">🔴</span>
              </div>
            </div>
          )}
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="font-medium text-sm mb-1 truncate">{live.title}</h3>
          <p className="text-primary font-medium text-xs mb-1">{live.price}</p>
          <p className="text-xs text-gray-600 mb-1 truncate">{live.location}</p>
          <div className="text-xs text-gray-500 mb-2">
            {selectedLiveType === 'current' ? `${live.viewers} spectateurs` : formattedDate}
          </div>
        </div>
      </div>
      <Button
        className="w-full mt-2"
        size="sm"
        onClick={() =>
          selectedLiveType === 'current'
            ? navigate(`/live/${live.id}`)
            : navigate(`/live/schedule/${live.id}`)
        }
      >
        {selectedLiveType === 'current' ? 'Rejoindre le live' : 'Réserver ma place'}
      </Button>
    </div>
  );
};