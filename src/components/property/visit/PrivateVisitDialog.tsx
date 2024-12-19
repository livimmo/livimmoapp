import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertySelection } from "./PropertySelection";
import { DateTimeSelection } from "./DateTimeSelection";
import { VisitConfirmation } from "./VisitConfirmation";
import { type Property } from "@/types/property";
import { useToast } from "@/hooks/use-toast";

interface PrivateVisitDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialProperty?: Property;
}

export const PrivateVisitDialog = ({
  isOpen,
  onClose,
  initialProperty,
}: PrivateVisitDialogProps) => {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>(
    initialProperty ? [initialProperty] : []
  );
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState("properties");
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

    // TODO: Implement API call to save visit request
    console.log("Visit request:", {
      properties: selectedProperties,
      date: selectedDate,
      time: selectedTime,
      comment,
    });

    toast({
      title: "Demande envoyée !",
      description: "Votre demande de visite privée a été envoyée. Vous recevrez une confirmation sous peu.",
    });

    onClose();
  };

  const canProceedToDateTime = selectedProperties.length > 0;
  const canProceedToConfirmation = selectedDate && selectedTime;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Planifier une visite privée</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="properties">Biens</TabsTrigger>
            <TabsTrigger 
              value="datetime" 
              disabled={!canProceedToDateTime}
            >
              Date & Heure
            </TabsTrigger>
            <TabsTrigger 
              value="confirmation" 
              disabled={!canProceedToConfirmation}
            >
              Confirmation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="properties">
            <PropertySelection
              selectedProperties={selectedProperties}
              onPropertySelect={setSelectedProperties}
              initialProperty={initialProperty}
              onNext={() => setActiveTab("datetime")}
              canProceed={canProceedToDateTime}
            />
          </TabsContent>

          <TabsContent value="datetime">
            <DateTimeSelection
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onDateChange={setSelectedDate}
              onTimeChange={setSelectedTime}
              onNext={() => setActiveTab("confirmation")}
              onBack={() => setActiveTab("properties")}
              canProceed={canProceedToConfirmation}
            />
          </TabsContent>

          <TabsContent value="confirmation">
            <VisitConfirmation
              selectedProperties={selectedProperties}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              comment={comment}
              onCommentChange={setComment}
              onConfirm={handleConfirm}
              onBack={() => setActiveTab("datetime")}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};