import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface BuyFormProps {
  propertyId: string;
  propertyTitle: string;
  onClose: () => void;
}

export const BuyForm = ({ propertyId, propertyTitle, onClose }: BuyFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implement API call
    console.log("Buy offer submitted:", { propertyId, name, email, phone, message });
    
    toast({
      title: "Demande envoyée !",
      description: "Votre demande d'achat a bien été transmise à l'agent.",
    });
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DialogHeader>
        <DialogTitle>Faire une offre d'achat</DialogTitle>
        <DialogDescription>
          Pour le bien : {propertyTitle}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <Input
          placeholder="Nom et prénom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <Input
          type="tel"
          placeholder="Numéro de téléphone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        
        <Textarea
          placeholder="Message complémentaire"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit">
          Envoyer
        </Button>
      </div>
    </form>
  );
};