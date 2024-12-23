import { supabase } from "@/integrations/supabase/client";

export const createProfile = async (userId: string, data: any) => {
  const { error } = await supabase
    .from("profiles")
    .insert([
      {
        id: userId,
        ...data
      }
    ]);

  if (error) throw error;
};