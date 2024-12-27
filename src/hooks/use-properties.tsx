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

      // Transform coordinates from JSON to proper type
      const transformedData = data?.map(property => ({
        ...property,
        coordinates: property.coordinates ? {
          lat: property.coordinates.lat,
          lng: property.coordinates.lng
        } : null,
        agent: property.agent as unknown as Profile
      }));

      console.log("Properties fetched:", transformedData);
      return transformedData as PropertyWithAgent[];
    },
  });

  return {
    properties: properties || [],
    isLoading,
    error,
  };
};