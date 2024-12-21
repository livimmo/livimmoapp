import { Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";

interface LiveInfoHeaderProps {
  property: Property;
  viewerCount: number;
  isReplay?: boolean;
  isScheduled?: boolean;
}

export const LiveInfoHeader = ({
  property,
  viewerCount,
  isReplay,
  isScheduled,
}: LiveInfoHeaderProps) => {
  return (
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <Badge 
          variant="secondary" 
          className={cn(
            isReplay 
              ? 'bg-orange-500/10 text-orange-500' 
              : isScheduled
                ? 'bg-[#33C3F0]/10 text-[#33C3F0]'
                : 'bg-red-500/10 text-red-500',
            "shadow-sm"
          )}
        >
          {isReplay ? "Virtual" : isScheduled ? "Programmé" : "En direct"}
        </Badge>
        {!isReplay && (
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            <Eye className="w-3 h-3 mr-1" />
            {viewerCount}
          </Badge>
        )}
      </div>
      <h3 className="font-semibold text-foreground">{property.title}</h3>
      <p className="text-sm text-muted-foreground">{property.location}</p>
    </div>
  );
};