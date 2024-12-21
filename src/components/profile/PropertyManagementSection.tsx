import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PropertyManagementTable } from "@/components/property/management/PropertyManagementTable";
import { AddPropertyDialog } from "@/components/property/AddPropertyDialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@/types/property";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const fetchProperties = async (userId: string) => {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("agent_id", userId);

  if (error) throw error;
  return data as Property[];
};

export const PropertyManagementSection = ({ userId }: { userId: string }) => {
  const { toast } = useToast();
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | "available" | "pending" | "sold" | "rented">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { data: properties = [], isLoading, error } = useQuery({
    queryKey: ["properties", userId],
    queryFn: () => fetchProperties(userId),
  });

  const filteredProperties = properties
    .filter(property => statusFilter === "all" ? true : property.status === statusFilter)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const handleStatusChange = async (propertyId: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("properties")
        .update({ status: newStatus })
        .eq("id", propertyId);

      if (error) throw error;

      toast({
        title: "Statut mis à jour",
        description: "Le statut du bien a été mis à jour avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du statut.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (propertyId: number) => {
    try {
      const { error } = await supabase
        .from("properties")
        .delete()
        .eq("id", propertyId);

      if (error) throw error;

      toast({
        title: "Bien supprimé",
        description: "Le bien a été supprimé avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Une erreur est survenue lors du chargement des biens.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mes Biens</h2>
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
        onEdit={(property) => {
          // TODO: Implement edit functionality
          console.log("Edit property:", property);
        }}
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