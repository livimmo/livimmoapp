import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function AdminAgents() {
  const { toast } = useToast();
  
  const { data: agents, isLoading } = useQuery({
    queryKey: ["admin-agents"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "agent")
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger les agents",
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
        <h2 className="text-3xl font-bold tracking-tight">Agents</h2>
        <Button>Ajouter un agent</Button>
      </div>

      <div className="grid gap-4">
        {agents?.map((agent) => (
          <Card key={agent.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <img 
                  src={agent.avatar_url || "/placeholder.svg"} 
                  alt={agent.full_name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{agent.full_name}</h3>
                  <p className="text-sm text-muted-foreground">{agent.email}</p>
                </div>
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm">Modifier</Button>
                <Button variant="destructive" size="sm">Supprimer</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}