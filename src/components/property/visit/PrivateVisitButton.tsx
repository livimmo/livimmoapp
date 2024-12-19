import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { PrivateVisitDialog } from "./PrivateVisitDialog";
import { type Property } from "@/types/property";

interface PrivateVisitButtonProps {
  property?: Property;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  className?: string;
}

export const PrivateVisitButton = ({
  property,
  variant = "default",
  className,
}: PrivateVisitButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Ne pas afficher le bouton si le bien est vendu
  if (property?.status === "sold") {
    return null;
  }

  return (
    <>
      <Button
        variant={variant}
        className={className}
        onClick={() => setIsDialogOpen(true)}
      >
        <Home className="h-4 w-4 mr-2" />
        Visite privée
      </Button>

      <PrivateVisitDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        initialProperty={property}
      />
    </>
  );
};