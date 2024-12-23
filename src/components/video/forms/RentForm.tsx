import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RentFormProps {
  propertyId: string;
  propertyTitle: string;
  onClose: () => void;
}

export const RentForm = ({ propertyId, propertyTitle, onClose }: RentFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [duration, setDuration] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implement API call
    console.log("Rent request submitted:", { propertyId, name, email, phone, duration, message });
    
    toast({
      title: "Demande envoyée !",
      description: "Votre demande de location a bien été transmise à l'agent.",
    });
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DialogHeader>
        <DialogTitle>Faire une demande de location</DialogTitle>
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

        <Select value={duration} onValueChange={setDuration}>
          <SelectTrigger>
            <SelectValue placeholder="Durée souhaitée" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">3 mois</SelectItem>
            <SelectItem value="6">6 mois</SelectItem>
            <SelectItem value="12">1 an</SelectItem>
            <SelectItem value="24">2 ans</SelectItem>
          </SelectContent>
        </Select>
        
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