import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddPropertyDialog } from "../AddPropertyDialog";

export const AddPropertyButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      {/* Version Desktop */}
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="hidden md:flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Ajouter un Bien
      </Button>

      {/* Version Mobile */}
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="md:hidden fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 shadow-lg"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>

      <AddPropertyDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
};