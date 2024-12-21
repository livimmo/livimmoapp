import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LiveInfoActionsProps {
  isReplay?: boolean;
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
  isMobile,
  isFavorite,
  setIsFavorite,
  onToggleChat,
  offerCount,
  price,
  onOpenOfferDialog
}: LiveInfoActionsProps) => {
  const navigate = useNavigate();
  const themeColor = isReplay ? '#33C3F0' : '#ea384c';

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
            isReplay ? 'bg-[#33C3F0]/10 hover:bg-[#33C3F0]/20' : 'bg-[#ea384c]/10 hover:bg-[#ea384c]/20',
            isReplay ? 'text-[#33C3F0]' : 'text-[#ea384c]',
            "transition-colors",
            isFavorite && (isReplay ? 'bg-[#33C3F0] text-white hover:bg-[#33C3F0]/90' : 'bg-[#ea384c] text-white hover:bg-[#ea384c]/90')
          )}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            isReplay ? 'bg-[#33C3F0]/10 hover:bg-[#33C3F0]/20 text-[#33C3F0]' : 'bg-[#ea384c]/10 hover:bg-[#ea384c]/20 text-[#ea384c]',
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
            isReplay ? 'bg-[#33C3F0]/10 hover:bg-[#33C3F0]/20 text-[#33C3F0]' : 'bg-[#ea384c]/10 hover:bg-[#ea384c]/20 text-[#ea384c]',
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
              isReplay ? 'bg-[#33C3F0]/10 text-[#33C3F0]' : 'bg-[#ea384c]/10 text-[#ea384c]',
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
          isReplay ? 'bg-[#33C3F0] hover:bg-[#33C3F0]/90' : 'bg-[#ea384c] hover:bg-[#ea384c]/90',
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