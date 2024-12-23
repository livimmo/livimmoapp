import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Paramètres</h2>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Paramètres généraux</h3>
        
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="siteName">Nom du site</Label>
            <Input id="siteName" defaultValue="Livimmo" />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="maintenance" />
            <Label htmlFor="maintenance">Mode maintenance</Label>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Notifications</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="emailNotifs" />
            <Label htmlFor="emailNotifs">Notifications par email</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="pushNotifs" />
            <Label htmlFor="pushNotifs">Notifications push</Label>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button>Sauvegarder les modifications</Button>
      </div>
    </div>
  );
}