import { Button } from "@/components/ui/button";
import { type Property } from "@/types/property";

interface LiveInfoProps {
  property: Property;
  onMakeOffer: () => void;
}

export const LiveInfo = ({ property, onMakeOffer }: LiveInfoProps) => {
  return (
    <div className="space-y-4 p-4 bg-black/50 rounded-lg text-white max-w-md">
      <div>
        <h2 className="text-lg font-semibold">{property.title}</h2>
        <p className="text-sm opacity-75">{property.location}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <img
            src={property.agent.image}
            alt={property.agent.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm">{property.agent.name}</span>
        </div>
        <Button onClick={onMakeOffer} variant="default" size="sm">
          Faire une offre
        </Button>
      </div>
    </div>
  );
};