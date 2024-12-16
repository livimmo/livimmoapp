import { Building2, Building, Home, ShoppingBag } from "lucide-react";
import { UserRole } from "@/types/user";
import { cn } from "@/lib/utils";

interface RoleSelectorProps {
  selectedRole: UserRole | null;
  onSelect: (role: UserRole) => void;
}

export const RoleSelector = ({ selectedRole, onSelect }: RoleSelectorProps) => {
  const roles: { id: UserRole; label: string; description: string; icon: any; color: string }[] = [
    {
      id: "promoter",
      label: "Promoteur",
      description: "Gérez vos projets immobiliers et organisez des lives",
      icon: Building2,
      color: "bg-blue-500",
    },
    {
      id: "agent",
      label: "Agent immobilier",
      description: "Gérez vos biens et interagissez avec vos clients",
      icon: Building,
      color: "bg-green-500",
    },
    {
      id: "tenant",
      label: "Locataire",
      description: "Trouvez votre location idéale",
      icon: Home,
      color: "bg-purple-500",
    },
    {
      id: "buyer",
      label: "Acheteur",
      description: "Recherchez et achetez votre bien",
      icon: ShoppingBag,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {roles.map((role) => (
        <button
          key={role.id}
          onClick={() => onSelect(role.id)}
          className={cn(
            "relative flex flex-col items-center p-6 rounded-xl transition-all duration-200",
            "border-2 hover:shadow-lg",
            selectedRole === role.id
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          )}
        >
          <div className={cn(
            "p-4 rounded-full mb-4",
            role.color,
            "bg-opacity-10"
          )}>
            <role.icon className={cn(
              "w-8 h-8",
              selectedRole === role.id ? "text-primary" : `text-${role.color}`
            )} />
          </div>
          <h3 className="text-lg font-semibold mb-2">{role.label}</h3>
          <p className="text-sm text-muted-foreground text-center">{role.description}</p>
          
          {selectedRole === role.id && (
            <div className="absolute -top-2 -right-2">
              <div className="bg-primary text-primary-foreground p-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};