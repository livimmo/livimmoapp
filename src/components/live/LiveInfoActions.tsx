import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare, X, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ReportLiveDialog } from "./ReportLiveDialog";

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
  liveId: number;
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
  onOpenOfferDialog,
  liveId,
}: LiveInfoActionsProps) => {
  const navigate = useNavigate();
  const [showReportDialog, setShowReportDialog] = useState(false);
  
  const themeColor = isReplay 
    ? '#10B981' 
    : isScheduled 
      ? '#33C3F0'
      : '#ea384c';
      
  const bgBase = isReplay 
    ? 'bg-emerald-500' 
    : isScheduled
      ? 'bg-[#33C3F0]'
      : 'bg-red-500';
      
  const bgHover = isReplay 
    ? 'hover:bg-emerald-600' 
    : isScheduled
      ? 'hover:bg-[#33C3F0]/90'
      : 'hover:bg-red-600';
      
  const bgLight = isReplay 
    ? 'bg-emerald-500/10' 
    : isScheduled
      ? 'bg-[#33C3F0]/10'
      : 'bg-red-500/10';
      
  const bgLightHover = isReplay 
    ? 'hover:bg-emerald-500/20' 
    : isScheduled
      ? 'hover:bg-[#33C3F0]/20'
      : 'hover:bg-red-500/20';
      
  const textColor = isReplay 
    ? 'text-emerald-500' 
    : isScheduled
      ? 'text-[#33C3F0]'
      : 'text-red-500';

  return (
    <>
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
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "bg-red-500/10 text-red-500 hover:bg-red-500/20",
              "transition-colors"
            )}
            onClick={() => setShowReportDialog(true)}
          >
            <AlertTriangle className="h-6 w-6" />
          </Button>
        </div>
        {!isMobile && (
          <>
            <Badge 
              variant="secondary" 
              className={cn(
                isReplay 
                  ? 'bg-emerald-500/10 text-emerald-500' 
                  : isScheduled
                    ? 'bg-[#33C3F0]/10 text-[#33C3F0]'
                    : 'bg-red-500/10 text-red-500',
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

      <ReportLiveDialog
        liveId={liveId}
        isOpen={showReportDialog}
        onClose={() => setShowReportDialog(false)}
      />
    </>
  );
};