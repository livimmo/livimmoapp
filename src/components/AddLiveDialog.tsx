import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Video, Youtube, Facebook, Instagram, MessageCircle, MapPin, Home, Tag, X, Save } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { GoogleMapInput } from "./GoogleMapInput";
import { ImageCarousel } from "./property/ImageCarousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";

export const AddLiveDialog = ({ variant = "default" }: { variant?: "default" | "minimal" }) => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("12:00");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [liveType, setLiveType] = useState<"youtube" | "facebook" | "instagram" | "whatsapp">("youtube");
  const [liveUrl, setLiveUrl] = useState("");
  const [price, setPrice] = useState("");
  const [surface, setSurface] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !title || !liveUrl || !price || !surface || !location || !propertyType) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    const dateTime = new Date(date);
    const [hours, minutes] = time.split(":");
    dateTime.setHours(parseInt(hours), parseInt(minutes));

    toast({
      title: "Live programmé !",
      description: `Votre live "${title}" a été programmé pour le ${dateTime.toLocaleDateString()} à ${time}`,
    });
    setOpen(false);
  };

  const availableTags = [
    "Nouveauté",
    "Coup de cœur",
    "Vue mer",
    "Piscine",
    "Jardin",
    "Terrasse",
  ];

  const handleTagToggle = (tag: string) => {
    setTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getLiveUrlPlaceholder = () => {
    switch (liveType) {
      case "youtube": return "https://youtube.com/live/...";
      case "facebook": return "https://facebook.com/live/...";
      case "instagram": return "https://instagram.com/live/...";
      case "whatsapp": return "https://wa.me/...";
      default: return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {variant === "minimal" ? (
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="gap-2 bg-[#ea384c] text-white hover:bg-[#ea384c]/90">
            <Plus className="h-4 w-4" />
            Ajouter un Live
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-white pt-4 pb-2 z-10">
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle>Programmer un nouveau Live</DialogTitle>
              <DialogDescription>
                Remplissez les informations pour programmer votre visite en direct
              </DialogDescription>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-4 top-4"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Titre du Live*</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Visite Villa Moderne Casablanca"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Prix*</label>
              <div className="relative">
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Prix en DH"
                  required
                  className="pl-8"
                />
                <span className="absolute left-2 top-2.5 text-muted-foreground text-sm">DH</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Photos du bien</label>
            <ImageCarousel images={images} onImagesChange={setImages} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description du bien</label>
            <div className="relative">
              <Textarea
                value={description}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    setDescription(e.target.value);
                  }
                }}
                placeholder="Ajoutez une description du bien (surface, localisation, points forts, etc.)"
                className="min-h-[100px]"
              />
              <div className="absolute bottom-2 right-2 text-sm text-muted-foreground">
                {description.length}/500
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Astuce : Incluez les points clés comme la surface, le nombre de pièces, et les équipements disponibles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Surface*</label>
              <div className="relative">
                <Input
                  type="number"
                  value={surface}
                  onChange={(e) => setSurface(e.target.value)}
                  placeholder="Surface en m²"
                  required
                  className="pl-8"
                />
                <span className="absolute left-2 top-2.5 text-muted-foreground text-sm">m²</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Type de bien*</label>
              <div className="relative">
                <Home className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Select value={propertyType} onValueChange={setPropertyType} required>
                  <SelectTrigger className="pl-8">
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
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Localisation*</label>
            <GoogleMapInput onLocationSelect={setLocation} />
            <div className="relative mt-2">
              <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Adresse du bien"
                required
                className="pl-8"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <Button
                  key={tag}
                  type="button"
                  variant={tags.includes(tag) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date et heure du Live*</label>
              <div className="space-y-2">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Type de Live*</label>
              <RadioGroup
                value={liveType}
                onValueChange={(value: "youtube" | "facebook" | "instagram" | "whatsapp") => setLiveType(value)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="youtube" id="youtube" />
                  <Label htmlFor="youtube" className="flex items-center gap-2">
                    <Youtube className="h-4 w-4" />
                    YouTube Live
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="facebook" id="facebook" />
                  <Label htmlFor="facebook" className="flex items-center gap-2">
                    <Facebook className="h-4 w-4" />
                    Facebook Live
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="instagram" id="instagram" />
                  <Label htmlFor="instagram" className="flex items-center gap-2">
                    <Instagram className="h-4 w-4" />
                    Instagram Live
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="whatsapp" id="whatsapp" />
                  <Label htmlFor="whatsapp" className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Video
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">URL du Live*</label>
            <Input
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder={getLiveUrlPlaceholder()}
              required
            />
          </div>

          <div className="flex gap-2 justify-end sticky bottom-0 bg-white pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90">
              <Save className="mr-2 h-4 w-4" />
              Enregistrer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};