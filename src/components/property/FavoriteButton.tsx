import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthDialog } from "@/components/auth/AuthDialog";

interface FavoriteButtonProps {
  propertyId: number;
  title: string;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
}

export const FavoriteButton = ({
  propertyId,
  title,
  isFavorite: initialIsFavorite = false,
  onToggleFavorite,
}: FavoriteButtonProps) => {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleClick = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
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
    <>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300",
          isFavorite && "text-[#ea384c] hover:text-[#ea384c]",
          isAnimating && "scale-125"
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

      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        title="Ajoutez ce bien à vos favoris"
        description="Créez votre compte gratuitement pour sauvegarder vos biens préférés et recevoir des notifications personnalisées"
        onSuccess={() => {
          setShowAuthDialog(false);
          handleClick();
        }}
      />
    </>
  );
};