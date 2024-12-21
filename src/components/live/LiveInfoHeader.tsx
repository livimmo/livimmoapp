import { Property } from "@/types/property";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Users, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveInfoHeaderProps {
  property: Property;
  viewerCount: number;
  isReplay?: boolean;
}

export const LiveInfoHeader = ({ property, viewerCount, isReplay }: LiveInfoHeaderProps) => {
  const themeColor = isReplay ? '#33C3F0' : '#ea384c';

  return (
    <div className="flex items-center gap-3 min-w-0 flex-1">
      <div className="h-12 w-20 bg-[#33C3F0]/10 rounded-md overflow-hidden shrink-0 flex items-center justify-center shadow-sm">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="min-w-0">
        <Link 
          to={`/properties/${property.id}`}
          className="hover:underline flex items-center gap-2 group"
        >
          <h2 className="text-base font-semibold truncate group-hover:text-primary transition-colors">
            {property.title}
          </h2>
          <ExternalLink className="w-3.5 h-3.5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <Badge 
            variant="default" 
            className={cn(
              "flex items-center gap-1",
              isReplay ? 'bg-[#33C3F0] hover:bg-[#33C3F0]/90' : 'bg-[#ea384c] hover:bg-[#ea384c]/90',
              "text-white shadow-sm"
            )}
          >
            <Radio className="w-3 h-3 animate-pulse" />
            <span>{isReplay ? 'REPLAY' : 'LIVE'}</span>
          </Badge>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: themeColor }}>
            <Users className="w-3.5 h-3.5" />
            <span className="font-semibold">{viewerCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};