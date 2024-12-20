import { Button } from "../../ui/button";

interface MapControlsProps {
  selectedLiveType: 'current' | 'scheduled';
  onTypeChange: (type: 'current' | 'scheduled') => void;
}

export const MapControls = ({ selectedLiveType, onTypeChange }: MapControlsProps) => {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant={selectedLiveType === 'current' ? 'default' : 'outline'}
        onClick={() => onTypeChange('current')}
        className="relative"
      >
        Lives en cours
        {selectedLiveType === 'current' && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        )}
      </Button>
      <Button
        variant={selectedLiveType === 'scheduled' ? 'default' : 'outline'}
        onClick={() => onTypeChange('scheduled')}
      >
        Lives programmés
      </Button>
    </div>
  );
};