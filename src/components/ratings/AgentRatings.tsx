import { useEffect, useState } from "react";
import { StarRating } from "@/components/ratings/StarRating";
import { supabase } from "@/integrations/supabase/client";

interface AgentRating {
  category: string;
  average_rating: number;
  total_ratings: number;
}

interface AgentRatingsProps {
  agentId: string;
}

export const AgentRatings = ({ agentId }: AgentRatingsProps) => {
  const [ratings, setRatings] = useState<AgentRating[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const { data, error } = await supabase
          .from('agent_ratings')
          .select('*')
          .eq('agent_id', agentId);

        if (error) throw error;
        setRatings(data || []);
      } catch (error) {
        console.error('Error fetching agent ratings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRatings();
  }, [agentId]);

  if (isLoading) {
    return <div>Chargement des évaluations...</div>;
  }

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      communication: "Communication",
      punctuality: "Ponctualité",
      professionalism: "Professionnalisme",
      knowledge: "Connaissance du marché",
      overall: "Note globale"
    };
    return labels[category] || category;
  };

  return (
    <div className="space-y-4">
      {ratings.length > 0 ? (
        ratings.map((rating) => (
          <div key={rating.category} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                {getCategoryLabel(rating.category)}
              </span>
              <StarRating
                rating={rating.average_rating}
                totalReviews={rating.total_ratings}
                size={16}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-muted-foreground">
          Aucune évaluation disponible pour le moment
        </p>
      )}
    </div>
  );
};