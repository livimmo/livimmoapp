import { Calendar } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface DateTimeSelectionProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedTime: string | undefined;
  setSelectedTime: (time: string) => void;
}

export function DateTimeSelection({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}: DateTimeSelectionProps) {
  const timeSlots = [
    { label: "Matin (9h-12h)", value: "morning" },
    { label: "Après-midi (14h-17h)", value: "afternoon" },
    { label: "Soir (17h-19h)", value: "evening" },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Date de visite</Label>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          locale={fr}
          disabled={(date) => date < new Date()}
          className="rounded-md border"
        />
      </div>

      <div className="space-y-2">
        <Label>Horaire préféré</Label>
        <RadioGroup
          value={selectedTime}
          onValueChange={setSelectedTime}
          className="grid gap-4"
        >
          {timeSlots.map((slot) => (
            <div key={slot.value} className="flex items-center space-x-2">
              <RadioGroupItem value={slot.value} id={slot.value} />
              <Label htmlFor={slot.value}>{slot.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}