import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";

interface AddPropertyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddPropertyDialog = ({ open, onOpenChange }: AddPropertyDialogProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [surface, setSurface] = useState("");
  const [rooms, setRooms] = useState("");
  const [description, setDescription] = useState("");
  const [transactionType, setTransactionType] = useState<"Vente" | "Location">("Vente");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !type || !price || !location || !surface || !rooms) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    // TODO: Implement property creation logic
    toast({
      title: "Bien ajouté",
      description: "Le bien a été ajouté avec succès",
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ajouter un bien</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre*</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Villa moderne avec piscine"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type de bien*</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  {PROPERTY_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Prix*</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Prix en DH"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Localisation*</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: Marrakech, Guéliz"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="surface">Surface (m²)*</Label>
              <Input
                id="surface"
                type="number"
                value={surface}
                onChange={(e) => setSurface(e.target.value)}
                placeholder="Surface en m²"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rooms">Nombre de pièces*</Label>
              <Input
                id="rooms"
                type="number"
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
                placeholder="Nombre de pièces"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transactionType">Type de transaction*</Label>
              <Select 
                value={transactionType} 
                onValueChange={(value: "Vente" | "Location") => setTransactionType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vente">Vente</SelectItem>
                  <SelectItem value="Location">Location</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description détaillée du bien"
              className="h-32"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              Ajouter le bien
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};