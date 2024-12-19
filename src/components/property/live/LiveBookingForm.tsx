import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";

interface LiveBookingFormProps {
  name: string;
  email: string;
  phone: string;
  onSubmit: (data: {
    date: Date | undefined;
    time: string;
    message: string;
  }) => void;
}

export const LiveBookingForm = ({
  name,
  email,
  phone,
  onSubmit,
}: LiveBookingFormProps) => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date,
      time,
      message,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Vos informations</Label>
        <Input value={name} disabled placeholder="Votre nom" />
        <Input value={email} disabled placeholder="Votre email" />
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Votre téléphone (optionnel)"
        />
      </div>

      <div className="space-y-2">
        <Label>Date souhaitée</Label>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={fr}
          className="rounded-md border"
        />
      </div>

      <div className="space-y-2">
        <Label>Heure souhaitée</Label>
        <Input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Message (optionnel)</Label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Avez-vous des questions particulières pour l'agent ?"
          className="h-24"
        />
      </div>

      <Button type="submit" className="w-full">
        Confirmer la demande
      </Button>
    </form>
  );
};