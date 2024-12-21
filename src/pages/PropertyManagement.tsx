import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PropertyManagementTable } from "@/components/property/management/PropertyManagementTable";
import { AddPropertyDialog } from "@/components/property/AddPropertyDialog";
import { useToast } from "@/hooks/use-toast";
import { mockProperties } from "@/data/mockProperties";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { type Property } from "@/types/property";

const PropertyManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [properties, setProperties] = useState(mockProperties);
  const [statusFilter, setStatusFilter] = useState<"all" | "available" | "pending" | "sold" | "rented">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const isAgent = user?.role === "agent" || user?.role === "promoter";

  const filteredProperties = properties
    .filter(property => statusFilter === "all" ? true : property.status === statusFilter)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const handleStatusChange = (propertyId: number, newStatus: "available" | "pending" | "sold" | "rented") => {
    setProperties(prev =>
      prev.map(property =>
        property.id === propertyId ? { ...property, status: newStatus } : property
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

  const handleEdit = (property: Property) => {
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
        <div className="flex gap-4 items-center">
          <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="available">Disponible</SelectItem>
              <SelectItem value="pending">En cours</SelectItem>
              <SelectItem value="sold">Vendu</SelectItem>
              <SelectItem value="rented">Loué</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}>
            Date {sortOrder === "asc" ? "↑" : "↓"}
          </Button>
          <Button onClick={() => setIsAddPropertyOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un bien
          </Button>
        </div>
      </div>

      <PropertyManagementTable
        properties={filteredProperties}
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