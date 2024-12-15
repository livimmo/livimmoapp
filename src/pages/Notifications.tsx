import { useState } from "react";
import { Bell, Home, MessageCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationItem } from "@/components/notifications/NotificationItem";
import { NotificationSettings } from "@/components/notifications/NotificationSettings";
import { Badge } from "@/components/ui/badge";

// Types de notifications
type NotificationType = "live" | "favorite" | "offer" | "general";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: Date;
  read: boolean;
  actionUrl?: string;
}

// Données de démonstration
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "live",
    title: "Live imminent",
    message: "Le live 'Visite de villa à Casablanca' commence dans 15 minutes !",
    date: new Date(),
    read: false,
    actionUrl: "/lives",
  },
  {
    id: "2",
    type: "favorite",
    title: "Mise à jour du prix",
    message: "Le prix de la villa que vous suivez à Marrakech a baissé de 200,000 MAD",
    date: new Date(Date.now() - 3600000),
    read: false,
    actionUrl: "/favorites",
  },
  {
    id: "3",
    type: "offer",
    title: "Offre acceptée",
    message: "Votre offre pour l'appartement à Rabat a été acceptée !",
    date: new Date(Date.now() - 7200000),
    read: true,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getFilteredNotifications = (tab: string) => {
    if (tab === "all") return notifications;
    return notifications.filter(n => n.type === tab);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount}</Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Tout marquer comme lu
          </Button>
          <Button variant="outline" size="sm" onClick={clearAll}>
            Tout effacer
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 mb-4">
          <TabsTrigger value="all">Tout</TabsTrigger>
          <TabsTrigger value="live">Lives</TabsTrigger>
          <TabsTrigger value="favorite">Favoris</TabsTrigger>
          <TabsTrigger value="offer">Offres</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>

        {["all", "live", "favorite", "offer"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <ScrollArea className="h-[calc(100vh-200px)]">
              {getFilteredNotifications(tab).length > 0 ? (
                getFilteredNotifications(tab).map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={() => {
                      setNotifications(
                        notifications.map((n) =>
                          n.id === notification.id ? { ...n, read: true } : n
                        )
                      );
                    }}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Aucune notification
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        ))}

        <TabsContent value="settings">
          <NotificationSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;