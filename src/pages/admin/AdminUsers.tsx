import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function AdminUsers() {
  const { toast } = useToast();
  
  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger les utilisateurs",
        });
        throw error;
      }

      return data;
    },
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Utilisateurs</h2>
      </div>

      <div className="grid gap-4">
        {users?.map((user) => (
          <Card key={user.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <img 
                  src={user.avatar_url || "/placeholder.svg"} 
                  alt={user.full_name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{user.full_name}</h3>
                  <p className="text-sm text-muted-foreground">Rôle: {user.role || "Utilisateur"}</p>
                </div>
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm">Voir le profil</Button>
                <Button variant="destructive" size="sm">Désactiver</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}