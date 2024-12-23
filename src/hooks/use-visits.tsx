import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { type Visit } from "@/types/visit";

export const useVisits = () => {
  const { data: visits, isLoading, error } = useQuery({
    queryKey: ["visits"],
    queryFn: async () => {
      console.log("Fetching visits from Supabase...");
      const { data, error } = await supabase
        .from("visits")
        .select(`
          *,
          property:properties(*),
          visitor:profiles(*)
        `);

      if (error) {
        console.error("Error fetching visits:", error);
        throw error;
      }

      console.log("Visits fetched:", data);
      return data as Visit[];
    },
  });

  return {
    visits: visits || [],
    isLoading,
    error,
  };
};