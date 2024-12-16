import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";

export const LiveForm = ({ onSubmit, propertyData, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || propertyData?.title || "");
  const [date, setDate] = useState(initialData?.date || new Date());
  const [time, setTime] = useState(initialData?.time || "");
  const [type, setType] = useState(initialData?.type || "scheduled");
  const [enableChat, setEnableChat] = useState(initialData?.enableChat ?? true);
  const [enableOffers, setEnableOffers] = useState(initialData?.enableOffers ?? true);
  const [enableQuestions, setEnableQuestions] = useState(initialData?.enableQuestions ?? true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      date,
      time,
      type,
      enableChat,
      enableOffers,
      enableQuestions
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Titre du Live*</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Visite virtuelle - Appartement moderne à Marrakech"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Type de Live*</Label>
        <RadioGroup value={type} onValueChange={setType} className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="immediate" id="immediate" />
            <Label htmlFor="immediate">Immédiat</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="scheduled" id="scheduled" />
            <Label htmlFor="scheduled">Programmé</Label>
          </div>
        </RadioGroup>
      </div>

      {type === "scheduled" && (
        <div className="space-y-4">
          <div>
            <Label>Date du Live*</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border mt-2"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Heure du Live*</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required={type === "scheduled"}
            />
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Label>Paramètres d'interaction</Label>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="chat">Chat en direct</Label>
          <Switch
            id="chat"
            checked={enableChat}
            onCheckedChange={setEnableChat}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="offers">Permettre les offres</Label>
          <Switch
            id="offers"
            checked={enableOffers}
            onCheckedChange={setEnableOffers}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="questions">Permettre les questions</Label>
          <Switch
            id="questions"
            checked={enableQuestions}
            onCheckedChange={setEnableQuestions}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit">
          Suivant
        </Button>
      </div>
    </form>
  );
};