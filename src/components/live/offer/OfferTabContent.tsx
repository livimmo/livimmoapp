import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Euro } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface OfferTabContentProps {
  offerAmount: number;
  validUntil: Date | undefined;
  price: number;
  onOfferAmountChange: (value: number) => void;
  onValidUntilChange: (date: Date | undefined) => void;
  onSubmit: () => void;
}

export const OfferTabContent = ({
  offerAmount,
  validUntil,
  price,
  onOfferAmountChange,
  onValidUntilChange,
  onSubmit,
}: OfferTabContentProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="amount">Montant de votre offre (DH)</Label>
        <Input
          id="amount"
          type="number"
          value={offerAmount}
          onChange={(e) => onOfferAmountChange(Number(e.target.value))}
          className="text-lg"
        />
        <p className="text-sm text-muted-foreground">
          Prix demandé : {price.toLocaleString()} DH
        </p>
      </div>

      <div className="space-y-2">
        <Label>Date de validité de l'offre</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {validUntil ? (
                format(validUntil, 'dd MMMM yyyy', { locale: fr })
              ) : (
                <span>Sélectionner une date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white" align="start">
            <Calendar
              mode="single"
              selected={validUntil}
              onSelect={onValidUntilChange}
              initialFocus
              disabled={(date) => date < new Date()}
              className="bg-white rounded-md border"
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button onClick={onSubmit} className="w-full bg-[#ea384c] hover:bg-[#ea384c]/90 text-white">
        <Euro className="w-4 h-4 mr-2" />
        Envoyer l'offre
      </Button>
    </div>
  );
};