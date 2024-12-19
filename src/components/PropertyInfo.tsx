import { type Property } from "@/types/property";
import { Button } from "./ui/button";
import { Calendar, Users } from "lucide-react";
import { formatPrice } from "@/utils/format";
import { Badge } from "./ui/badge";

export interface PropertyInfoProps {
  id: number;
  title: string;
  price: number;
  location: string;
  type: string;
  surface: number;
  rooms: number;
  hasLive?: boolean;
  liveDate?: Date;
  onJoinLive?: () => void;
  isLiveNow?: boolean;
  remainingSeats?: number;
  isUserRegistered?: boolean;
  agent: {
    id?: number;
    name: string;
    image: string;
    phone: string;
    email: string;
    company?: string;
    verified?: boolean;
  };
}

export const PropertyInfo = ({
  id,
  title,
  price,
  location,
  type,
  surface,
  rooms,
  hasLive,
  liveDate,
  onJoinLive,
  isLiveNow,
  remainingSeats,
  isUserRegistered,
  agent,
}: PropertyInfoProps) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-lg text-gray-700">{formatPrice(price)}</p>
      <p className="text-sm text-gray-500">{location}</p>
      <div className="flex items-center gap-2 mt-2">
        <Badge variant="secondary">{type}</Badge>
        <Badge variant="secondary">{surface} m²</Badge>
        <Badge variant="secondary">{rooms} chambres</Badge>
      </div>
      {hasLive && (
        <div className="mt-4">
          <Button onClick={onJoinLive} disabled={!isLiveNow}>
            {isLiveNow ? "Rejoindre le Live" : "Live à venir"}
          </Button>
        </div>
      )}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Agent</h3>
        <div className="flex items-center gap-2">
          <img src={agent.image} alt={agent.name} className="h-10 w-10 rounded-full" />
          <div>
            <p className="text-sm font-medium">{agent.name}</p>
            <p className="text-xs text-gray-500">{agent.company || 'Agent indépendant'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
