import { Star, StarHalf, StarOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AgentRatingProps {
  rating: number;
  totalReviews: number;
  showBadge?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
};

export const AgentRating = ({
  rating,
  totalReviews,
  showBadge = false,
  size = "md",
}: AgentRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  const iconSize = sizeMap[size];

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className="text-yellow-400 fill-yellow-400"
            size={iconSize}
          />
        ))}
        {hasHalfStar && (
          <StarHalf
            className="text-yellow-400 fill-yellow-400"
            size={iconSize}
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOff
            key={`empty-${i}`}
            className="text-yellow-400"
            size={iconSize}
          />
        ))}
      </div>
      {showBadge ? (
        <Badge variant="secondary" className="font-medium">
          {rating.toFixed(1)} ({totalReviews})
        </Badge>
      ) : (
        <span className="text-sm text-muted-foreground">
          {rating.toFixed(1)} ({totalReviews} avis)
        </span>
      )}
    </div>
  );
};