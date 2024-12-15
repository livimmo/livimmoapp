import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="mb-8">
      <div className="bg-accent rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">
          Vous êtes agent immobilier ou promoteur ?
        </h3>
        <p className="text-muted-foreground mb-4">
          Rejoignez notre plateforme et commencez à diffuser vos biens en direct
        </p>
        <Button>Commencer maintenant</Button>
      </div>
    </section>
  );
};