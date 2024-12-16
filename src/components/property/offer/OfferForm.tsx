import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface OfferFormProps {
  title: string;
  price: number;
  offerAmount: number;
  message: string;
  name: string;
  email: string;
  phone: string;
  isAuthenticated: boolean;
  onOfferAmountChange: (amount: number) => void;
  onMessageChange: (message: string) => void;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
  onPhoneChange: (phone: string) => void;
}

export const OfferForm = ({
  title,
  price,
  offerAmount,
  message,
  name,
  email,
  phone,
  isAuthenticated,
  onOfferAmountChange,
  onMessageChange,
  onNameChange,
  onEmailChange,
  onPhoneChange,
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