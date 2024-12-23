import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface PropertyManagementTableProps {
  properties: Property[];
  onEdit: (property: Property) => void;
  onDelete: (propertyId: string) => void;
  onStatusChange: (propertyId: string, status: "available" | "pending" | "sold" | "rented") => void;
  onNotesChange: (propertyId: string, notes: any) => void;
}

export const PropertyManagementTable = ({
  properties,
  onEdit,
  onDelete,
  onStatusChange,
  onNotesChange,
}: PropertyManagementTableProps) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {properties.map((property) => (
          <tr key={property.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{property.title}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{property.price.toLocaleString()} DH</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{property.status}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <Button onClick={() => onEdit(property)} className="mr-2">Éditer</Button>
              <Button onClick={() => onDelete(property.id)} variant="destructive">
                <Trash className="h-4 w-4" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
