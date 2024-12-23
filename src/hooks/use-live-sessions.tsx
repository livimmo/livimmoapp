import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { type LiveEvent } from "@/types/live";

export const useLiveSessions = () => {
  const { data: liveSessions, isLoading, error } = useQuery({
    queryKey: ["live-sessions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("live_sessions")
        .select(`
          *,
          property:properties(*),
          agent:profiles(*)
        `);

      if (error) throw error;
      return data as LiveEvent[];
    },
  });

  return {
    liveSessions: liveSessions || [],
    isLoading,
    error,
  };
};