import { useNavigate } from "react-router-dom";
import { type Property } from "@/types/property";
import { PropertyInfo } from "./PropertyInfo";
import { useState } from "react";
import { PropertyCardImage } from "./property-card/PropertyCardImage";
import { PropertyCardAgent } from "./property-card/PropertyCardAgent";
import { PropertyCardAuthDialog } from "./property-card/PropertyCardAuthDialog";
import { getRandomTags } from "@/utils/propertyTags";
import { PropertyCardWrapper } from "./property-card/PropertyCardWrapper";
import { PropertyCardVirtualTourDialog } from "./property-card/PropertyCardVirtualTourDialog";

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
  hasLive,
  liveDate,
  viewers = 0,
  isLiveNow,
  remainingSeats = 15,
  isUserRegistered = false,
  offers = 0,
  agent,
  virtualTour,
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
      <PropertyCardWrapper className={className}>
        <PropertyCardImage
          id={id}
          title={title}
          image={images[0]}
          hasLive={hasLive}
          liveDate={liveDate}
          viewers={viewers}
          currentUrl={currentUrl}
          isLiveNow={isLiveNow}
          isUserRegistered={isUserRegistered}
          remainingSeats={remainingSeats}
          offers={offers}
          virtualTour={virtualTour}
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
          hasLive={hasLive}
          liveDate={liveDate}
          onJoinLive={handleJoinLive}
          isLiveNow={isLiveNow}
          remainingSeats={remainingSeats}
          isUserRegistered={isUserRegistered}
        />
        
        <PropertyCardAgent agent={agent} district={district} />
      </PropertyCardWrapper>

      <PropertyCardAuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog} 
      />

      <PropertyCardVirtualTourDialog
        open={showVirtualTour}
        onOpenChange={setShowVirtualTour}
        id={id}
        title={title}
        agentName={agent.name}
        onContactAgent={() => {}}
        onBookVisit={() => setShowAuthDialog(true)}
      />
    </>
  );
};