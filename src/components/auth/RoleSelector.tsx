import { Building2, Building, Home, ShoppingBag } from "lucide-react";
import { UserRole } from "@/types/user";
import { cn } from "@/lib/utils";

interface RoleSelectorProps {
  selectedRole: UserRole | null;
  onSelect: (role: UserRole) => void;
}

export const RoleSelector = ({ selectedRole, onSelect }: RoleSelectorProps) => {
  const roles: { id: UserRole; label: string; description: string; icon: any }[] = [
    {
      id: "promoter",
      label: "Promoteur",
      description: "Gérez vos projets immobiliers et organisez des lives",
      icon: Building2,
    },
    {
      id: "agent",
      label: "Agent immobilier",
      description: "Gérez vos biens et interagissez avec vos clients",
      icon: Building,
    },
    {
      id: "tenant",
      label: "Locataire",
      description: "Trouvez votre location idéale",
      icon: Home,
    },
    {
      id: "buyer",
      label: "Acheteur",
      description: "Recherchez et achetez votre bien",
      icon: ShoppingBag,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {roles.map((role) => (
        <button
          key={role.id}
          onClick={() => onSelect(role.id)}
          className={cn(
            "flex items-start gap-4 p-4 rounded-lg border transition-all",
            "hover:border-primary hover:shadow-sm",
            selectedRole === role.id
              ? "border-primary bg-primary/5"
              : "border-border"
          )}
        >
          <role.icon className="w-6 h-6 mt-1 text-primary" />
          <div className="text-left">
            <h3 className="font-semibold">{role.label}</h3>
            <p className="text-sm text-muted-foreground">{role.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};