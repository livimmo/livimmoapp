import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface FavoriteButtonProps {
  propertyId: number;
  title: string;
  className?: string;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
  onUnauthorized?: () => void;
}

export const FavoriteButton = ({
  propertyId,
  title,
  className,
  isFavorite: initialIsFavorite = false,
  onToggleFavorite,
  onUnauthorized,
}: FavoriteButtonProps) => {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      onUnauthorized?.();
      return;
    }

    setIsAnimating(true);
    setIsFavorite(!isFavorite);
    onToggleFavorite?.(propertyId);
    
    toast({
      title: isFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
      description: `${title} a été ${
        isFavorite ? "retiré de" : "ajouté à"
      } vos favoris.`,
    });

    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300",
        isFavorite && "text-[#ea384c] hover:text-[#ea384c]",
        isAnimating && "scale-125",
        className
      )}
      onClick={handleClick}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-all duration-300",
          isFavorite && "fill-[#ea384c] text-[#ea384c]",
          isAnimating && "animate-pulse"
        )}
      />
    </Button>
  );
};