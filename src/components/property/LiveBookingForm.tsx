import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface LiveBookingFormProps {
  propertyId: number;
  propertyTitle: string;
  agentId: number;
  agentName: string;
  onClose: () => void;
}

export const LiveBookingForm = ({
  propertyId,
  propertyTitle,
  agentId,
  agentName,
  onClose,
}: LiveBookingFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Demande envoyée",
        description: "Nous vous contacterons bientôt pour confirmer votre réservation.",
      });

      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nom complet</Label>
        <Input
          id="name"
          value={`${user?.firstName} ${user?.lastName}`}
          disabled
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={user?.email}
          disabled
        />
      </div>

      <div>
        <Label htmlFor="phone">Téléphone</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="date">Date souhaitée</Label>
        <Input
          id="date"
          type="date"
          onChange={(e) => setDate(e.target.valueAsDate || undefined)}
          required
        />
      </div>

      <div>
        <Label htmlFor="time">Heure souhaitée</Label>
        <Input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="message">Message (optionnel)</Label>
        <Input
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Envoi en cours..." : "Réserver"}
      </Button>
    </form>
  );
};