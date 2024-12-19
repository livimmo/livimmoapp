import { useState } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface HotspotInfo {
  title: string;
  description: string;
  details?: {
    label: string;
    value: string;
  }[];
}

interface VirtualTourHotspot360Props {
  info: HotspotInfo;
  position: { x: number; y: number };
}

export const VirtualTourHotspot360 = ({ info, position }: VirtualTourHotspot360Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full w-8 h-8 bg-primary text-primary-foreground hover:bg-primary/90 transition-all ${
              isHovered ? 'scale-110' : ''
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Info className="w-4 h-4" />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">{info.title}</h4>
            <p className="text-sm text-muted-foreground">
              {info.description}
            </p>
            {info.details && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {info.details.map((detail, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium">{detail.label}:</span>{' '}
                    <span className="text-muted-foreground">{detail.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};