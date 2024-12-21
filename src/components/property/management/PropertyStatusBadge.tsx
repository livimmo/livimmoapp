import { Badge } from "@/components/ui/badge";

interface PropertyStatusBadgeProps {
  status: string;
}

export const PropertyStatusBadge = ({ status }: PropertyStatusBadgeProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "sold":
        return {
          label: "Vendu",
          variant: "default" as const,
          className: "bg-emerald-500 hover:bg-emerald-600",
        };
      case "rented":
        return {
          label: "Loué",
          variant: "destructive" as const,
        };
      case "pending":
        return {
          label: "En cours",
          variant: "default" as const,
          className: "bg-yellow-500 hover:bg-yellow-600",
        };
      default:
        return {
          label: "Disponible",
          variant: "default" as const,
          className: "bg-blue-500 hover:bg-blue-600",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  );
};