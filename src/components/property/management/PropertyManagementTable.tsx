import { useState } from "react";
import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { PropertyStatusBadge } from "./PropertyStatusBadge";
import { PropertyStatusSelect } from "./PropertyStatusSelect";

interface PropertyManagementTableProps {
  properties: Property[];
  onEdit: (property: Property) => void;
  onDelete: (propertyId: number) => void;
  onStatusChange: (propertyId: number, status: string) => void;
}

export const PropertyManagementTable = ({
  properties,
  onEdit,
  onDelete,
  onStatusChange,
}: PropertyManagementTableProps) => {
  const [editingStatus, setEditingStatus] = useState<number | null>(null);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Bien</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date de création</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-4">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium">{property.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {property.location}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {property.price.toLocaleString()} DH
              </TableCell>
              <TableCell>
                {editingStatus === property.id ? (
                  <PropertyStatusSelect
                    value={property.status || "available"}
                    onValueChange={(value) => {
                      onStatusChange(property.id, value);
                      setEditingStatus(null);
                    }}
                  />
                ) : (
                  <div
                    className="cursor-pointer"
                    onClick={() => setEditingStatus(property.id)}
                  >
                    <PropertyStatusBadge status={property.status || "available"} />
                  </div>
                )}
              </TableCell>
              <TableCell>
                {format(new Date(property.createdAt || new Date()), "PP", {
                  locale: fr,
                })}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(property)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => onDelete(property.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};