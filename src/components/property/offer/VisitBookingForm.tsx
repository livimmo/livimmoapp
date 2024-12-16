import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { VisitTypeSelector } from "../visit/VisitTypeSelector";
import { useToast } from "@/hooks/use-toast";

interface VisitBookingFormProps {
  name: string;
  email: string;
  phone: string;
  onSubmit: (visitData: {
    type: string;
    date: Date | undefined;
    time: string;
    message: string;
    visitType: "standard" | "premium";
  }) => void;
}

export const VisitBookingForm = ({ name, email, phone, onSubmit }: VisitBookingFormProps) => {
  const [visitType, setVisitType] = useState<"physical" | "virtual">("physical");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState("");
  const [selectedVisitType, setSelectedVisitType] = useState<"standard" | "premium">("standard");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une date et une heure pour la visite",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      type: visitType,
      date: selectedDate,
      time: selectedTime,
      message,
      visitType: selectedVisitType,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <VisitTypeSelector
        selectedType={selectedVisitType}
        onTypeChange={setSelectedVisitType}
      />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Type de visite</Label>
          <Select value={visitType} onValueChange={(value) => setVisitType(value as "physical" | "virtual")}>
            <SelectTrigger>
              <SelectValue placeholder="Choisir le type de visite" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="physical">Visite physique</SelectItem>
              <SelectItem value="virtual">Visite virtuelle</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Date souhaitée</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, 'dd MMMM yyyy', { locale: fr })
                ) : (
                  <span>Sélectionner une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Heure souhaitée</Label>
          <Input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Message (optionnel)</Label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Précisez vos disponibilités ou toute autre information utile..."
            className="h-20"
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        {selectedVisitType === "premium" 
          ? "Continuer vers le paiement" 
          : "Confirmer la réservation"}
      </Button>
    </form>
  );
};