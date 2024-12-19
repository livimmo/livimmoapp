import { useState } from "react";
import { Button } from "@/components/ui/button";
import { House, Calendar } from "lucide-react";
import { PrivateVisitDialog } from "./PrivateVisitDialog";

export const PrivateVisitButton = () => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setShowDialog(true)}
        className="w-full bg-primary hover:bg-primary/90 text-white"
      >
        <House className="w-4 h-4 mr-2" />
        Planifier une Visite Privée
      </Button>

      <PrivateVisitDialog 
        open={showDialog} 
        onOpenChange={setShowDialog}
      />
    </>
  );
};