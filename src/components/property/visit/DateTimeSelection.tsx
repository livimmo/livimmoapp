import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fr } from "date-fns/locale";

interface DateTimeSelectionProps {
  selectedDate: Date | undefined;
  selectedTime: string;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
  onNext: () => void;
  onBack: () => void;
  canProceed: boolean;
}

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export const DateTimeSelection = ({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  onNext,
  onBack,
  canProceed,
}: DateTimeSelectionProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">Sélectionnez une date</h3>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateChange}
          locale={fr}
          disabled={(date) => date < new Date()}
          className="rounded-md border"
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Sélectionnez une heure</h3>
        <Select value={selectedTime} onValueChange={onTimeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Choisir une heure" />
          </SelectTrigger>
          <SelectContent>
            {timeSlots.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Retour
        </Button>
        <Button onClick={onNext} disabled={!canProceed}>
          Suivant
        </Button>
      </div>
    </div>
  );
};