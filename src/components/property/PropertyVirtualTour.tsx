import { useState } from "react";
import { Property } from "@/types/property";

export const PropertyVirtualTour = ({ property }: { property: Property }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  
  // Convert string IDs to numbers where needed
  const roomId = currentRoom ? parseInt(currentRoom, 10) : null;

  return (
    <div className={`relative ${isFullscreen ? "fullscreen" : ""}`}>
      <button onClick={() => setIsFullscreen(!isFullscreen)}>
        {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      </button>
      <div className="tour-container">
        {/* Render the virtual tour based on the property data */}
        {property.virtualTour?.enabled && (
          <iframe
            src={property.virtualTour.url}
            title="Virtual Tour"
            className="w-full h-full"
            allowFullScreen
          />
        )}
      </div>
      <div className="room-selector">
        {property.virtualTour?.floorPlan?.rooms.map((room) => (
          <button key={room.id} onClick={() => setCurrentRoom(room.id)}>
            {room.name}
          </button>
        ))}
      </div>
    </div>
  );
};
