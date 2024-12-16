import { Building, Home, User, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { UserRole } from "@/types/auth";

interface RoleSelectorProps {
  selectedRole?: UserRole;
  onSelect: (role: UserRole) => void;
}

export const RoleSelector = ({ selectedRole, onSelect }: RoleSelectorProps) => {
  const roles = [
    {
      id: "promoter" as UserRole,
      title: "Promoteur",
      description: "Gérez vos projets immobiliers et organisez des lives",
      icon: Building,
    },
    {
      id: "agent" as UserRole,
      title: "Agent immobilier",
      description: "Gérez vos biens et interagissez avec les clients",
      icon: Users,
    },
    {
      id: "tenant" as UserRole,
      title: "Locataire",
      description: "Trouvez votre location idéale",
      icon: Home,
    },
    {
      id: "buyer" as UserRole,
      title: "Acheteur",
      description: "Trouvez le bien de vos rêves",
      icon: User,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {roles.map((role) => {
        const Icon = role.icon;
        return (
          <Card
            key={role.id}
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedRole === role.id
                ? "border-primary border-2"
                : "border hover:border-primary"
            }`}
            onClick={() => onSelect(role.id)}
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">{role.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {role.description}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};