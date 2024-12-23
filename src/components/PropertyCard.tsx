import { useNavigate } from "react-router-dom";
import { type Property } from "@/types/property";
import { PropertyInfo } from "./PropertyInfo";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { PropertyCardImage } from "./property-card/PropertyCardImage";
import { PropertyCardAgent } from "./property-card/PropertyCardAgent";
import { PropertyCardAuthDialog } from "./property-card/PropertyCardAuthDialog";
import { getRandomTags } from "@/utils/propertyTags";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { VirtualTourViewer360 } from "@/components/virtual-tour/VirtualTourViewer360";

type PropertyCardProps = Property & {
  viewers?: number;
  isLiveNow?: boolean;
  remainingSeats?: number;
  isUserRegistered?: boolean;
  offers?: number;
  className?: string;
};

export const PropertyCard = ({
  id,
  images,
  title,
  price,
  location,
  type,
  surface,
  rooms,
  has_live,
  live_date,
  viewers = 0,
  isLiveNow,
  remainingSeats = 15,
  isUserRegistered = false,
  offers = 0,
  agent_id,
  virtual_tour,
  className,
}: PropertyCardProps) => {
  const navigate = useNavigate();
  const currentUrl = `${window.location.origin}/property/${id}`;
  const tags = getRandomTags();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  const handleJoinLive = () => {
    navigate(`/live/${id}`);
  };

  const handleVirtualTour = () => {
    setShowVirtualTour(true);
  };

  const [city, district] = location.split(", ");

  return (
    <>
      <div className={cn(
        "group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300",
        "transform hover:-translate-y-1",
        className
      )}>
        <PropertyCardImage
          id={id}
          title={title}
          image={images?.[0] || ''}
          has_live={has_live}
          live_date={live_date}
          viewers={viewers}
          currentUrl={currentUrl}
          isLiveNow={isLiveNow}
          isUserRegistered={isUserRegistered}
          remainingSeats={remainingSeats}
          offers={offers}
          virtual_tour={virtual_tour}
          tags={tags}
          onVirtualTourClick={handleVirtualTour}
          onUnauthorized={() => setShowAuthDialog(true)}
        />
        
        <PropertyInfo
          id={id}
          title={title}
          price={price}
          location={location}
          type={type}
          surface={surface}
          rooms={rooms}
          has_live={has_live}
          live_date={live_date}
          onJoinLive={handleJoinLive}
          isLiveNow={isLiveNow}
          remainingSeats={remainingSeats}
          isUserRegistered={isUserRegistered}
        />
        
        <PropertyCardAgent agent_id={agent_id} district={district} />
      </div>

      <PropertyCardAuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog} 
      />

      <Dialog open={showVirtualTour} onOpenChange={setShowVirtualTour}>
        <DialogContent className="max-w-[95vw] md:max-w-6xl h-[90vh] p-0 md:p-6">
          <VirtualTourViewer360
            tourUrl="TzhRashYdRt"
            propertyId={id}
            propertyTitle={title}
            agentId={agent_id}
            onContactAgent={() => {}}
            onBookVisit={() => setShowAuthDialog(true)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};