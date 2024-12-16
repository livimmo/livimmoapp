import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AgentRatingProps {
  agentName: string;
  initialRating?: number;
  onRate?: (rating: number) => void;
}

export const AgentRating = ({ agentName, initialRating = 0, onRate }: AgentRatingProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(0);
  const { toast } = useToast();

  const handleRate = (selectedRating: number) => {
    setRating(selectedRating);
    if (onRate) {
      onRate(selectedRating);
    }
    toast({
      title: "Merci pour votre évaluation !",
      description: `Vous avez noté ${agentName} ${selectedRating}/5 étoiles.`,
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
      <h3 className="text-lg font-semibold mb-2">Évaluez votre expérience avec {agentName}</h3>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Button
            key={star}
            variant="ghost"
            size="icon"
            className="hover:bg-white/20"
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => handleRate(star)}
          >
            <Star
              className={`h-6 w-6 ${
                star <= (hoveredRating || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-400"
              }`}
            />
          </Button>
        ))}
        <span className="ml-2 text-sm">
          {rating > 0 ? `${rating}/5` : "Pas encore noté"}
        </span>
      </div>
    </div>
  );
};