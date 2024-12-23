import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LiveButtonProps {
  id: string;
  title: string;
  liveDate?: string | null;
  onJoinLive?: () => void;
  isLiveNow?: boolean;
  remainingSeats?: number;
  isUserRegistered?: boolean;
}

export const LiveButton = ({
  title,
  liveDate,
  onJoinLive,
  isLiveNow,
  remainingSeats,
  isUserRegistered,
}: LiveButtonProps) => {
  if (!liveDate && !isLiveNow) return null;

  return (
    <Button
      onClick={onJoinLive}
      variant={isLiveNow ? "destructive" : "default"}
      className={cn(
        "w-full",
        isLiveNow && "bg-[#ea384c] hover:bg-[#ea384c]/90",
        isUserRegistered && "bg-green-500 hover:bg-green-600"
      )}
    >
      {isLiveNow
        ? isUserRegistered
          ? "Rejoindre le live"
          : "Live en cours"
        : "Réserver ma place"}
    </Button>
  );
};