import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const DeveloperDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user || user.role !== "promoter") {
      toast({
        title: "Accès refusé",
        description: "Cette page est réservée aux promoteurs.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [user, navigate, toast]);

  if (!user || user.role !== "promoter") return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Tableau de Bord Promoteur</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Contenu à venir */}
        <div className="p-6 bg-background rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Projets en cours</h2>
          <p className="text-muted-foreground">
            Cette fonctionnalité sera bientôt disponible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;