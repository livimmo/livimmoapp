import { LiveStream, ScheduledLive } from '@/types/live';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar } from 'lucide-react';

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
    <div className="p-3 max-w-[300px] bg-white rounded-lg shadow-lg">
      <div className="flex gap-3">
        <div className="relative flex-shrink-0" style={{ width: 120 }}>
          <img
            src={live.thumbnail}
            alt={live.title}
            className="w-[120px] h-[90px] object-cover rounded-lg"
          />
          {selectedLiveType === 'current' && (
            <Badge variant="destructive" className="absolute top-2 left-2 animate-pulse">
              En direct
            </Badge>
          )}
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="font-medium text-sm mb-2 line-clamp-2">{live.title}</h3>
          <p className="text-primary font-medium text-sm mb-1">{live.price}</p>
          <p className="text-xs text-gray-600 mb-2">{live.location}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {selectedLiveType === 'current' ? (
              <>
                <Users className="w-3 h-3" />
                <span>{live.viewers} spectateurs</span>
              </>
            ) : (
              <>
                <Calendar className="w-3 h-3" />
                <span>{formattedDate}</span>
              </>
            )}
          </div>
        </div>
      </div>
      <Button
        className="w-full mt-3"
        size="sm"
        variant={selectedLiveType === 'current' ? 'destructive' : 'default'}
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