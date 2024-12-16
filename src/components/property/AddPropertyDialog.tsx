import { useState } from "react";
import { Plus, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GoogleMapInput } from "@/components/GoogleMapInput";
import { ImageCarousel } from "@/components/property/ImageCarousel";

export const AddPropertyDialog = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Bien ajouté",
      description: "Le bien a été ajouté avec succès à votre liste.",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <Building className="h-4 w-4" />
          Ajouter un bien
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau bien</DialogTitle>
          <DialogDescription>
            Remplissez les informations du bien que vous souhaitez ajouter à votre liste.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titre*</Label>
              <Input
                id="title"
                placeholder="Ex: Villa moderne à Casablanca"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type de bien*</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type" />
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
              <Label htmlFor="price">Prix (MAD)*</Label>
              <Input
                id="price"
                type="number"
                placeholder="Prix en MAD"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="surface">Surface (m²)*</Label>
              <Input
                id="surface"
                type="number"
                placeholder="Surface en m²"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rooms">Nombre de pièces*</Label>
              <Input
                id="rooms"
                type="number"
                placeholder="Nombre de pièces"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bathrooms">Salles de bain*</Label>
              <Input
                id="bathrooms"
                type="number"
                placeholder="Nombre de salles de bain"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Localisation*</Label>
            <GoogleMapInput onLocationSelect={setLocation} />
            <Input value={location} readOnly className="mt-2" />
          </div>

          <div className="space-y-2">
            <Label>Photos</Label>
            <ImageCarousel images={images} onImagesChange={setImages} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Décrivez les points forts du bien..."
              className="h-32"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit">Ajouter le bien</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};