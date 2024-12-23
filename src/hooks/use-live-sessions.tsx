import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { type LiveEvent } from "@/types/live";

export const useLiveSessions = () => {
  const { data: liveSessions, isLoading, error } = useQuery({
    queryKey: ["live-sessions"],
    queryFn: async () => {
      console.log("Fetching live sessions from Supabase...");
      const { data, error } = await supabase
        .from("live_sessions")
        .select(`
          *,
          property:properties(*),
          agent:profiles(*)
        `);

      if (error) {
        console.error("Error fetching live sessions:", error);
        throw error;
      }

      console.log("Live sessions fetched:", data);
      return data as LiveEvent[];
    },
  });

  return {
    liveSessions: liveSessions || [],
    isLoading,
    error,
  };
};