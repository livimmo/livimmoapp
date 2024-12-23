import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { type Profile } from "@/types/database/profile";

export const useDevelopers = () => {
  const { data: developers, isLoading, error } = useQuery({
    queryKey: ["developers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "developer");

      if (error) throw error;
      return data as Profile[];
    },
  });

  return {
    developers: developers || [],
    isLoading,
    error,
  };
};