import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NotificationItem } from "./NotificationItem";
import { NotificationSettings } from "./NotificationSettings";
import { VisitsCalendarSection } from "./VisitsCalendarSection";
import { OffersSection } from "./OffersSection";
import { Notification } from "@/types/notification";
import { Bell, Calendar, Home, MessageCircle, Settings, DollarSign } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

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
  const { user } = useAuth();
  const isAgent = user?.role === "agent" || user?.role === "promoter";

  const getFilteredNotifications = (tab: string) => {
    if (tab === "all") return notifications;
    return notifications.filter(n => n.type === tab);
  };

  return (
    <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-6 mb-4">
        <TabsTrigger value="all" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Tout
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {unreadCount}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="live" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Lives
          {unreadLiveCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {unreadLiveCount}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="favorite" className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          Favoris
        </TabsTrigger>
        <TabsTrigger value="offer" className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          Offres
        </TabsTrigger>
        <TabsTrigger value="general" className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          Général
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Paramètres
        </TabsTrigger>
      </TabsList>

      {["all", "live", "favorite", "general"].map((tab) => (
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

      <TabsContent value="offer">
        <OffersSection />
      </TabsContent>

      <TabsContent value="settings">
        <NotificationSettings />
      </TabsContent>
    </Tabs>
  );
};