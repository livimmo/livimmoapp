import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Bell, Home, MessageCircle, Settings } from "lucide-react";

export const NotificationSettings = () => {
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <Label htmlFor="lives">Notifications de lives</Label>
            </div>
            <Switch id="lives" defaultChecked />
          </div>
          <div className="text-sm text-muted-foreground ml-7">
            Recevez des notifications pour les lives à venir et les lives en cours sur vos biens favoris
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              <Label htmlFor="favorites">Notifications de favoris</Label>
            </div>
            <Switch id="favorites" defaultChecked />
          </div>
          <div className="text-sm text-muted-foreground ml-7">
            Soyez informé des changements de prix et des mises à jour sur vos biens favoris
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <Label htmlFor="offers">Notifications d'offres</Label>
            </div>
            <Switch id="offers" defaultChecked />
          </div>
          <div className="text-sm text-muted-foreground ml-7">
            Recevez des notifications concernant vos offres et les réponses des agents
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <Label htmlFor="recommendations">Recommandations personnalisées</Label>
            </div>
            <Switch id="recommendations" defaultChecked />
          </div>
          <div className="text-sm text-muted-foreground ml-7">
            Recevez des suggestions de biens basées sur vos recherches et favoris
          </div>
        </div>
      </Card>
    </div>
  );
};