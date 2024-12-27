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

      // Transform property coordinates from JSON
      const transformedData = data?.map(visit => ({
        ...visit,
        property: visit.property ? {
          ...visit.property,
          coordinates: visit.property.coordinates ? {
            lat: visit.property.coordinates.lat,
            lng: visit.property.coordinates.lng
          } : null
        } : undefined
      }));

      console.log("Visits fetched:", transformedData);
      return transformedData as Visit[];
    },
  });

  return {
    visits: visits || [],
    isLoading,
    error,
  };
};