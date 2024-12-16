import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Camera, Mic, Phone, RotateCcw, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Property } from "@/types/property";

interface LiveStreamingSetupProps {
  properties: Property[];
  onStartStream: (config: LiveStreamConfig) => void;
}

export interface LiveStreamConfig {
  title: string;
  propertyId: number;
  estimatedDuration: number;
  autoRecord: boolean;
}

export const LiveStreamingSetup = ({ properties, onStartStream }: LiveStreamingSetupProps) => {
  const [title, setTitle] = useState("");
  const [selectedPropertyId, setSelectedPropertyId] = useState<number>();
  const [estimatedDuration, setEstimatedDuration] = useState(30);
  const [autoRecord, setAutoRecord] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const { toast } = useToast();

  const handleStartStream = () => {
    if (!title || !selectedPropertyId) {
      toast({
        title: "Configuration incomplète",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    onStartStream({
      title,
      propertyId: selectedPropertyId,
      estimatedDuration,
      autoRecord,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Titre du live*</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Visite virtuelle - Villa avec piscine"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="property">Bien associé*</Label>
        <Select value={selectedPropertyId?.toString()} onValueChange={(value) => setSelectedPropertyId(Number(value))}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un bien" />
          </SelectTrigger>
          <SelectContent>
            {properties.map((property) => (
              <SelectItem key={property.id} value={property.id.toString()}>
                {property.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="duration">Durée estimée (minutes)</Label>
        <Input
          id="duration"
          type="number"
          min={1}
          value={estimatedDuration}
          onChange={(e) => setEstimatedDuration(Number(e.target.value))}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="autoRecord" className="cursor-pointer">
          Enregistrer automatiquement
        </Label>
        <Switch
          id="autoRecord"
          checked={autoRecord}
          onCheckedChange={setAutoRecord}
        />
      </div>

      <div className="flex justify-center gap-4 py-4">
        <Button
          variant={isCameraOn ? "default" : "outline"}
          size="icon"
          onClick={() => setIsCameraOn(!isCameraOn)}
        >
          <Camera className="h-4 w-4" />
        </Button>
        <Button
          variant={isMicOn ? "default" : "outline"}
          size="icon"
          onClick={() => setIsMicOn(!isMicOn)}
        >
          <Mic className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setIsCameraOn(true);
            setIsMicOn(true);
          }}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-4">
        <Button onClick={handleStartStream} className="flex-1">
          Démarrer le live
        </Button>
      </div>
    </div>
  );
};