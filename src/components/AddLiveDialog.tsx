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
import { Plus } from "lucide-react";

export const AddLiveDialog = () => {
  const [date, setDate] = useState<Date>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [liveType, setLiveType] = useState<"youtube" | "whatsapp">("youtube");
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

    // TODO: Implement live creation logic
    toast({
      title: "Live programmé !",
      description: `Votre live "${title}" a été programmé pour le ${date.toLocaleDateString()}`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
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
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={liveType === "youtube"}
                  onChange={() => setLiveType("youtube")}
                  name="liveType"
                />
                YouTube Live
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={liveType === "whatsapp"}
                  onChange={() => setLiveType("whatsapp")}
                  name="liveType"
                />
                WhatsApp Video
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {liveType === "youtube" ? "URL YouTube Live*" : "Lien WhatsApp*"}
            </label>
            <Input
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder={
                liveType === "youtube"
                  ? "https://youtube.com/live/..."
                  : "https://wa.me/..."
              }
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Programmer le Live
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};