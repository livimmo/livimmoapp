import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MediaSection } from "./management/sections/MediaSection";
import { BasicDetailsSection } from "./management/sections/BasicDetailsSection";
import { LocationSection } from "./management/sections/LocationSection";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AddPropertyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddPropertyDialog = ({ open, onOpenChange }: AddPropertyDialogProps) => {
  const { toast } = useToast();
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [surface, setSurface] = useState("");
  const [rooms, setRooms] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !price || !surface || !rooms || !propertyType || !location) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    try {
      // TODO: Implement API call
      console.log("Form submitted:", {
        title,
        description,
        price,
        surface,
        rooms,
        propertyType,
        location,
        images,
        video,
      });

      toast({
        title: "Succès",
        description: "Le bien a été ajouté avec succès",
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout du bien",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Ajouter un bien</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6 pt-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <MediaSection
              onImagesChange={setImages}
              onVideoChange={setVideo}
            />

            <BasicDetailsSection
              title={title}
              description={description}
              price={price}
              surface={surface}
              rooms={rooms}
              propertyType={propertyType}
              onTitleChange={setTitle}
              onDescriptionChange={setDescription}
              onPriceChange={setPrice}
              onSurfaceChange={setSurface}
              onRoomsChange={setRooms}
              onPropertyTypeChange={setPropertyType}
            />

            <LocationSection
              location={location}
              onLocationChange={setLocation}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Annuler
              </Button>
              <Button type="submit">
                Ajouter le bien
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};