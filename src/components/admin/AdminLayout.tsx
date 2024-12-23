import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function AdminLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: adminProfile, isLoading } = useQuery({
    queryKey: ["adminProfile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("admin_profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (!isLoading && !adminProfile) {
      navigate("/admin/login");
    }
  }, [adminProfile, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!adminProfile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}