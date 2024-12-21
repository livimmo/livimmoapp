import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Clock, CheckCircle, XCircle } from "lucide-react";

export const OwnerStats = () => {
  // TODO: Remplacer par des données réelles
  const stats = [
    {
      title: "Biens ajoutés",
      value: "3",
      icon: Home,
      description: "Total de vos biens",
    },
    {
      title: "En attente",
      value: "1",
      icon: Clock,
      description: "Biens en attente de validation",
    },
    {
      title: "Validés",
      value: "2",
      icon: CheckCircle,
      description: "Biens validés et en ligne",
    },
    {
      title: "Visites programmées",
      value: "5",
      icon: XCircle,
      description: "Total des visites à venir",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};