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

      // Cast the data to the correct type after verifying agent exists
      const propertiesWithAgent = data?.map((property) => ({
        ...property,
        agent: property.agent || {
          id: "",
          full_name: "",
          avatar_url: "",
          company: "",
          phone: "",
          role: "",
          verified: false,
          rating: 0,
          specialties: [],
          description: "",
          location: "",
          social_links: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      })) as PropertyWithAgent[];

      return propertiesWithAgent || [];
    },
  });

  return {
    properties: properties || [],
    isLoading,
    error,
  };
};