import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const CTASection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <section className="mb-8">
      <div className="bg-accent rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">
          Vous êtes agent immobilier ou promoteur ?
        </h3>
        <p className="text-muted-foreground mb-4">
          Rejoignez notre plateforme et commencez à diffuser vos biens en direct
        </p>
        <Button onClick={handleClick}>Commencer maintenant</Button>
      </div>
    </section>
  );
};