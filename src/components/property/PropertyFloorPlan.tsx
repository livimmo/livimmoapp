import { Property } from "@/types/property";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Maximize2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PropertyFloorPlanProps {
  property: Property;
}

export const PropertyFloorPlan = ({ property }: PropertyFloorPlanProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  if (!property.virtualTour?.floorPlan) return null;

  const { url, rooms } = property.virtualTour.floorPlan;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Plan 3D interactif</h2>
        <button
          onClick={() => setIsFullscreen(true)}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <Maximize2 className="w-4 h-4" />
          <span>Plein écran</span>
        </button>
      </div>

      <Card className="relative overflow-hidden">
        <div className="aspect-video relative">
          <img src={url} alt="Plan 3D" className="w-full h-full object-cover" />
          
          {rooms.map((room) => (
            <div
              key={room.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
              style={{ left: `${room.coordinates.x}%`, top: `${room.coordinates.y}%` }}
              onMouseEnter={() => setSelectedRoom(room.id)}
              onMouseLeave={() => setSelectedRoom(null)}
            >
              <Badge 
                variant={selectedRoom === room.id ? "default" : "secondary"}
                className="whitespace-nowrap"
              >
                {room.name} ({room.area}m²)
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-screen-lg h-[90vh]">
          <DialogHeader>
            <DialogTitle>Plan 3D - {property.title}</DialogTitle>
          </DialogHeader>
          <div className="relative flex-1 overflow-hidden">
            <img src={url} alt="Plan 3D" className="w-full h-full object-contain" />
            
            {rooms.map((room) => (
              <div
                key={room.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                style={{ left: `${room.coordinates.x}%`, top: `${room.coordinates.y}%` }}
                onMouseEnter={() => setSelectedRoom(room.id)}
                onMouseLeave={() => setSelectedRoom(null)}
              >
                <Badge 
                  variant={selectedRoom === room.id ? "default" : "secondary"}
                  className="whitespace-nowrap text-lg"
                >
                  {room.name} ({room.area}m²)
                </Badge>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};