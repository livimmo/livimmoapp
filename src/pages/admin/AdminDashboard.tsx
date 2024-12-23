import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, Clock, CheckCircle } from "lucide-react";

export default function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const [
        { count: propertiesCount },
        { count: agentsCount },
        { count: usersCount },
        { count: offersCount },
      ] = await Promise.all([
        supabase.from("properties").select("*", { count: "exact" }),
        supabase.from("admin_profiles").select("*", { count: "exact" }),
        supabase.from("profiles").select("*", { count: "exact" }),
        supabase.from("properties").select("*", { count: "exact" }).eq("status", "pending"),
      ]);

      return {
        properties: propertiesCount || 0,
        agents: agentsCount || 0,
        users: usersCount || 0,
        pendingOffers: offersCount || 0,
      };
    },
  });

  const cards = [
    {
      title: "Total Properties",
      value: stats?.properties || 0,
      icon: Home,
      color: "text-blue-500",
    },
    {
      title: "Total Agents",
      value: stats?.agents || 0,
      icon: Users,
      color: "text-green-500",
    },
    {
      title: "Total Users",
      value: stats?.users || 0,
      icon: Users,
      color: "text-purple-500",
    },
    {
      title: "Pending Offers",
      value: stats?.pendingOffers || 0,
      icon: Clock,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to your admin dashboard
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className={cn("h-4 w-4", card.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
