import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Video, Youtube, Facebook, Instagram, MessageCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const AddLiveDialog = () => {
  const [date, setDate] = useState<Date>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [liveType, setLiveType] = useState<"youtube" | "facebook" | "instagram" | "whatsapp">("youtube");
  const [liveUrl, setLiveUrl] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !title || !liveUrl) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Live programmé !",
      description: `Votre live "${title}" a été programmé pour le ${date.toLocaleDateString()}`,
    });
  };

  const getLiveUrlPlaceholder = () => {
    switch (liveType) {
      case "youtube":
        return "https://youtube.com/live/...";
      case "facebook":
        return "https://facebook.com/live/...";
      case "instagram":
        return "https://instagram.com/live/...";
      case "whatsapp":
        return "https://wa.me/...";
      default:
        return "";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-[#ea384c] text-white hover:bg-[#ea384c]/90">
          <Plus className="h-4 w-4" />
          Ajouter un Live
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Programmer un nouveau Live</DialogTitle>
          <DialogDescription>
            Remplissez les informations pour programmer votre visite en direct
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="text-sm font-medium">Description</label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description de la visite..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Date du Live*</label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
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
          <div className="space-y-2">
            <label className="text-sm font-medium">
              URL du Live*
            </label>
            <Input
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder={getLiveUrlPlaceholder()}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-[#ea384c] text-white hover:bg-[#ea384c]/90">
            <Video className="mr-2 h-4 w-4" />
            Programmer le Live
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};