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
import { Edit, Trash, MoreHorizontal, FileText, Video, Calendar, Camera } from "lucide-react";
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
import { PropertyNotes } from "./PropertyNotes";

interface PropertyManagementTableProps {
  properties: Property[];
  onEdit: (property: Property) => void;
  onDelete: (propertyId: number) => void;
  onStatusChange: (propertyId: number, status: string) => void;
  onNotesChange: (propertyId: number, notes: any) => void;
}

export const PropertyManagementTable = ({
  properties,
  onEdit,
  onDelete,
  onStatusChange,
  onNotesChange,
}: PropertyManagementTableProps) => {
  const [editingStatus, setEditingStatus] = useState<number | null>(null);
  const [showNotes, setShowNotes] = useState<number | null>(null);

  const renderAdvancedStatus = (property: Property) => {
    return (
      <div className="flex gap-2">
        {property.hasLive && property.isLiveNow && (
          <Badge variant="destructive" className="gap-1">
            <Video className="w-3 h-3" /> Live
          </Badge>
        )}
        {property.hasLive && !property.isLiveNow && property.liveDate && (
          <Badge variant="secondary" className="gap-1">
            <Calendar className="w-3 h-3" /> {format(new Date(property.liveDate), "dd/MM")}
          </Badge>
        )}
        {property.virtualTour?.enabled && (
          <Badge variant="default" className="gap-1">
            <Camera className="w-3 h-3" /> Visite 360°
          </Badge>
        )}
      </div>
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Bien</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Live/Visite</TableHead>
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
                {renderAdvancedStatus(property)}
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
                    <DropdownMenuItem onClick={() => setShowNotes(property.id)}>
                      <FileText className="mr-2 h-4 w-4" />
                      Notes privées
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

      <PropertyNotes
        open={showNotes !== null}
        onOpenChange={() => setShowNotes(null)}
        property={properties.find(p => p.id === showNotes)}
        onSave={(notes) => {
          if (showNotes) {
            onNotesChange(showNotes, notes);
            setShowNotes(null);
          }
        }}
      />
    </div>
  );
};