import { Video } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Logo = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div 
      className="flex items-center gap-1.5 cursor-pointer" 
      onClick={handleLogoClick}
    >
      <Video className="h-4 w-4 text-[#ea384c] camera-icon" />
      <h1 className="text-lg font-bold text-primary">
        Livimmo
      </h1>
    </div>
  );
};