import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CalendarDays, Calendar, List } from "lucide-react";

export type ViewType = "day" | "week" | "month" | "list";

interface CalendarViewSelectorProps {
  value: ViewType;
  onValueChange: (value: ViewType) => void;
}

export const CalendarViewSelector = ({ value, onValueChange }: CalendarViewSelectorProps) => {
  return (
    <ToggleGroup type="single" value={value} onValueChange={onValueChange}>
      <ToggleGroupItem value="day" aria-label="Vue journalière">
        <Calendar className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="week" aria-label="Vue hebdomadaire">
        <CalendarDays className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="month" aria-label="Vue mensuelle">
        <Calendar className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="Vue liste">
        <List className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};