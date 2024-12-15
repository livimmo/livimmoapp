import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface FavoriteButtonProps {
  propertyId: number;
  title: string;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
}

export const FavoriteButton = ({
  propertyId,
  title,
  isFavorite = false,
  onToggleFavorite,
}: FavoriteButtonProps) => {
  const { toast } = useToast();

  const handleClick = () => {
    onToggleFavorite?.(propertyId);
    toast({
      title: isFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
      description: `${title} a été ${
        isFavorite ? "retiré de" : "ajouté à"
      } vos favoris.`,
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90",
        isFavorite && "text-[#ea384c] hover:text-[#ea384c]"
      )}
      onClick={handleClick}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-all",
          isFavorite && "fill-[#ea384c] text-[#ea384c]"
        )}
      />
    </Button>
  );
};