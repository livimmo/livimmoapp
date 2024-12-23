import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export function useAdmin() {
  const { user } = useAuth();

  const { data: adminProfile, isLoading } = useQuery({
    queryKey: ["adminProfile", user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from("admin_profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) return null;
      return data;
    },
    enabled: !!user,
  });

  return {
    isAdmin: !!adminProfile,
    adminProfile,
    isLoading,
  };
}