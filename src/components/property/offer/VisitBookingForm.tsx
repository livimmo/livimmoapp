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
import { ScrollArea } from "@/components/ui/scroll-area";

interface VisitBookingFormProps {
  name: string;
  email: string;
  phone: string;
  onSubmit: (visitData: {
    type: string;
    date: Date | undefined;
    time: string;
    message: string;
  }) => void;
}

export const VisitBookingForm = ({ name, email, phone, onSubmit }: VisitBookingFormProps) => {
  const [visitType, setVisitType] = useState("physical");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type: visitType,
      date: selectedDate,
      time: selectedTime,
      message,
    });
  };

  return (
    <ScrollArea className="h-[400px] pr-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Type de visite</Label>
          <Select value={visitType} onValueChange={setVisitType}>
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
                locale={fr}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Heure souhaitée</Label>
          <Select value={selectedTime} onValueChange={setSelectedTime}>
            <SelectTrigger>
              <SelectValue placeholder="Choisir une heure" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 11 }, (_, i) => i + 8).map((hour) => (
                <>
                  <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                    {`${hour}:00`}
                  </SelectItem>
                  <SelectItem key={`${hour}:30`} value={`${hour}:30`}>
                    {`${hour}:30`}
                  </SelectItem>
                </>
              ))}
            </SelectContent>
          </Select>
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

        <Button type="submit" className="w-full">
          Confirmer la réservation
        </Button>
      </form>
    </ScrollArea>
  );
};