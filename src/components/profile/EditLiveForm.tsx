import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { BasicInfoFields } from "./live-edit/BasicInfoFields";
import { LocationFields } from "./live-edit/LocationFields";
import { TagSelector } from "./live-edit/TagSelector";
import { DateTimeSelector } from "./live-edit/DateTimeSelector";
import { LiveTypeSelector } from "./live-edit/LiveTypeSelector";

interface EditLiveFormProps {
  live: {
    id: number;
    title: string;
    date: Date;
    type: string;
  };
  onClose: () => void;
}

export const EditLiveForm = ({ live, onClose }: EditLiveFormProps) => {
  const [date, setDate] = useState<Date>(live.date);
  const [time, setTime] = useState(live.date.toTimeString().slice(0, 5));
  const [title, setTitle] = useState(live.title);
  const [description, setDescription] = useState("");
  const [liveType, setLiveType] = useState<"youtube" | "facebook" | "instagram" | "whatsapp">("youtube");
  const [liveUrl, setLiveUrl] = useState("");
  const [price, setPrice] = useState("");
  const [surface, setSurface] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const { toast } = useToast();

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
      title: "Live modifié !",
      description: `Votre live "${title}" a été mis à jour pour le ${dateTime.toLocaleDateString()} à ${time}`,
    });
    onClose();
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicInfoFields
        title={title}
        description={description}
        price={price}
        surface={surface}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onPriceChange={setPrice}
        onSurfaceChange={setSurface}
      />

      <LocationFields
        location={location}
        propertyType={propertyType}
        onLocationChange={setLocation}
        onPropertyTypeChange={setPropertyType}
      />

      <TagSelector
        selectedTags={tags}
        availableTags={availableTags}
        onChange={setTags}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DateTimeSelector
          date={date}
          time={time}
          onDateChange={setDate}
          onTimeChange={setTime}
        />

        <LiveTypeSelector
          liveType={liveType}
          onLiveTypeChange={setLiveType}
        />
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
        <Button type="button" variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit" className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90">
          <Save className="mr-2 h-4 w-4" />
          Enregistrer
        </Button>
      </div>
    </form>
  );
};
