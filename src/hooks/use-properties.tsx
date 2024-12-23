import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { type PropertyWithAgent } from "@/types/property";

export const useProperties = () => {
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select(`
          *,
          agent:profiles(*)
        `);

      if (error) throw error;
      return data as PropertyWithAgent[];
    },
  });

  return {
    properties: properties || [],
    isLoading,
    error,
  };
};