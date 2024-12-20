import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export const CTASection = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <section className="bg-accent rounded-lg p-6 mb-20 mt-8">
      <div className="text-center space-y-4">
        <h2 className={`font-bold text-primary ${isMobile ? 'text-xl' : 'text-2xl'}`}>
          Prêt à démarrer vos lives immobiliers ?
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Créez votre compte gratuitement et commencez à présenter vos biens en direct à vos clients.
        </p>
        <Button 
          onClick={() => navigate("/signup")}
          size={isMobile ? "default" : "lg"}
          className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg w-full md:w-auto"
        >
          Créer mon compte
        </Button>
      </div>
    </section>
  );
};