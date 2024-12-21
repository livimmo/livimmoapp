import { Link } from "react-router-dom";
import { PropertyInfo } from "./PropertyInfo";
import { PropertyImage } from "./property/PropertyImage";
import { type Property } from "@/types/property";
import { cn } from "@/lib/utils";

interface PropertyCardProps extends Property {
  className?: string;
  offers?: number;
}

export const PropertyCard = ({
  id,
  title,
  price,
  location,
  type,
  surface,
  rooms,
  images,
  hasLive,
  liveDate,
  isLiveNow,
  viewers,
  remainingSeats,
  isUserRegistered,
  offers,
  className
}: PropertyCardProps) => {
  return (
    <article className={cn(
      "group overflow-hidden rounded-lg border bg-card transition-colors hover:bg-accent/5",
      isLiveNow && "border-[#ea384c]/20 bg-[#ea384c]/5 hover:bg-[#ea384c]/10",
      className
    )}>
      <PropertyImage
        id={id}
        title={title}
        image={images[0]}
        hasLive={hasLive}
        liveDate={liveDate}
        viewers={viewers}
        isLiveNow={isLiveNow}
        remainingSeats={remainingSeats}
        isUserRegistered={isUserRegistered}
        offers={offers}
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
        isLiveNow={isLiveNow}
        remainingSeats={remainingSeats}
        isUserRegistered={isUserRegistered}
      />
    </article>
  );
};