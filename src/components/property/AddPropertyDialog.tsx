import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MediaSection } from "./management/sections/MediaSection";
import { BasicDetailsSection } from "./management/sections/BasicDetailsSection";
import { LocationSection } from "./management/sections/LocationSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  const cities = [
    { name: "Casablanca", districts: ["Ain Diab", "Gauthier", "Maarif", "Anfa"] },
    { name: "Marrakech", districts: ["Guéliz", "Hivernage", "Palmeraie", "Médina"] },
    { name: "Rabat", districts: ["Agdal", "Hassan", "Hay Riad", "Les Orangers"] },
    { name: "Tanger", districts: ["Malabata", "Centre-ville", "Boukhalef"] },
  ];

  const availableFeatures = [
    "Piscine",
    "Jardin",
    "Terrasse",
    "Parking",
    "Ascenseur",
    "Climatisation",
    "Sécurité 24/7",
    "Vue mer",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Ajouter un bien</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <form onSubmit={handleSubmit} className="p-6 pt-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Informations de base</TabsTrigger>
                <TabsTrigger value="location">Localisation</TabsTrigger>
                <TabsTrigger value="media">Médias</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
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

                <div className="space-y-2">
                  <Label>Type de transaction*</Label>
                  <Select value={transactionType} onValueChange={(value: "Vente" | "Location") => setTransactionType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le type de transaction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vente">Vente</SelectItem>
                      <SelectItem value="Location">Location</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Caractéristiques</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {availableFeatures.map((feature) => (
                      <Button
                        key={feature}
                        type="button"
                        variant={features.includes(feature) ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setFeatures((prev) =>
                            prev.includes(feature)
                              ? prev.filter((f) => f !== feature)
                              : [...prev, feature]
                          );
                        }}
                      >
                        {feature}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="location" className="space-y-6">
                <div className="space-y-2">
                  <Label>Ville*</Label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une ville" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.name} value={city.name}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Quartier*</Label>
                  <Select 
                    value={district} 
                    onValueChange={setDistrict}
                    disabled={!city}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un quartier" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities
                        .find((c) => c.name === city)
                        ?.districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <LocationSection
                  location={`${city}${district ? `, ${district}` : ""}`}
                  onLocationChange={() => {}}
                />
              </TabsContent>

              <TabsContent value="media">
                <MediaSection
                  onImagesChange={setImages}
                  onVideoChange={setVideo}
                />
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 pt-6">
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