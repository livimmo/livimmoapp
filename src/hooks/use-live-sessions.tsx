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

      // Transform to LiveEvent format
      const transformedData = data?.map(session => ({
        id: parseInt(session.id),
        title: session.title,
        description: session.description || "",
        thumbnail: session.property?.images?.[0] || "",
        agent: session.agent?.full_name || "",
        location: session.property?.location || "",
        type: session.property?.type || "",
        price: session.property?.price?.toString() || "",
        date: new Date(session.scheduled_date || ""),
        availableSeats: session.max_participants || 0,
        viewers: session.current_participants || 0,
        status: session.status === "completed" ? "replay" : 
                session.status === "live" ? "live" : "scheduled",
        tags: session.property?.tags || []
      }));

      console.log("Live sessions fetched:", transformedData);
      return transformedData as LiveEvent[];
    },
  });

  return {
    liveSessions: liveSessions || [],
    isLoading,
    error,
  };
};