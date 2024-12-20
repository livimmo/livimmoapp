import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Property } from "@/types/property";
import { mockProperties } from "@/data/mockProperties";
import { VisitTypeSelector, VisitType } from "./visits/VisitTypeSelector";

interface PrivateVisitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PrivateVisitDialog = ({ open, onOpenChange }: PrivateVisitDialogProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [visitType, setVisitType] = useState<VisitType | null>(null);
  const [selectedProperties, setSelectedProperties] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [comment, setComment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProperties = mockProperties.filter(property => 
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVisitTypeSelect = (type: VisitType) => {
    setVisitType(type);
    setStep(2);
  };

  const handlePropertyToggle = (propertyId: number) => {
    setSelectedProperties(prev => 
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || selectedProperties.length === 0) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez sélectionner au moins un bien, une date et une heure.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Demande envoyée !",
      description: `Votre demande de visite ${visitType === 'remote' ? 'à distance' : 'physique'} pour ${selectedProperties.length} bien${selectedProperties.length > 1 ? 's' : ''} a été envoyée.`,
    });
    onOpenChange(false);
    setStep(1);
    setVisitType(null);
    setSelectedProperties([]);
    setSelectedDate(undefined);
    setSelectedTime("");
    setComment("");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <VisitTypeSelector onSelect={handleVisitTypeSelect} />;
      case 2:
        return (
          <div className="space-y-4">
            <Input
              placeholder="Rechercher un bien..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4"
            />
            <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto">
              {filteredProperties.map((property) => (
                <div key={property.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <Checkbox
                    checked={selectedProperties.includes(property.id)}
                    onCheckedChange={() => handlePropertyToggle(property.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-medium truncate">{property.title}</h4>
                        <p className="text-sm text-muted-foreground">{property.location}</p>
                        <p className="text-sm font-medium">{property.price.toLocaleString()} MAD</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Date de visite</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                locale={fr}
              />
            </div>
            <div className="space-y-2">
              <Label>Heure de visite</Label>
              <Input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Commentaire (optionnel)</Label>
              <Input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={
                  visitType === 'remote' 
                    ? "Précisez vos préférences pour la visite à distance..."
                    : "Ajoutez des informations pour la visite physique..."
                }
              />
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {step === 1 && "Choisir le type de visite"}
            {step === 2 && "Sélectionner les biens à visiter"}
            {step === 3 && `Planifier la visite ${visitType === 'remote' ? 'à distance' : 'physique'}`}
          </DialogTitle>
        </DialogHeader>

        {renderStep()}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
            >
              Retour
            </Button>
          )}
          <div className="ml-auto">
            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 ? !visitType : selectedProperties.length === 0}
              >
                Suivant
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                Confirmer la visite
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
