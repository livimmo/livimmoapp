import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface OfferFormProps {
  title: string;
  price: number;
  offerAmount: number;
  message: string;
  name: string;
  email: string;
  phone: string;
  validUntil: Date | undefined;
  isAuthenticated: boolean;
  onOfferAmountChange: (amount: number) => void;
  onMessageChange: (message: string) => void;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
  onPhoneChange: (phone: string) => void;
  onValidUntilChange: (date: Date | undefined) => void;
}

export const OfferForm = ({
  title,
  price,
  offerAmount,
  message,
  name,
  email,
  phone,
  validUntil,
  isAuthenticated,
  onOfferAmountChange,
  onMessageChange,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onValidUntilChange,
}: OfferFormProps) => {
  return (
    <div className="space-y-4">
      {!isAuthenticated && (
        <>
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet *</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="john@example.com"
              required
            />
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="phone">Téléphone *</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="+212 6XX XXX XXX"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Montant de votre offre (DH) *</Label>
        <Input
          id="amount"
          type="number"
          value={offerAmount}
          onChange={(e) => onOfferAmountChange(Number(e.target.value))}
          className="mt-1"
        />
        <p className="text-sm text-muted-foreground">
          Prix demandé : {price.toLocaleString()} DH
        </p>
      </div>

      <div className="space-y-2">
        <Label>Date de validité de l'offre *</Label>
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

      <div className="space-y-2">
        <Label htmlFor="message">Message (optionnel)</Label>
        <Textarea
          id="message"
          placeholder="Expliquez votre offre..."
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          className="mt-1"
        />
      </div>
    </div>
  );
};