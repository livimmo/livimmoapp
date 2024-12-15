import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone } from "lucide-react";

interface ReservationFormProps {
  live: {
    id: number;
    title: string;
    date: Date;
    availableSeats?: number;
  };
  onClose?: () => void;
}

export const ReservationForm = ({ live, onClose }: ReservationFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    acceptTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      toast({
        title: "Erreur",
        description: "Veuillez accepter les conditions d'utilisation pour continuer.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Ici, vous ajouteriez l'appel API pour enregistrer l'inscription
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation d'appel API

      toast({
        title: "Inscription confirmée !",
        description: `Votre place pour "${live.title}" a été réservée. Vous recevrez un email de confirmation.`,
      });

      if (onClose) {
        onClose();
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom complet *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="pl-10"
              required
              placeholder="Votre nom complet"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-10"
              required
              placeholder="votre@email.com"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone (optionnel)</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="pl-10"
              placeholder="+212 6XX XXX XXX"
            />
          </div>
        </div>

        {live.availableSeats && live.availableSeats > 0 && (
          <p className="text-sm text-muted-foreground">
            {live.availableSeats} places disponibles
          </p>
        )}

        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={formData.acceptTerms}
            onCheckedChange={(checked) => 
              setFormData({ ...formData, acceptTerms: checked as boolean })
            }
          />
          <Label 
            htmlFor="terms" 
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            En m'inscrivant, j'accepte de recevoir des rappels pour ce live et j'accepte les{" "}
            <a href="#" className="text-primary hover:underline">
              conditions d'utilisation
            </a>
          </Label>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full" 
        disabled={isSubmitting}
      >
        {isSubmitting ? "Inscription en cours..." : "Confirmer mon inscription"}
      </Button>
    </form>
  );
};