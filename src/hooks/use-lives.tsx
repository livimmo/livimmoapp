import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useLives = () => {
  const { data: lives, isLoading, error } = useQuery({
    queryKey: ["live_sessions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("live_sessions")
        .select(`
          *,
          property:properties(*),
          agent:profiles(*)
        `);

      if (error) throw error;
      return data;
    },
  });

  return {
    lives: lives || [],
    isLoading,
    error,
  };
};