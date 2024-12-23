import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { type Profile } from "@/types/database/profile";

export const useAgents = () => {
  const { data: agents, isLoading, error } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "agent");

      if (error) throw error;
      return data as Profile[];
    },
  });

  return {
    agents: agents || [],
    isLoading,
    error,
  };
};