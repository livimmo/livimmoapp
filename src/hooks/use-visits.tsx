import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useVisits = () => {
  const { data: visits, isLoading, error } = useQuery({
    queryKey: ["visits"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("visits")
        .select(`
          *,
          property:properties(*),
          visitor:profiles(*)
        `);

      if (error) throw error;
      return data;
    },
  });

  return {
    visits: visits || [],
    isLoading,
    error,
  };
};