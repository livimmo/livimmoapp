import { Badge } from "@/components/ui/badge";
import { Inbox, Star, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface OffersCounterProps {
  offers: number;
  className?: string;
}

export const OffersCounter = ({ offers, className }: OffersCounterProps) => {
  if (!offers) return null;

  const isPopular = offers >= 10;
  const isHot = offers >= 15;

  return (
    <Badge
      variant="secondary"
      className={cn(
        "flex items-center gap-1 font-medium transition-all",
        isHot && "bg-red-500 text-white hover:bg-red-600",
        isPopular && !isHot && "bg-orange-500 text-white hover:bg-orange-600",
        !isPopular && "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        "animate-fade-in",
        className
      )}
    >
      {isHot ? (
        <Trophy className="h-3 w-3" />
      ) : isPopular ? (
        <Star className="h-3 w-3" />
      ) : (
        <Inbox className="h-3 w-3" />
      )}
      {offers} {offers > 1 ? "offres reçues" : "offre reçue"}
      {isHot && " 🏆"}
    </Badge>
  );
};