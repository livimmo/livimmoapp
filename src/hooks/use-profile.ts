import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useProfile = (userId: string | undefined) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!userId) return null;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        toast({
          title: "Error loading profile",
          description: "Please try again later",
          variant: "destructive",
        });
        throw error;
      }

      // If no profile exists, create one
      if (!data) {
        const { data: auth } = await supabase.auth.getUser();
        if (!auth.user) return null;

        const newProfile = {
          id: auth.user.id,
          full_name: auth.user.user_metadata?.full_name,
          avatar_url: auth.user.user_metadata?.avatar_url,
        };

        const { data: createdProfile, error: createError } = await supabase
          .from("profiles")
          .insert([newProfile])
          .select()
          .single();

        if (createError) {
          toast({
            title: "Error creating profile",
            description: "Please try again later",
            variant: "destructive",
          });
          throw createError;
        }

        return createdProfile;
      }

      return data;
    },
    enabled: !!userId,
  });
};