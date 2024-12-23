import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NotificationItem } from "./NotificationItem";
import { NotificationSettings } from "./NotificationSettings";
import { VisitsCalendarSection } from "./VisitsCalendarSection";
import { Notification } from "@/types/notification";

interface NotificationTabsProps {
  notifications: Notification[];
  unreadCount: number;
  unreadLiveCount: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onMarkAsRead: (notification: Notification) => void;
}

export const NotificationTabs = ({
  notifications,
  unreadCount,
  unreadLiveCount,
  activeTab,
  setActiveTab,
  onMarkAsRead,
}: NotificationTabsProps) => {
  const getFilteredNotifications = (tab: string) => {
    if (tab === "all") return notifications;
    return notifications.filter(n => n.type === tab);
  };

  return (
    <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-5 mb-4">
        <TabsTrigger value="all">
          Tout
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {unreadCount}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="live">
          Lives
          {unreadLiveCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {unreadLiveCount}
            </Badge>
          )}
        </TabsTrigger>
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
                  onMarkAsRead={() => onMarkAsRead(notification)}
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
  );
};