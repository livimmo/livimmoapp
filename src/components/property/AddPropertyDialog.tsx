import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MediaSection } from "./management/sections/MediaSection";
import { BasicDetailsSection } from "./management/sections/BasicDetailsSection";
import { LocationSection } from "./management/sections/LocationSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

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
  const [propertyType, setPropertyType] = useState("");
  const [status, setStatus] = useState("available");
  const [visitType, setVisitType] = useState("live");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !surface || !propertyType || !city || !district) {
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
        propertyType,
        status,
        visitType,
        city,
        district,
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
      <DialogContent className="max-w-4xl max-h-[95vh] p-0 md:h-auto">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-semibold">Ajouter un bien</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 h-full max-h-[calc(95vh-8rem)] overflow-y-auto">
          <div className="p-6 pt-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-3 mb-6">
                  <TabsTrigger value="basic" className="text-sm md:text-base">
                    Informations
                  </TabsTrigger>
                  <TabsTrigger value="location" className="text-sm md:text-base">
                    Localisation
                  </TabsTrigger>
                  <TabsTrigger value="media" className="text-sm md:text-base">
                    Médias
                  </TabsTrigger>
                </TabsList>

                <div className="mt-4">
                  <TabsContent value="basic" className="m-0">
                    <BasicDetailsSection
                      title={title}
                      description={description}
                      price={price}
                      surface={surface}
                      propertyType={propertyType}
                      status={status}
                      visitType={visitType}
                      onTitleChange={setTitle}
                      onDescriptionChange={setDescription}
                      onPriceChange={setPrice}
                      onSurfaceChange={setSurface}
                      onPropertyTypeChange={setPropertyType}
                      onStatusChange={setStatus}
                      onVisitTypeChange={setVisitType}
                    />
                  </TabsContent>

                  <TabsContent value="location" className="m-0">
                    <LocationSection
                      city={city}
                      district={district}
                      onCityChange={setCity}
                      onDistrictChange={setDistrict}
                    />
                  </TabsContent>

                  <TabsContent value="media" className="m-0">
                    <MediaSection
                      onImagesChange={setImages}
                      onVideoChange={setVideo}
                    />
                  </TabsContent>
                </div>
              </Tabs>

              <div className="flex justify-end gap-2 pt-4 sticky bottom-0 bg-white p-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="w-full md:w-auto"
                >
                  Annuler
                </Button>
                <Button type="submit" className="w-full md:w-auto">
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