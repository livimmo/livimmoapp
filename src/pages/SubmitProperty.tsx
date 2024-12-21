import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { PropertySubmissionForm } from "@/components/property/submission/PropertySubmissionForm";
import { Header } from "@/components/layout/Header";

const SubmitProperty = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement API call to submit property
      console.log("Property submission data:", data);
      
      toast({
        title: "Bien soumis avec succès",
        description: "Notre équipe prendra contact avec vous sous 24 heures.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la soumission",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-2xl font-bold mb-6">Déposer Votre Bien</h1>
        <PropertySubmissionForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
};

export default SubmitProperty;