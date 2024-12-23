import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { type Property, type Profile, type PropertyWithAgent } from "@/types/database";
import { mockProperties } from "@/data/mockProperties";

export const useProperties = () => {
  const queryClient = useQueryClient();

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
      return (data || []) as PropertyWithAgent[];
    },
    initialData: mockProperties,
  });

  const createProperty = useMutation({
    mutationFn: async (newProperty: Omit<Property, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("properties")
        .insert([newProperty])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });

  const updateProperty = useMutation({
    mutationFn: async (property: Partial<Property> & { id: string }) => {
      const { data, error } = await supabase
        .from("properties")
        .update(property)
        .eq("id", property.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });

  return {
    properties,
    isLoading,
    error,
    createProperty,
    updateProperty,
  };
};