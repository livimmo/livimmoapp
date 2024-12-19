import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Video, House } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VisitTabContentProps {
  visitType: string;
  visitDate: Date | undefined;
  visitTime: string;
  onVisitTypeChange: (value: string) => void;
  onVisitDateChange: (date: Date | undefined) => void;
  onVisitTimeChange: (time: string) => void;
  onSubmit: () => void;
}

export const VisitTabContent = ({
  visitType,
  visitDate,
  visitTime,
  onVisitTypeChange,
  onVisitDateChange,
  onVisitTimeChange,
  onSubmit,
}: VisitTabContentProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Type de visite</Label>
        <Select value={visitType} onValueChange={onVisitTypeChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="physical">
              <div className="flex items-center">
                <House className="w-4 h-4 mr-2" />
                Visite physique
              </div>
            </SelectItem>
            <SelectItem value="virtual">
              <div className="flex items-center">
                <Video className="w-4 h-4 mr-2" />
                Visite virtuelle
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Date de la visite</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {visitDate ? (
                format(visitDate, 'dd MMMM yyyy', { locale: fr })
              ) : (
                <span>Sélectionner une date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white" align="start">
            <Calendar
              mode="single"
              selected={visitDate}
              onSelect={onVisitDateChange}
              initialFocus
              disabled={(date) => date < new Date()}
              className="bg-white rounded-md border"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label>Heure de la visite</Label>
        <Input
          type="time"
          value={visitTime}
          onChange={(e) => onVisitTimeChange(e.target.value)}
        />
      </div>

      <Button onClick={onSubmit} className="w-full bg-[#ea384c] hover:bg-[#ea384c]/90 text-white">
        {visitType === 'physical' ? (
          <House className="w-4 h-4 mr-2" />
        ) : (
          <Video className="w-4 h-4 mr-2" />
        )}
        Réserver la visite
      </Button>
    </div>
  );
};