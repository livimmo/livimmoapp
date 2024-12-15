import { useNavigate } from "react-router-dom";
import { type Property } from "@/types/property";
import { PropertyImage } from "./property/PropertyImage";
import { PropertyInfo } from "./property/PropertyInfo";

type PropertyCardProps = Property & {
  viewers?: number;
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
}: PropertyCardProps) => {
  const navigate = useNavigate();
  const currentUrl = `${window.location.origin}/property/${id}`;

  const handleJoinLive = () => {
    navigate(`/live/${id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <PropertyImage
        id={id}
        title={title}
        image={images[0]}
        hasLive={hasLive}
        viewers={viewers}
        currentUrl={currentUrl}
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
      />
    </div>
  );
};