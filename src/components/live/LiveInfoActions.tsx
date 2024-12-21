import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LiveInfoActionsProps {
  isReplay?: boolean;
  isScheduled?: boolean;
  isMobile: boolean;
  isFavorite: boolean;
  setIsFavorite: (value: boolean) => void;
  onToggleChat?: () => void;
  offerCount: number;
  price: number;
  onOpenOfferDialog: () => void;
}

export const LiveInfoActions = ({
  isReplay,
  isScheduled,
  isMobile,
  isFavorite,
  setIsFavorite,
  onToggleChat,
  offerCount,
  price,
  onOpenOfferDialog
}: LiveInfoActionsProps) => {
  const navigate = useNavigate();
  
  const themeColor = isReplay 
    ? '#16A34A' // Vert pour les replays
    : '#F97316'; // Orange pour les autres
      
  const bgBase = isReplay 
    ? 'bg-green-600' 
    : 'bg-orange-500';
      
  const bgHover = isReplay 
    ? 'hover:bg-green-700' 
    : 'hover:bg-orange-600';
      
  const bgLight = isReplay 
    ? 'bg-green-500/10' 
    : 'bg-orange-500/10';
      
  const bgLightHover = isReplay 
    ? 'hover:bg-green-500/20' 
    : 'hover:bg-orange-500/20';
      
  const textColor = isReplay 
    ? 'text-green-600' 
    : 'text-orange-500';

  return (
    <div className={cn(
      "flex items-center gap-4",
      isMobile ? "w-full justify-between" : "shrink-0"
    )}>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            bgLight,
            textColor,
            bgLightHover,
            "transition-colors",
            isFavorite && `${bgBase} text-white ${bgHover}`
          )}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            bgLight,
            textColor,
            bgLightHover,
            "transition-colors"
          )}
          onClick={onToggleChat}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            bgLight,
            textColor,
            bgLightHover,
            "transition-colors"
          )}
          onClick={() => navigate(-1)}
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
      {!isMobile && (
        <>
          <Badge 
            variant="secondary" 
            className={cn(
              isReplay 
                ? 'bg-green-500/10 text-green-600'
                : 'bg-orange-500/10 text-orange-500',
              "shadow-sm",
              "transition-all duration-300 ease-in-out",
              "hover:scale-105"
            )}
          >
            {offerCount} offres
          </Badge>
          <p className="text-lg font-bold whitespace-nowrap" style={{ color: themeColor }}>
            {price.toLocaleString()} DH
          </p>
        </>
      )}
      <Button 
        className={cn(
          bgBase,
          bgHover,
          "text-white whitespace-nowrap shadow-sm transition-all hover:shadow-md",
          isMobile && "w-full"
        )}
        onClick={onOpenOfferDialog}
      >
        <Heart className="w-4 h-4 mr-1.5" />
        Je suis intéressé(e)
      </Button>
    </div>
  );
};