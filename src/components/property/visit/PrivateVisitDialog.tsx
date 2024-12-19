import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { type Property } from "@/types/property";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertySelection } from "./PropertySelection";
import { DateTimeSelection } from "./DateTimeSelection";
import { VisitConfirmation } from "./VisitConfirmation";

interface PrivateVisitDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialProperty?: Property;
}

export function PrivateVisitDialog({ isOpen, onClose, initialProperty }: PrivateVisitDialogProps) {
  const [activeTab, setActiveTab] = useState("properties");
  const [selectedProperties, setSelectedProperties] = useState<Property[]>(
    initialProperty ? [initialProperty] : []
  );
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime || selectedProperties.length === 0) {
      toast({
        title: "Information manquante",
        description: "Veuillez sélectionner une date, une heure et au moins un bien.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Demande envoyée",
      description: "Votre demande de visite privée a été envoyée avec succès.",
    });
    
    onClose();
  };

  const canProceed = {
    properties: selectedProperties.length > 0,
    datetime: selectedDate && selectedTime,
    confirmation: selectedDate && selectedTime && selectedProperties.length > 0,
  };

  const handleTabChange = (value: string) => {
    if (
      (value === "datetime" && !canProceed.properties) ||
      (value === "confirmation" && !canProceed.datetime)
    ) {
      return;
    }
    setActiveTab(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Planifier une visite privée</DialogTitle>
          <DialogDescription>
            Sélectionnez les biens que vous souhaitez visiter et choisissez une date.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="properties">Biens</TabsTrigger>
            <TabsTrigger 
              value="datetime" 
              disabled={!canProceed.properties}
            >
              Date & Heure
            </TabsTrigger>
            <TabsTrigger 
              value="confirmation"
              disabled={!canProceed.datetime}
            >
              Confirmation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="properties">
            <PropertySelection
              selectedProperties={selectedProperties}
              setSelectedProperties={setSelectedProperties}
              initialProperty={initialProperty}
            />
          </TabsContent>

          <TabsContent value="datetime">
            <DateTimeSelection
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          </TabsContent>

          <TabsContent value="confirmation">
            <VisitConfirmation
              selectedProperties={selectedProperties}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              comment={comment}
              setComment={setComment}
            />
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <div className="flex w-full justify-between">
            {activeTab !== "properties" && (
              <Button
                variant="outline"
                onClick={() => setActiveTab(activeTab === "confirmation" ? "datetime" : "properties")}
              >
                Retour
              </Button>
            )}
            <div className="flex-grow"></div>
            {activeTab === "confirmation" ? (
              <Button onClick={handleConfirm}>
                Confirmer la visite
              </Button>
            ) : (
              <Button
                onClick={() => handleTabChange(
                  activeTab === "properties" ? "datetime" : "confirmation"
                )}
                disabled={
                  (activeTab === "properties" && !canProceed.properties) ||
                  (activeTab === "datetime" && !canProceed.datetime)
                }
              >
                Suivant
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}