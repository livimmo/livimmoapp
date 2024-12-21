import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PropertyManagementTable } from "@/components/property/management/PropertyManagementTable";
import { AddPropertyDialog } from "@/components/property/AddPropertyDialog";
import { useToast } from "@/hooks/use-toast";
import { mockProperties } from "@/data/mockProperties";

const PropertyManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [properties, setProperties] = useState(mockProperties);

  const isAgent = user?.role === "agent" || user?.role === "promoter";

  const handleStatusChange = (propertyId: number, status: string) => {
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

  const handleDelete = (propertyId: number) => {
    setProperties(prev => prev.filter(property => property.id !== propertyId));
    toast({
      title: "Bien supprimé",
      description: "Le bien a été supprimé avec succès.",
    });
  };

  const handleEdit = (property: any) => {
    console.log("Édition du bien:", property);
    // TODO: Implémenter l'édition
  };

  if (!isAgent) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-center">
          Accès réservé aux agents et promoteurs
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des biens</h1>
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
      />

      <AddPropertyDialog
        open={isAddPropertyOpen}
        onOpenChange={setIsAddPropertyOpen}
      />
    </div>
  );
};

export default PropertyManagement;