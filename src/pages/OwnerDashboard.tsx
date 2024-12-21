import { useAuth } from "@/contexts/AuthContext";
import { OwnerProfile } from "@/components/owner/OwnerProfile";
import { OwnerStats } from "@/components/owner/OwnerStats";
import { OwnerProperties } from "@/components/owner/OwnerProperties";
import { OwnerCalendar } from "@/components/owner/OwnerCalendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OwnerDashboard = () => {
  const { user } = useAuth();

  if (!user || user.role !== "owner") {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-center">
          Accès réservé aux propriétaires
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <OwnerProfile user={user} />
      <OwnerStats />
      
      <Tabs defaultValue="properties" className="mt-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="properties">Mes Biens</TabsTrigger>
          <TabsTrigger value="calendar">Calendrier des Visites</TabsTrigger>
        </TabsList>
        
        <TabsContent value="properties">
          <OwnerProperties />
        </TabsContent>
        
        <TabsContent value="calendar">
          <OwnerCalendar />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OwnerDashboard;