import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-accent rounded-lg p-6 mb-20 mt-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-primary">
          Prêt à démarrer vos lives immobiliers ?
        </h2>
        <p className="text-muted-foreground">
          Créez votre compte gratuitement et commencez à présenter vos biens en direct à vos clients.
        </p>
        <Button 
          onClick={() => navigate("/signup")}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg"
        >
          Créer mon compte
        </Button>
      </div>
    </section>
  );
};