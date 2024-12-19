import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ratings/StarRating";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type RatingCategory = Database["public"]["Enums"]["rating_category"];

interface VisitRatingFormProps {
  visitId: string;
  agentId: string;
  userId: string; // Ajout de userId aux props
  onRatingSubmitted?: () => void;
}

export const VisitRatingForm = ({ visitId, agentId, userId, onRatingSubmitted }: VisitRatingFormProps) => {
  const { toast } = useToast();
  const [ratings, setRatings] = useState<Record<RatingCategory, number>>({
    communication: 0,
    punctuality: 0,
    professionalism: 0,
    knowledge: 0,
    overall: 0,
  });
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingChange = (category: RatingCategory, value: number) => {
    setRatings(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Vérifier que toutes les notes sont données
      const hasAllRatings = Object.values(ratings).every(rating => rating > 0);
      if (!hasAllRatings) {
        toast({
          title: "Erreur",
          description: "Veuillez donner une note pour chaque catégorie",
          variant: "destructive",
        });
        return;
      }

      // Insérer les notes pour chaque catégorie
      const promises = (Object.entries(ratings) as [RatingCategory, number][]).map(([category, rating]) => 
        supabase.from('visit_ratings').insert({
          visit_id: visitId,
          agent_id: agentId,
          user_id: userId, // Ajout du user_id
          category,
          rating,
          comment: category === 'overall' ? comment : null,
        })
      );

      await Promise.all(promises);

      toast({
        title: "Merci !",
        description: "Votre évaluation a été enregistrée avec succès",
      });

      onRatingSubmitted?.();
    } catch (error) {
      console.error('Error submitting ratings:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement de votre évaluation",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Communication</label>
          <StarRating
            rating={ratings.communication}
            onRate={(value) => handleRatingChange('communication', value)}
            readonly={false}
            showCount={false}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Ponctualité</label>
          <StarRating
            rating={ratings.punctuality}
            onRate={(value) => handleRatingChange('punctuality', value)}
            readonly={false}
            showCount={false}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Professionnalisme</label>
          <StarRating
            rating={ratings.professionalism}
            onRate={(value) => handleRatingChange('professionalism', value)}
            readonly={false}
            showCount={false}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Connaissance du marché</label>
          <StarRating
            rating={ratings.knowledge}
            onRate={(value) => handleRatingChange('knowledge', value)}
            readonly={false}
            showCount={false}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Note globale</label>
          <StarRating
            rating={ratings.overall}
            onRate={(value) => handleRatingChange('overall', value)}
            readonly={false}
            showCount={false}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Commentaire (optionnel)</label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Partagez votre expérience..."
            className="h-24"
          />
        </div>
      </div>

      <Button 
        onClick={handleSubmit} 
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Envoi en cours..." : "Envoyer mon évaluation"}
      </Button>
    </div>
  );
};