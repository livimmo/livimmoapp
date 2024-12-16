import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LiveManagement } from "@/components/profile/LiveManagement";
import { PersonalInfo } from "@/components/profile/PersonalInfo";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
      
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="lives">Mes Lives</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <PersonalInfo 
            firstName={user?.firstName || ""}
            lastName={user?.lastName || ""}
            email={user?.email || ""}
            phone={user?.phone || ""}
          />
        </TabsContent>
        
        <TabsContent value="lives">
          <LiveManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;