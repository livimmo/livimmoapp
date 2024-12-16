import { Star, StarHalf, StarOff } from "lucide-react";

interface StarRatingProps {
  rating: number;
  totalReviews?: number;
  size?: number;
  showCount?: boolean;
  onRate?: (rating: number) => void;
  readonly?: boolean;
}

export const StarRating = ({
  rating,
  totalReviews,
  size = 20,
  showCount = true,
  onRate,
  readonly = true,
}: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const handleClick = (index: number) => {
    if (!readonly && onRate) {
      onRate(index + 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className="text-yellow-400 fill-yellow-400"
            size={size}
            onClick={() => handleClick(i)}
            style={{ cursor: readonly ? "default" : "pointer" }}
          />
        ))}
        {hasHalfStar && (
          <StarHalf
            className="text-yellow-400 fill-yellow-400"
            size={size}
            onClick={() => handleClick(fullStars)}
            style={{ cursor: readonly ? "default" : "pointer" }}
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOff
            key={`empty-${i}`}
            className="text-yellow-400"
            size={size}
            onClick={() => handleClick(fullStars + (hasHalfStar ? 1 : 0) + i)}
            style={{ cursor: readonly ? "default" : "pointer" }}
          />
        ))}
      </div>
      {showCount && totalReviews !== undefined && (
        <span className="text-sm text-muted-foreground">
          ({totalReviews} avis)
        </span>
      )}
    </div>
  );
};