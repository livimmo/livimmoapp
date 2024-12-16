import { Youtube, Facebook, Instagram, MessageCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface LiveTypeSelectorProps {
  liveType: "youtube" | "facebook" | "instagram" | "whatsapp";
  onLiveTypeChange: (value: "youtube" | "facebook" | "instagram" | "whatsapp") => void;
}

export const LiveTypeSelector = ({ liveType, onLiveTypeChange }: LiveTypeSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Type de Live*</label>
      <RadioGroup
        value={liveType}
        onValueChange={onLiveTypeChange}
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
  );
};