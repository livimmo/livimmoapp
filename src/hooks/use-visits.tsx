import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { type Visit } from "@/types/visit";

export const useVisits = (userId?: string) => {
  const { data: visits, isLoading, error } = useQuery({
    queryKey: ["visits", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("visits")
        .select(`
          *,
          property:properties(*),
          visitor:profiles(*)
        `)
        .eq("visitor_id", userId || "");

      if (error) throw error;
      return data as Visit[];
    },
    enabled: !!userId,
  });

  return {
    visits: visits || [],
    isLoading,
    error,
  };
};