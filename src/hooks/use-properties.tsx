import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { type PropertyWithAgent } from "@/types/property";

export const useProperties = () => {
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      console.log("Fetching properties from Supabase...");
      const { data, error } = await supabase
        .from("properties")
        .select(`
          *,
          agent:profiles(*)
        `);

      if (error) {
        console.error("Error fetching properties:", error);
        throw error;
      }

      console.log("Properties fetched:", data);
      return data as PropertyWithAgent[];
    },
  });

  return {
    properties: properties || [],
    isLoading,
    error,
  };
};