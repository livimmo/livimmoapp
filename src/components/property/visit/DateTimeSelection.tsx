import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { fr } from "date-fns/locale";

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
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="font-medium">Date de visite</h4>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          locale={fr}
          disabled={(date) => date < new Date() || date.getDay() === 0}
          className="rounded-md border"
        />
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Plage horaire</h4>
        <RadioGroup
          value={selectedTime}
          onValueChange={setSelectedTime}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <div>
            <RadioGroupItem
              value="morning"
              id="morning"
              className="peer sr-only"
            />
            <Label
              htmlFor="morning"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <span>Matin</span>
              <span className="text-sm text-muted-foreground">9h-12h</span>
            </Label>
          </div>

          <div>
            <RadioGroupItem
              value="afternoon"
              id="afternoon"
              className="peer sr-only"
            />
            <Label
              htmlFor="afternoon"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <span>Après-midi</span>
              <span className="text-sm text-muted-foreground">14h-17h</span>
            </Label>
          </div>

          <div>
            <RadioGroupItem
              value="evening"
              id="evening"
              className="peer sr-only"
            />
            <Label
              htmlFor="evening"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <span>Soir</span>
              <span className="text-sm text-muted-foreground">17h-19h</span>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}