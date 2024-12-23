import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useFavorites = () => {
  const { data: favorites, isLoading, error } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select(`
          *,
          property:properties(
            *,
            agent:profiles(*)
          )
        `);

      if (error) throw error;
      return data;
    },
  });

  return {
    favorites: favorites || [],
    isLoading,
    error,
  };
};