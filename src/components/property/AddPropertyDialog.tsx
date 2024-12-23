import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MediaSection } from "./management/sections/MediaSection";
import { BasicDetailsSection } from "./management/sections/BasicDetailsSection";
import { LocationSection } from "./management/sections/LocationSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AddPropertyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddPropertyDialog = ({ open, onOpenChange }: AddPropertyDialogProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("basic");
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [surface, setSurface] = useState("");
  const [rooms, setRooms] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [transactionType, setTransactionType] = useState<"Vente" | "Location">("Vente");
  const [features, setFeatures] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !price || !surface || !rooms || !propertyType || !city || !district) {
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
        city,
        district,
        transactionType,
        features,
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
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Ajouter un bien</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(90vh-8rem)]">
          <div className="p-6 pt-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full">
                  <TabsTrigger value="basic" className="flex-1">
                    Informations de base
                  </TabsTrigger>
                  <TabsTrigger value="location" className="flex-1">
                    Localisation
                  </TabsTrigger>
                  <TabsTrigger value="media" className="flex-1">
                    Médias
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic">
                  <BasicDetailsSection
                    title={title}
                    description={description}
                    price={price}
                    surface={surface}
                    rooms={rooms}
                    propertyType={propertyType}
                    transactionType={transactionType}
                    features={features}
                    onTitleChange={setTitle}
                    onDescriptionChange={setDescription}
                    onPriceChange={setPrice}
                    onSurfaceChange={setSurface}
                    onRoomsChange={setRooms}
                    onPropertyTypeChange={setPropertyType}
                    onTransactionTypeChange={setTransactionType}
                    onFeaturesChange={setFeatures}
                  />
                </TabsContent>

                <TabsContent value="location">
                  <LocationSection
                    city={city}
                    district={district}
                    onCityChange={setCity}
                    onDistrictChange={setDistrict}
                  />
                </TabsContent>

                <TabsContent value="media">
                  <MediaSection
                    onImagesChange={setImages}
                    onVideoChange={setVideo}
                  />
                </TabsContent>
              </Tabs>

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
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
