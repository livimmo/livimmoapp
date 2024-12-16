import { Button } from "@/components/ui/button";
import { Property } from "@/types/property";

interface LiveStreamingViewProps {
  property: Property | null;
  onEndStream: () => void;
}

export const LiveStreamingView = ({ property, onEndStream }: LiveStreamingViewProps) => {
  return (
    <div className="relative w-full h-full bg-black">
      <div className="absolute top-4 right-4 z-10">
        <Button 
          variant="destructive" 
          onClick={onEndStream}
        >
          Terminer le live
        </Button>
      </div>
      
      {property && (
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-xl font-bold">{property.title}</h2>
          <p>{property.location}</p>
          <p className="text-xl font-bold">{property.price.toLocaleString()} DH</p>
        </div>
      )}
    </div>
  );
};