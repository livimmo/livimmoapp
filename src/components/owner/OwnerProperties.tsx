import { PropertyManagementTable } from "@/components/property/management/PropertyManagementTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddPropertyDialog } from "@/components/property/AddPropertyDialog";
import { useToast } from "@/hooks/use-toast";
import { mockProperties } from "@/data/mockProperties";

export const OwnerProperties = () => {
  const { toast } = useToast();
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [properties, setProperties] = useState(mockProperties);

  const handleStatusChange = (propertyId: string, status: "available" | "pending" | "sold" | "rented") => {
    setProperties(prev =>
      prev.map(property =>
        property.id === propertyId ? { ...property, status } : property
      )
    );
    toast({
      title: "Statut mis à jour",
      description: "Le statut du bien a été mis à jour avec succès.",
    });
  };

  const handleDelete = (propertyId: string) => {
    setProperties(prev => prev.filter(property => property.id !== propertyId));
    toast({
      title: "Bien supprimé",
      description: "Le bien a été supprimé avec succès.",
    });
  };

  const handleEdit = (property: any) => {
    console.log("Édition du bien:", property);
  };

  const handleNotesChange = (propertyId: string, notes: any) => {
    setProperties(prev =>
      prev.map(property =>
        property.id === propertyId
          ? { ...property, privateNotes: notes }
          : property
      )
    );
    toast({
      title: "Notes mises à jour",
      description: "Les notes privées ont été mises à jour avec succès.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setIsAddPropertyOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un bien
        </Button>
      </div>

      <PropertyManagementTable
        properties={properties}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
        onNotesChange={handleNotesChange}
      />

      <AddPropertyDialog
        open={isAddPropertyOpen}
        onOpenChange={setIsAddPropertyOpen}
      />
    </div>
  );
};