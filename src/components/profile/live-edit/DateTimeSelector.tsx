import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

interface DateTimeSelectorProps {
  date: Date | undefined;
  time: string;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
}

export const DateTimeSelector = ({
  date,
  time,
  onDateChange,
  onTimeChange,
}: DateTimeSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Date et heure du Live*</label>
      <div className="space-y-2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          className="rounded-md border"
        />
        <Input
          type="time"
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          required
          className="mt-2"
        />
      </div>
    </div>
  );
};