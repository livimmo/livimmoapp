import { Property } from '@/types/property';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MapMarkerContentProps {
  property: Property;
  selectedLiveType: 'current' | 'scheduled';
}

export const MapMarkerContent = ({ property, selectedLiveType }: MapMarkerContentProps) => {
  const navigate = useNavigate();

  const formattedDate = property.live_date
    ? new Date(property.live_date).toLocaleDateString('fr-FR', {
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
            src={property.images[0]}
            alt={property.title}
            className="w-[120px] h-[90px] object-cover rounded-lg"
          />
          {selectedLiveType === 'current' && (
            <Badge variant="destructive" className="absolute top-2 left-2 animate-pulse">
              En direct
            </Badge>
          )}
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="font-medium text-sm mb-2 line-clamp-2">{property.title}</h3>
          <p className="text-primary font-medium text-sm mb-1">{property.price.toLocaleString()} DH</p>
          <p className="text-xs text-gray-600 mb-2">{property.location}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {selectedLiveType === 'current' ? (
              <>
                <Users className="w-3 h-3" />
                <span>{property.viewers || 0} spectateurs</span>
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
            ? navigate(`/live/${property.id}`)
            : navigate(`/live/schedule/${property.id}`)
        }
      >
        {selectedLiveType === 'current' ? 'Rejoindre le live' : 'Réserver ma place'}
      </Button>
    </div>
  );
};